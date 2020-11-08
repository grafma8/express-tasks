CREATE DATABASE test_db;
CREATE TABLE testing(
    id serial,
    name varchar(255),
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    primary key (id)
);
INSERT INTO testing(id, name) values(default, 'testname-1');
INSERT INTO testing(id, name) values(default, 'testname-2');
INSERT INTO testing(id, name) values(default, 'testname-3');