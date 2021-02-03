create table student (
    student_id SERIAL PRIMARY KEY,
    creation_date timestamp with time zone,
    name varchar(10),
    last_name varchar(30),
    date_of_birth timestamp with time zone
);
