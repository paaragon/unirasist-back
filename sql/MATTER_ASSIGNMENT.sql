create table matter_assignment (
    id SERIAL PRIMARY KEY,
    matter_id integer,
    title varchar(30),
    description text,
    attachement_url varchar(100),
    deadline timestamp with time zone,
    FOREIGN KEY(matter_id) 
        REFERENCES matter(matter_id)
);
