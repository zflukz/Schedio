-- Schedio Database Schema
-- PostgreSQL Database Schema for Event Management System

-- Needed for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create database (run this separately if needed)
-- CREATE DATABASE schedio;

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100),
    password VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'ATTENDEE',
    phone VARCHAR(20),
    GoogleID VARCHAR(255) UNIQUE,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP,
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT uk_users_googleid UNIQUE (GoogleID)
);

-- Create indexes for users table
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_googleid ON users(GoogleID);

-- Events table
CREATE TABLE events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    capacity INTEGER,
    poster TEXT,
    location VARCHAR(255) NOT NULL,
    walk_in BOOLEAN NOT NULL DEFAULT FALSE,
    activity_hour INTEGER,
    event_category VARCHAR(500) NOT NULL,
    organizer_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    file_pdf TEXT,
    event_by VARCHAR(100),
    event_contact_email VARCHAR(100),
    event_contact_phone VARCHAR(20),
    is_edit_requested BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_cancelled BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_event_organizer FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

-- Create indexes for events table
CREATE INDEX idx_events_starts_at ON events(starts_at);

-- Event Registration table
CREATE TABLE event_registration (
    reg_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_event_registration_user_event UNIQUE (user_id, event_id),
    CONSTRAINT fk_reg_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_reg_event FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- Create indexes for event_registration table
CREATE INDEX idx_reg_event ON event_registration(event_id);
CREATE INDEX idx_reg_user ON event_registration(user_id);

-- Approval table
CREATE TABLE approval (
    approvalID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    eventID UUID NOT NULL,
    adminID UUID,
    decision VARCHAR(20) NOT NULL,
    comment TEXT,
    decided_at TIMESTAMP,
    CONSTRAINT fk_approval_event FOREIGN KEY (eventID) REFERENCES events(event_id),
    CONSTRAINT fk_approval_admin FOREIGN KEY (adminID) REFERENCES users(user_id)
);