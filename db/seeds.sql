INSERT INTO departments(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles(title,salary,department_id)
VALUES
('Sales Lead', 10000.00, 1),
('Salesperson', 80000.00, 1),
('Lead Engineer', 150000.00, 2),
('Software Engineer', 120000.00, 2),
('Account Manager', 160000.00, 3),
('Accountant', 125000.00, 4),
('Legal Team Lead', 250000.00, 4);

INSERT INTO employees(first_name,last_name,role_id)
VALUES
  ('Ronald', 'Firbank',1),
  ('Virginia', 'Woolf',2),
  ('Piers', 'Gaveston',2),
  ('Charles', 'LeRoi',3),
  ('Katherine', 'Mansfield',4),
  ('Dora', 'Carrington',5),
  ('Edward', 'Bellamy',6),
  ('Montague', 'Summers',6),
  ('Octavia', 'Butler',7),
  ('Unica', 'Zurn',4);