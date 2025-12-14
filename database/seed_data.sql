-- Schedio Database Seed Data
-- Sanitized data from actual application usage
-- WARNING: All personal information has been anonymized for privacy

-- Insert users (sanitized data with original password hashes)
INSERT INTO users (user_id, username, password, firstname, lastname, email, role, phone, GoogleID) VALUES
('d3550b7a-6dc0-40a7-ba46-14a390978930', 'Sa Muii', '', NULL, NULL, 'user2@example.com', 'ATTENDEE', NULL, NULL),
('2f3af8b3-e4e3-4a64-88d9-85f09832c7cc', 'organizer2', '$2a$10$azHmMZAGeNBSaw0rBvozeOv5NX1mBBrQ8AaDk0s/FFon0B4fAZMJ6', NULL, NULL, 'organizer2@example.com', 'ORGANIZER', NULL, NULL),
('f4b606c8-fd60-40ee-8a6a-de35d919d402', 'org3', '$2a$10$gWkuMG7tpTmQPF/y9pa5mOiR51LPmsyeKsZcg4GpOLvuDNNOI6rmS', 'Tanaphat', 'Phomak', 'organizer3@example.com', 'ORGANIZER', NULL, NULL),
('f711a85b-833a-41ab-b373-57337ff0f246', 'organizer', '$2a$10$6prx2FcleOTRPOWHWJ9BduSu2p/5AA4pHLCzyW.8JJshHX/DEMKjW', 'jeab2', 'theOrganizer', 'organizer@example.com', 'ORGANIZER', '0910322258', NULL),
('9dc4c4d3-b3e2-45bc-9856-3cf72859d451', 'Dezone', '', NULL, NULL, 'admin1@example.com', 'ADMIN', NULL, NULL),
('2a092067-8090-4034-b595-f675d9253729', 'abc', '$2a$10$oMDnPVLBHifZhaH3jM/95eVefcjfk5A3DnX3yIFjRe9NSckkA/D5.', 'abc', 'def', 'attendee1@example.com', 'ATTENDEE', '0874321543', NULL),
('a825bebb-efa6-4338-8d1c-d77afddc7e47', 'admin', '$2a$10$gtTRW.kWARIuTfyD8LOhnuHICtRUfFFbHcoOi9doECh37uuR0HGvy', 'jeab', 'makmak', 'admin@example.com', 'ADMIN', NULL, NULL),
('0e5c87b1-c746-4432-b974-de25043c1d51', 'u1', '$2a$10$JooPi8eG7H4ojotvygtP.u5G2J7w4JgVCLLP9Me10YJasgd6VhsjC', 'u1', 'u1', 'user1@example.com', 'ADMIN', NULL, NULL),
('98f5b9aa-8f0b-485c-9923-bc29c6fe5c80', 'wong1', '$2a$10$gwA8y0Nk.bViJsOym2h60.B79FT1EiK0711wx26inyKM2Mek.3tmG', 'wong', 'yuch', 'wong1@example.com', 'ATTENDEE', NULL, NULL),
('a36ecc6a-b027-40ec-9628-be51e6137012', 'Wl2M', '$2a$10$e6EqNKmdqIfWYjKzyNbuquFOUWGNfll/QM1Dz6CZdWs9jHGLHR2sO', 'worameth', 'siriwarin', 'testuser@example.com', 'ATTENDEE', NULL, NULL),
('ca63b9b1-49b0-4950-a9e4-e6e6475cd421', 'Wongsakorn Yuchaisittikul', '', 'Wongsakorn', 'Pomak', 'wongsakorn@example.com', 'ADMIN', NULL, NULL),
('85103734-4a0e-41cf-85d1-1fc8459f409f', 'wong2', '$2a$10$473kj4SRZYtyMF6RWygvTuo8oOXN3WoKzmEzRuHUO60WoC0r/1L.e', 'wong2', 'yuc', 'wong2@example.com', 'ADMIN', NULL, NULL),
('73e13b75-ca99-488b-a9a0-f7136ad50a30', 'NemoTritawat', '$2a$10$1kX.L.vWKnYH3Ysv2ZPM/.H8oE7aPddAIvWYdP9GE5508k3R0aDW2', 'Treetawat', 'Koparamestraisin', 'nemo@example.com', 'ATTENDEE', NULL, NULL),
('055e95fe-c128-4b85-9b1b-a4d21fa22d55', 'Worameth Siriwarin', '', NULL, NULL, 'worameth@example.com', 'ATTENDEE', NULL, NULL);

