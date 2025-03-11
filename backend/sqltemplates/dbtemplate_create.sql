-- Copy or run below SQL to create it from scrath with examples
DROP DATABASE admindash;
CREATE DATABASE admindash;
USE admindash;
CREATE TABLE `employees` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(32) NOT NULL COLLATE 'utf8mb4_general_ci',
	`surname` VARCHAR(64) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(128) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
);
INSERT INTO `admindash`.`employees` (`name`, `surname`, `email`) VALUES ('Piotr', 'Kowalski', 'piotrkowalski@gmail.com');
INSERT INTO `admindash`.`employees` (`name`, `surname`, `email`) VALUES ('Tomasz', 'Nowak', 'tomasznowak@gmail.com');