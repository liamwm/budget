CREATE TABLE transaction (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    merchant VARCHAR(30),
    trans_date DATE,
    amount DECIMAL(10, 2),
    details VARCHAR(50),
    PRIMARY KEY (id)
);