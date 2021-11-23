
insert into budgetiz.bud_sections (id, name, type)
values 
('1', '[R] Salaire','Revenu'),
('2', '[R] Remboursement','Revenu'),
('3', '[R] Autre','Revenu'),
('4', '[C] Habitat','Charge'),
('5', '[C] Services','Charge'),
('6', '[C] Imp�ts','Charge'),
('7', '[C] Sant�','Charge'),
('8', '[C] Vie Courante','Charge'),
('9', '[C] Transport','Charge'),
('10', '[P] Impr�vu','Provision'),
('11', '[P] Autres','Provision');


insert into budgetiz.bud_undercategories (id, name, category ,inTab)
values 
('1', 'Salaire','1', '1'),
('2', 'Remboursement','1', '1'),
('3', 'Loyer','1', '1'),
('4', 'Loyer','2', '1'),
('5', 'Electricit�','2', '1');