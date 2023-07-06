DELETE FROM rc_user;

ALTER SEQUENCE global_seq RESTART WITH 100000;


INSERT INTO rc_note (text, color, is_completed)
VALUES  ('test note1', 'blue', false),
        ('test note2', 'red', true),
        ('test note3', 'yellow', true),
        ('test note5', 'green', false);