-- Insert events (sanitized data)
INSERT INTO events (event_id, title, description, starts_at, ends_at, capacity, poster, location, walk_in, activity_hour, event_category, organizer_id, created_at, updated_at, event_by, event_contact_email, event_contact_phone, is_edit_requested, is_deleted, is_cancelled) VALUES
('3b20b19f-beeb-4355-824d-75e9b3a91310', 'Openhouse: AI Workshop', 'Basic AI', '2025-11-15 16:00:00', '2025-11-15 19:00:00', 50, 'https://example.com/poster.jpg', 'S4 1116', TRUE, NULL, 'WORKSHOP', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-08 22:18:38.352', '2025-11-08 22:18:38.352', 'CPE', 'cpe@example.com', NULL, TRUE, FALSE, FALSE),
('0eb9577c-70e3-4bec-84d3-31c3597928da', 'Hackathon', 'New Hackathon', '2025-11-25 16:00:00', '2025-11-25 19:00:00', 2147483647, NULL, 'S4', FALSE, NULL, 'ACADEMIC', NULL, '2025-11-10 01:13:44.452', '2025-11-10 01:13:44.452', '', 'organizer@example.com', NULL, FALSE, FALSE, FALSE),
('da6810f2-9399-4e3b-8310-8e575cbff209', 'CMD Workshop', 'UNIX', '2025-11-20 16:00:00', '2025-11-20 19:00:00', 2147483647, NULL, 'S4 1116', FALSE, 3, 'WORKSHOP,ACADEMIC', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-09 18:00:18.760', '2025-11-09 18:00:18.760', 'akeachai', 'organizer@example.com', NULL, FALSE, FALSE, FALSE),
('960a526e-67ab-42e2-a66c-fc1457b3e5e9', 'Akovado Closing House', 'Internship Job Fair', '2025-12-15 16:00:00', '2025-12-15 18:00:00', 30, 'https://example.com/poster.jpg', 'Central World 3th Floor', FALSE, 2, 'ACADEMIC,WORKSHOP', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-11 21:12:35.506', '2025-11-11 21:12:35.506', 'akovado', 'organizer@example.com', '555-0001', FALSE, FALSE, FALSE),
('2e8d1e52-87f6-4035-8871-9da15691e228', 'Akoda Open house', 'it about internship', '2025-12-15 16:00:00', '2025-12-15 16:00:00', 100, 'https://example.com/poster.jpg', 'Central world', FALSE, 20, 'ACADEMIC', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-17 21:01:47.872', '2025-11-17 21:01:47.872', 'akoda', 'contact@example.com', '555-0002', FALSE, FALSE, FALSE),
('1bd6862f-b8a1-4fc5-90fa-5be8064ec035', 'KBTG INTERNSHIP', 'INTERNSHIP JOB', '2025-11-28 12:00:00', '2025-11-28 12:00:00', 2147483647, 'https://example.com/poster.jpg', 'CEN LUIS', FALSE, 2, 'CAREER', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-17 21:40:55.096', '2025-11-17 21:40:55.096', 'KBTG', 'KBTG@example.com', '555-0003', FALSE, FALSE, FALSE),
('a868fc2c-6504-4788-af67-de35798392ca', 'Play Chess together', 'Ensemble chess player', '2025-11-06 21:00:00', '2025-11-06 21:00:00', 20, 'https://example.com/poster.jpg', 'CB 1211', FALSE, NULL, 'ACADEMIC', 'f4b606c8-fd60-40ee-8a6a-de35d919d402', '2025-11-21 23:40:56.472', '2025-11-21 23:40:56.472', 'CHESS.com', 'chess@example.com', '555-0004', FALSE, FALSE, FALSE),
('050f59e6-6170-49e9-8ff2-5a6baa82ef8f', 'Ski Event', 'go ski together', '2025-11-28 07:00:00', '2025-11-28 07:00:00', 20, 'https://example.com/poster.jpg', 'Japan', TRUE, 0, 'COMPETITION', 'f4b606c8-fd60-40ee-8a6a-de35d919d402', '2025-11-21 23:44:12.237', '2025-11-21 23:44:12.237', 'Japan tour', 'japantour@example.com', '555-0005', FALSE, FALSE, FALSE),
('ceba49a3-22bc-4fc3-acdf-d314db9cd8a8', 'GOON PARTY', 'GOON PARTY have everything u think it have to be', '2025-11-27 23:00:00', '2025-11-28 23:00:00', 20, 'https://example.com/poster.jpg', 'ROOM 1119', TRUE, 0, 'ACADEMIC', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-19 15:57:26.915', '2025-11-19 15:57:26.915', 'Event Organizer', 'organizer@example.com', '555-0006', FALSE, FALSE, FALSE),
('993d59e8-9dc5-4289-91bd-619378abb1d9', 'Graduation Ceremony 2025', 'Celebration for CPE 35 Graduation', '2025-11-26 10:00:00', '2025-11-26 16:00:00', 2147483647, 'https://example.com/poster.jpg', 'KMUTT', FALSE, 0, 'SOCIAL,WORKSHOP,ACADEMIC', 'f4b606c8-fd60-40ee-8a6a-de35d919d402', '2025-11-22 12:41:47.917', '2025-11-22 12:41:47.917', 'CPE', 'cpe@example.com', '555-0007', FALSE, FALSE, FALSE),
('1cd71edf-e91a-459e-8672-3acecce0943c', 'Jeabjubjib', 'JeabJubJib', '2025-11-28 10:00:00', '2025-11-28 10:00:00', 2147483647, 'https://example.com/poster.jpg', 'CB6969', FALSE, 69, 'VOLUNTEER', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-26 11:35:02.029', '2025-11-26 11:35:02.029', 'Event Organizer', 'organizer@example.com', '555-0008', FALSE, FALSE, FALSE),
('ab954f4f-9cd8-49ab-aa18-290d1a6cea98', 'Jeabjubjib2', 'Please join with us!', '2025-11-29 10:00:00', '2025-11-29 10:00:00', 2147483647, 'https://example.com/poster.jpg', 'CB6969', FALSE, 69, 'VOLUNTEER', 'f711a85b-833a-41ab-b373-57337ff0f246', '2025-11-26 11:38:50.748', '2025-11-26 11:38:50.748', 'Event Organizer', 'organizer@example.com', '555-0009', FALSE, FALSE, FALSE),
('796fc202-295c-4016-9613-0b138f58e475', 'Koda', 'Koda is da best', '2025-11-27 07:07:00', '2025-11-27 07:07:00', 2147483647, 'https://example.com/poster.jpg', 'koda tower', FALSE, NULL, 'VOLUNTEER', 'f4b606c8-fd60-40ee-8a6a-de35d919d402', '2025-11-26 14:11:45.563', '2025-11-26 14:11:45.563', 'koda co.', 'koda@example.com', '555-0010', FALSE, FALSE, FALSE);

-- Insert event registrations (sanitized data)
INSERT INTO event_registration (reg_id, user_id, event_id, registered_at) VALUES
('fb90d80d-e6f1-47a6-8135-006667c2d859', '2a092067-8090-4034-b595-f675d9253729', 'da6810f2-9399-4e3b-8310-8e575cbff209', '2025-11-11 18:07:32.598'),
('97be1146-6c57-4c21-9807-4b542542edad', 'f711a85b-833a-41ab-b373-57337ff0f246', '3b20b19f-beeb-4355-824d-75e9b3a91310', '2025-11-11 18:57:54.113'),
('407aa65e-1c16-4813-a4bf-aeda90bac5f7', '9dc4c4d3-b3e2-45bc-9856-3cf72859d451', '960a526e-67ab-42e2-a66c-fc1457b3e5e9', '2025-11-18 01:19:56.246'),
('961ef5ad-a3f2-40c3-a912-e3afc6b101c3', '9dc4c4d3-b3e2-45bc-9856-3cf72859d451', '1bd6862f-b8a1-4fc5-90fa-5be8064ec035', '2025-11-18 02:18:38.728'),
('6bd8cfe0-c219-47ce-8175-1500ba5a07d6', '9dc4c4d3-b3e2-45bc-9856-3cf72859d451', 'da6810f2-9399-4e3b-8310-8e575cbff209', '2025-11-18 02:20:08.848'),
('2a9d5216-4bd5-4387-a6c9-de50707249fe', '2a092067-8090-4034-b595-f675d9253729', '1bd6862f-b8a1-4fc5-90fa-5be8064ec035', '2025-11-19 16:04:42.377'),
('9f6dbc3d-dd3d-4918-b75f-eec7e7afa724', '9dc4c4d3-b3e2-45bc-9856-3cf72859d451', '2e8d1e52-87f6-4035-8871-9da15691e228', '2025-11-23 00:02:31.332'),
('5c5c665b-e16d-4d8b-bca9-5d7de06c381c', '2a092067-8090-4034-b595-f675d9253729', '960a526e-67ab-42e2-a66c-fc1457b3e5e9', '2025-11-25 02:32:48.989'),
('36e751bd-55fd-4066-b260-10dc630beb8e', '2a092067-8090-4034-b595-f675d9253729', '993d59e8-9dc5-4289-91bd-619378abb1d9', '2025-11-25 20:50:54.698'),
('60537ca2-a75f-4738-8a2b-e452625a6950', 'ca63b9b1-49b0-4950-a9e4-e6e6475cd421', '993d59e8-9dc5-4289-91bd-619378abb1d9', '2025-11-25 22:37:31.246'),
('a5f3c8d1-4198-4318-982e-05bbabb4dd32', 'ca63b9b1-49b0-4950-a9e4-e6e6475cd421', 'ceba49a3-22bc-4fc3-acdf-d314db9cd8a8', '2025-11-25 22:37:38.089'),
('51fdda42-0316-425e-9672-8851ccfef604', '85103734-4a0e-41cf-85d1-1fc8459f409f', '2e8d1e52-87f6-4035-8871-9da15691e228', '2025-11-26 11:22:54.309'),
('d3463b83-8c67-4748-869e-1066bc0a88a5', '85103734-4a0e-41cf-85d1-1fc8459f409f', 'ceba49a3-22bc-4fc3-acdf-d314db9cd8a8', '2025-11-26 11:22:55.389'),
('8cedd469-0e3d-41f2-a5ed-1f6b01ce23f8', 'd3550b7a-6dc0-40a7-ba46-14a390978930', '993d59e8-9dc5-4289-91bd-619378abb1d9', '2025-11-26 12:39:00.786');

-- Insert approval records (sanitized data)
INSERT INTO approval (approvalID, eventID, adminID, decision, comment, decided_at) VALUES
('d4f4162e-2b52-4856-8020-693d4e8a5098', 'da6810f2-9399-4e3b-8310-8e575cbff209', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', '', '2025-11-14 22:21:11.881'),
('85f85255-5790-4ad9-89bc-10b96e77798e', '0eb9577c-70e3-4bec-84d3-31c3597928da', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Event does not meet requirements', '2025-11-15 02:20:01.805'),
('ae77b299-5bf1-4f45-908d-2bcfc2d3d5fb', 'ceba49a3-22bc-4fc3-acdf-d314db9cd8a8', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', NULL, '2025-11-19 15:58:05.001'),
('8c72c404-e077-4854-9bfb-83f4aaba24ad', 'a868fc2c-6504-4788-af67-de35798392ca', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', NULL, '2025-11-21 23:41:33.698'),
('c862a844-0a10-4e34-bed4-bf8a91d8dafe', '2e8d1e52-87f6-4035-8871-9da15691e228', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', NULL, '2025-11-18 02:15:16.129'),
('2ead6296-0c91-49b7-84d0-80b7a5db2943', '3b20b19f-beeb-4355-824d-75e9b3a91310', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Event needs revision', '2025-11-14 22:21:11.881'),
('74d2c382-c300-42fa-be02-5cdf1bcb3833', '993d59e8-9dc5-4289-91bd-619378abb1d9', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', NULL, '2025-11-25 03:06:52.873'),
('0213aaf6-61af-4d56-bc8d-017fb1ca32ec', 'ab954f4f-9cd8-49ab-aa18-290d1a6cea98', NULL, 'PENDING', NULL, NULL),
('f63825e4-d018-45c7-87bb-ff3bd2c75b04', '1cd71edf-e91a-459e-8672-3acecce0943c', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'APPROVED', NULL, '2025-11-26 11:39:23.720'),
('071db522-1368-457f-980f-07a743367533', '050f59e6-6170-49e9-8ff2-5a6baa82ef8f', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Rejected', '2025-11-26 11:39:32.015'),
('e11c2f49-894e-4821-a7a8-6732f6667bef', '1bd6862f-b8a1-4fc5-90fa-5be8064ec035', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Rejected', '2025-11-26 11:39:50.657'),
('5b9b1dbe-d198-4a65-9d6e-b8f877133f2c', '960a526e-67ab-42e2-a66c-fc1457b3e5e9', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Rejected', '2025-11-26 12:41:52.667'),
('9aaa2ba3-cb18-4d51-b376-627962c25165', '796fc202-295c-4016-9613-0b138f58e475', 'a825bebb-efa6-4338-8d1c-d77afddc7e47', 'REJECT', 'Event rejected', '2025-11-26 14:12:10.590');