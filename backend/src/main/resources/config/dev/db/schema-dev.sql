DROP TABLE IF EXISTS rc_note;
DROP TABLE IF EXISTS rc_user;
DROP SEQUENCE IF EXISTS global_seq;

CREATE SEQUENCE global_seq START WITH 100000;

CREATE TABLE rc_user
(
    id               LONG DEFAULT NEXTVAL('global_seq') PRIMARY KEY,
    email            VARCHAR(255)   NOT NULL,
    password         VARCHAR(255)   NOT NULL,
    role             VARCHAR(255)   NOT NULL,
    first_name       VARCHAR(255)   NOT NULL,
    last_name        VARCHAR(255)   NOT NULL,
    gender           VARCHAR(255)   NOT NULL,
    birth_day        TIMESTAMP      NOT NULL
);
CREATE UNIQUE INDEX user_unique_email_idx ON rc_user (email);

CREATE TABLE rc_note
(
    id               LONG DEFAULT NEXTVAL('global_seq') PRIMARY KEY,
    text             TEXT           NOT NULL,
    color            VARCHAR(30)    NOT NULL,
    is_completed     BOOLEAN        NOT NULL,
    date_time        TIMESTAMP      NOT NULL
);