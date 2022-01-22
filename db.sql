create database restapi;
\c restapi;

create table Users(
  id serial primary key,
  name VARCHAR(40),
  email TEXT,
  password varchar(40),
  rol INT
);
/* 1 Administrador 2 Usuario */
insert into Users (name, email, password, rol) values
  ('Felipe Acosta','felipeacosta@gmail.com','1234',1),
  ('Gilberto Rodriguez','gilrod@gmail.com','123456',2);

create table Pelis(
  id serial primary key,
  user_id int,
  title varchar(40),
  release_date varchar(40),
  vote_average varchar(40),
  vote_count varchar(40),
  poster_path varchar(40),
  overview text,
  CONSTRAINT fk_pelis
    FOREIGN KEY(user_id) 
      REFERENCES Users(id)
        ON DELETE SET NULL
);