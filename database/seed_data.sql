-- Initial Data for Users
-- Passwords are:
-- admin: 1234
-- abc: 123456789
-- organizer: 1234

INSERT INTO users (user_id, username, password, firstname, lastname, role, email) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin', '$2b$12$KjHcbcrhwRxxq6644ufYL.jPTUc9zk.G0QtrtFjQGGVfuoSmM/Klm', 'Admin', 'User', 'ADMIN', 'admin@example.com'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'abc', '$2b$12$x9W//Ly6ve6e.xU2aHAlYuso5azBbo3kvcvLaAnWErqBanzovGLLu', 'Attendee', 'User', 'ATTENDEE', 'abc@example.com'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'organizer', '$2b$12$KjHcbcrhwRxxq6644ufYL.jPTUc9zk.G0QtrtFjQGGVfuoSmM/Klm', 'Organizer', 'User', 'ORGANIZER', 'organizer@example.com')
ON CONFLICT (email) DO NOTHING;
