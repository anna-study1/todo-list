DELETE FROM rc_user;

ALTER SEQUENCE global_seq RESTART WITH 100000;


INSERT INTO rc_note (text, color, is_completed)
VALUES  ('test note1', 'bg-danger', false),
        ('test note2', 'bg-warning', true),
        ('test note3', 'bg-success', true),
        ('test note5', 'bg-primary', false);




