CREATE DATABASE gif;

CREATE TABLE favorites (
	id SERIAL PRIMARY KEY,
	comment varchar(200) NOT NULL,
  image varchar(200) NOT NULL
);
