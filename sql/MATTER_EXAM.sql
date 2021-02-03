create table matter_exam (
    id SERIAL PRIMARY KEY,
    matter_id integer,
    description text,
    date timestamp with time zone,
    statement_url varchar(100),
    FOREIGN KEY(matter_id) 
        REFERENCES matter(matter_id)
);
