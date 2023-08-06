DELETE FROM rc_user;

ALTER SEQUENCE global_seq RESTART WITH 100000;


INSERT INTO rc_note (text, color, is_completed, date_time)
VALUES  ('test note1', 'bg-danger', false, '2023-01-06T10:00'),
        ('test note2', 'bg-warning', true,  '2023-02-06T12:00'),
        ('test note3', 'bg-success', true,  '2023-03-06T13:00'),
        ('test note5', 'bg-primary', false,  '2023-04-06T14:00');




