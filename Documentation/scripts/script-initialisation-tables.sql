CREATE DATABASE IF NOT EXISTS budgetiz;

drop table budgetiz.bud_undersections;
drop table budgetiz.bud_sections;


CREATE TABLE IF NOT EXISTS budgetiz.bud_sections
(
	id INT PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS budgetiz.bud_undersections
(
	id INT PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	section INT NOT null,
	inTab tinyint,
	constraint bud_sections
		foreign key (section)
		references bud_sections(id)
);

