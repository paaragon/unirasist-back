create table assistant_message (
    conversation_id varchar(36),
    date timestamp with time zone,
    student_id integer,
    input_usuario text,
    output_keys text,
    output_values text,
    main_entity text,
    main_confidence decimal,
    constraint assistant_pk primary key (conversation_id, date),
    FOREIGN KEY(student_id) 
        REFERENCES student(student_id)
);

create index assistant_student_id_idx on assistant_message(student_id);
