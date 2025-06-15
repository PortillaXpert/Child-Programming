

INSERT INTO students (student_cod, full_name, email) VALUES
                                                         (20230001, 'María González Pérez', 'maria.gonzalez@universidad.edu'),
                                                         (20230002, 'Carlos Rodríguez Sánchez', 'carlos.rodriguez@universidad.edu'),
                                                         (20230003, 'Ana López Martínez', 'ana.lopez@universidad.edu'),
                                                         (20230004, 'Pedro Sánchez Fernández', 'pedro.sanchez@universidad.edu'),
                                                         (20230005, 'Laura Martínez Gómez', 'laura.martinez@universidad.edu'),
                                                         (20230006, 'Jorge Fernández Ruiz', 'jorge.fernandez@universidad.edu'),
                                                         (20230007, 'Sofía Pérez Díaz', 'sofia.perez@universidad.edu'),
                                                         (20230008, 'David Gómez Hernández', 'david.gomez@universidad.edu'),
                                                         (20230009, 'Elena Ruiz Moreno', 'elena.ruiz@universidad.edu'),
                                                         (20230010, 'Miguel Hernández Ortega', 'miguel.hernandez@universidad.edu');

INSERT INTO teams (name, course) VALUES
                                     ('Equipo Alpha', 'MAT-101'),
                                     ('Equipo Beta', 'MAT-101'),
                                     ('Equipo Gamma', 'FIS-201'),
                                     ('Equipo Delta', 'QUI-102'),
                                     ('Equipo Epsilon', 'INF-301');

INSERT INTO team_students (team_id, student_id) VALUES
-- Equipo Alpha (4 miembros)
(1, 1), (1, 2), (1, 3), (1, 4),
-- Equipo Beta (3 miembros)
(2, 5), (2, 6), (2, 7),
-- Equipo Gamma (2 miembros)
(3, 8), (3, 9),
-- Equipo Delta (1 miembro)
(4, 10);