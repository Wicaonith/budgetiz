CREATE DATABASE IF NOT EXISTS budgetiz;

drop table budgetiz.bud_undercategories;
drop table budgetiz.bud_sections;


CREATE TABLE IF NOT EXISTS budgetiz.bud_sections
(
	id INT PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS budgetiz.bud_undercategories
(
	id INT PRIMARY KEY NOT NULL,
	name VARCHAR(100),
	category INT NOT null,
	inTab tinyint,
	constraint bud_sections
		foreign key (category)
		references bud_sections(id)
);

