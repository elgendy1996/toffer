CREATE TABLE IF NOT EXISTS product( id varchar(255) PRIMARY KEY,
    description varchar(255),
    price       REAL,
    image       varchar(5000),
    stock       INTEGER,
    quantity    INTEGER,
    isWishlist  INTEGER,
    category varchar(255));
