create table student_matter (
    id serial primary key,
    student_id integer,
    matter_id integer,
    FOREIGN KEY(student_id) 
        REFERENCES student(student_id),
    FOREIGN KEY(matter_id) 
        REFERENCES matter(matter_id)
);
