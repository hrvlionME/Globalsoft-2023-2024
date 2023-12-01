USE BAZA

CREATE TABLE
    users (
        ID BIGINT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        verified INT not null DEFAULT 0,
        avatar varchar(200) not null,
        user_role VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME,
        UNIQUE (email)
    );

CREATE TABLE
    chat (
        ID BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        avatar varchar(200) not null,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME
    );

CREATE TABLE
    participants(
        ID BIGINT PRIMARY KEY,
        user_id BIGINT,
        chat_id BIGINT,
        FOREIGN KEY (user_id) REFERENCES users(ID),
        FOREIGN KEY (chat_id) REFERENCES chat(ID)
    );

CREATE TABLE
    chat_details (
        ID BIGINT PRIMARY KEY,
        sender_id BIGINT,
        chat_id BIGINT,
        message VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        deleted_at DATETIME,
        FOREIGN KEY (sender_id) REFERENCES users(ID),
        FOREIGN KEY (chat_id) REFERENCES chat(ID)
    );

create table
    message_details (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        chat_details_id BIGINT NOT null,
        timestamp DATETIME,
        user_id BIGINT not null,
        FOREIGN KEY (chat_details_id) REFERENCES chat_details(ID),
        FOREIGN KEY (user_id) REFERENCES users(ID)
    );