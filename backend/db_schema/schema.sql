CREATE DATABASE chat;
USE chat;

DROP TABLE IF EXISTS test;

CREATE TABLE test (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
);

INSERT INTO test(title) VALUES('prvi unos ');
INSERT INTO test(title) VALUES('drugi unos ');
INSERT INTO test(title) VALUES('treci unos ');