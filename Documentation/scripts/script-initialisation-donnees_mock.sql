
insert into budgetiz.bud_sections (id, name, type)
values 
('1', 'Salaire','Revenu'),
('2', 'Remboursement','Revenu'),
('3', 'Autre','Revenu'),
('4', 'Habitat','Charge'),
('5', 'Services','Charge'),
('6', 'Imp�ts','Charge'),
('7', 'Sant�','Charge'),
('8', 'Vie Courante','Charge'),
('9', 'Transport','Charge'),
('10', 'Impr�vu','Provision'),
('11', 'Autres','Provision');


insert into budgetiz.bud_undersections (id, name, section ,inTab)
values 
('1', 'Salaire','1', '1'),
('2', 'Remboursement','1', '1'),
('3', 'Loyer','1', '1'),
('4', 'Loyer','2', '1'),
('5', 'Electricit�','2', '1');