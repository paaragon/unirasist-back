create table matter_assignment_fullfilment (
    id SERIAL PRIMARY KEY,
    assignment_id integer,
    student_id integer,
    fullfilment_url varchar(100),
    qualification decimal,
    comments text,
    FOREIGN KEY(assignment_id) 
        REFERENCES matter_assignment(id),
    FOREIGN KEY(student_id) 
        REFERENCES student(student_id)
);
