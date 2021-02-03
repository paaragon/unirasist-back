create table matter_schedule (
    id serial primary key,
    matter_id integer,
    day_of_week integer,
    start_hour integer,
    start_minute integer,
    end_hour integer,
    end_minute integer,
    FOREIGN KEY(matter_id) 
        REFERENCES matter(matter_id)
);
