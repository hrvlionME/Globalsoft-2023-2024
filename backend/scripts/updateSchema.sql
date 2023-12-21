USE BAZA

CREATE TABLE 
    jwt_tokens (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT,
        token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expiration_date DATETIME,
        is_revoked BOOLEAN,
        FOREIGN KEY (user_id) REFERENCES users(ID)
    );