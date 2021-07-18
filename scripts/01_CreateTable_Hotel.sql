CREATE TABLE `dbhoteis`.`hotel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(45) NULL,
  `avaliacao` INT NULL,
  `endereco` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
