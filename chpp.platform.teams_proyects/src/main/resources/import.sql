-- Limpieza inicial (opcional para pruebas)
DROP TABLE tasks_completed;
DROP TABLE  mission_assignments;
DROP TABLE  attachments;
DROP TABLE  public.mission_entity_objectives;
DROP TABLE missions;
DROP TABLE  students;
DROP TABLE  teams;

-- Insertar equipos
INSERT INTO teams (id, name, course) VALUES
                                         (1, 'Equipo Alpha', 'MAT-101'),
                                         (2, 'Equipo Beta', 'FIS-201'),
                                         (3, 'Equipo Gamma', 'QUI-102'),
                                         (4, 'Equipo Delta', 'INF-301'),
                                         (5, 'Equipo Epsilon', 'ING-202');

-- Insertar estudiantes (con team_id)
INSERT INTO students (id, student_cod, full_name, email, team_id) VALUES
                                                                      (1, 20230001, 'María González Pérez', 'maria.gonzalez@universidad.edu', 1),
                                                                      (2, 20230002, 'Carlos Rodríguez Sánchez', 'carlos.rodriguez@universidad.edu', 1),
                                                                      (3, 20230003, 'Ana López Martínez', 'ana.lopez@universidad.edu', 1),
                                                                      (4, 20230004, 'Pedro Sánchez Fernández', 'pedro.sanchez@universidad.edu', 1),
                                                                      (5, 20230005, 'Laura Martínez Gómez', 'laura.martinez@universidad.edu', 2),
                                                                      (6, 20230006, 'Jorge Fernández Ruiz', 'jorge.fernandez@universidad.edu', 2),
                                                                      (7, 20230007, 'Sofía Pérez Díaz', 'sofia.perez@universidad.edu', 2),
                                                                      (8, 20230008, 'David Gómez Hernández', 'david.gomez@universidad.edu', 3),
                                                                      (9, 20230009, 'Elena Ruiz Moreno', 'elena.ruiz@universidad.edu', 3),
                                                                      (10, 20230010, 'Miguel Hernández Ortega', 'miguel.hernandez@universidad.edu', 4);

INSERT INTO students (id, student_cod, full_name, email, team_id) VALUES
                                                                      (11, 20230011, 'Luis Castro Méndez', 'luis.castro@universidad.edu', NULL),
                                                                      (12, 20230012, 'Daniela Vargas Soto', 'daniela.vargas@universidad.edu', NULL),
                                                                      (13, 20230013, 'Roberto Jiménez Rojas', 'roberto.jimenez@universidad.edu', NULL);

-- Insertar misiones
INSERT INTO missions (id, title, description, start_date, end_date, active) VALUES
                                                                                (1, 'Proyecto Final', 'Desarrollo de aplicación web para gestión educativa', '2023-09-01 08:00:00', '2023-12-15 23:59:59', true),
                                                                                (2, 'Investigación DB', 'Análisis comparativo de bases de datos NoSQL vs SQL', '2023-10-10 09:00:00', '2023-11-30 23:59:59', true),
                                                                                (3, 'Diseño UI/UX', 'Creación de prototipos para la nueva plataforma', '2023-08-15 10:00:00', '2023-09-30 23:59:59', false),
                                                                                (4, 'Pruebas Unitarias', 'Implementación de suite de pruebas automatizadas', '2023-11-01 08:30:00', '2023-11-30 23:59:59', true);

-- Objetivos de las misiones
INSERT INTO mission_entity_objectives (mission_entity_id, objectives) VALUES
                                                                          (1, 'Definir requisitos del sistema'),
                                                                          (1, 'Diseñar arquitectura backend'),
                                                                          (1, 'Implementar interfaz de usuario'),
                                                                          (2, 'Comparar rendimiento MongoDB vs PostgreSQL'),
                                                                          (2, 'Analizar esquemas de datos'),
                                                                          (3, 'Crear wireframes en Figma'),
                                                                          (4, 'Implementar pruebas JUnit');

INSERT INTO public.mission_assignments (id, mission_id, team_id, status) VALUES
                                                                             (1, 1, 1, 'IN_PROGRESS'),  -- Equipo Alpha trabaja en Proyecto Final
                                                                             (2, 1, 2, 'PENDING'),      -- Equipo Beta también asignado (pendiente)
                                                                             (3, 2, 3, 'IN_PROGRESS'),  -- Equipo Gamma en Investigación DB
                                                                             (4, 4, 5, 'COMPLETED');    -- Equipo Epsilon completó Pruebas Unitarias

-- Tareas con asignación a equipos
INSERT INTO tasks_completed (id, title, assignment_id) VALUES
                                                           (1, 'Desarrollar módulo de autenticación', 1),
                                                           (2, 'Crear API para gestión de usuarios', 1),
                                                           (3, 'Configurar cluster MongoDB', 3),
                                                           (4, 'Ejecutar benchmarks', 3),
                                                           (5, 'Implementar pruebas de servicio', 4);

INSERT INTO attachments (id, file_name, url, mission_id) VALUES
                                                             (1, 'Especificaciones.pdf', 'https://storage.example.com/files/specs.pdf', 1),
                                                             (2, 'Diagrama_BD.png', 'https://storage.example.com/images/db_diagram.png', 1),
                                                             (3, 'Resultados_Benchmark.xlsx', 'https://storage.example.com/files/benchmark.xlsx', 2),
                                                             (4, 'Guia_Pruebas.pdf', 'https://storage.example.com/docs/test_guide.pdf', 4);


ALTER SEQUENCE teams_id_seq RESTART WITH 6;
ALTER SEQUENCE students_id_seq RESTART WITH 11;
ALTER SEQUENCE missions_id_seq RESTART WITH 5;
ALTER SEQUENCE attachments_id_seq RESTART WITH 7;
ALTER SEQUENCE tasks_completed_id_seq RESTART WITH 6;
