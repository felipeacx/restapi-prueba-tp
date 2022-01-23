create database restapi;

create table Users(
  id serial primary key,
  name VARCHAR(40),
  email TEXT,
  password varchar(40),
  rol INT
);
/* Administrador: 1, Usuario: 2 */
/* Contraseña por defecto: 123456 */
insert into Users (name, email, password, rol) values
  ('Felipe Acosta','juanfe1190@gmail.com','94b6006209bc170ba03c0d6528978267',1),
  ('Gilberto Rodriguez','gilrod@gmail.com','94b6006209bc170ba03c0d6528978267',2);

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