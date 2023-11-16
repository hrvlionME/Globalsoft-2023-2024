CREATE DATABASE chat;
USE chat;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

INSERT INTO users (name, email) VALUES
 ('Mario', 'mariokozul@gmail.com'),
 ('Marko', 'mariokozul11@gmail.com');