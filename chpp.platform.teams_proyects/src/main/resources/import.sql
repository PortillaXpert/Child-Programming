INSERT INTO students (student_cod, full_name, email) VALUES (20230001, 'María González Pérez', 'maria.gonzalez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230002, 'Carlos Rodríguez Sánchez', 'carlos.rodriguez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230003, 'Ana López Martínez', 'ana.lopez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230004, 'Pedro Sánchez Fernández', 'pedro.sanchez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230005, 'Laura Martínez Gómez', 'laura.martinez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230006, 'Jorge Fernández Ruiz', 'jorge.fernandez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230007, 'Sofía Pérez Díaz', 'sofia.perez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230008, 'David Gómez Hernández', 'david.gomez@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230009, 'Elena Ruiz Moreno', 'elena.ruiz@universidad.edu');
INSERT INTO students (student_cod, full_name, email) VALUES (20230010, 'Miguel Hernández Ortega', 'miguel.hernandez@universidad.edu');

INSERT INTO teams (name, course) VALUES ('Equipo Alpha', 'MAT-101');
INSERT INTO teams (name, course) VALUES ('Equipo Beta', 'MAT-101');
INSERT INTO teams (name, course) VALUES ('Equipo Gamma', 'FIS-201');
INSERT INTO teams (name, course) VALUES ('Equipo Delta', 'QUI-102');
INSERT INTO teams (name, course) VALUES ('Equipo Epsilon', 'INF-301');

-- Equipo Alpha (4 miembros)
INSERT INTO team_students (team_id, student_id) VALUES (1, 1);
INSERT INTO team_students (team_id, student_id) VALUES (1, 2);
INSERT INTO team_students (team_id, student_id) VALUES (1, 3);
INSERT INTO team_students (team_id, student_id) VALUES (1, 4);
-- Equipo Beta (3 miembros)
INSERT INTO team_students (team_id, student_id) VALUES (2, 5);
INSERT INTO team_students (team_id, student_id) VALUES (2, 6);
INSERT INTO team_students (team_id, student_id) VALUES (2, 7);
-- Equipo Gamma (2 miembros)
INSERT INTO team_students (team_id, student_id) VALUES (3, 8);
INSERT INTO team_students (team_id, student_id) VALUES (3, 9);
-- Equipo Delta (1 miembro)
INSERT INTO team_students (team_id, student_id) VALUES (4, 10);