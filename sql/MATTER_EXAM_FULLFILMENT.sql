create table matter_exam_fullfilment (
    id SERIAL PRIMARY KEY,
    student_id integer,
    exam_id integer,
    fullfilment_url varchar(100),
    qualification decimal,
    comments text,
    FOREIGN KEY(student_id) 
        REFERENCES student(student_id),
    FOREIGN KEY(exam_id) 
        REFERENCES matter_exam(id)
);
