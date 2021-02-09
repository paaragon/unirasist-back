create table student_alert (
    id SERIAL PRIMARY KEY,
    date timestamp with time zone,
    student_id integer,
    severity integer,
    department varchar(50),
    department_human varchar(50),
    type varchar(50),
    title varchar(50),
    link varchar(100),
    readed boolean,
    FOREIGN KEY(student_id) 
        REFERENCES student(student_id)
);