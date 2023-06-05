-- ADMIN
CREATE TABLE admin(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
INSERT INTO admin(username, password)VALUES('start21-admin','112233');

-- STATISTICS
CREATE TABLE stats(
    totalstudents INT NOT NULL,
    graduators INT
);
INSERT INTO stats(totalstudents, graduators)VALUES(865, 650);
SELECT stats.totalstudents, stats.graduators, count(t.id) FROM stats JOIN teachers t ON t.id = t.id GROUP BY stats.totalstudents, stats.graduators, t.id;

-- COURSE
CREATE TABLE courses(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL
);
INSERT INTO courses(title) VALUES('IELTS'),('Kids English'), ('Intensive IELTS'),( 'DTM'),( 'CEFR'), ('Genereal English');

SELECT c.id, c.title, COUNT(g.course_id) AS number_of_groups FROM courses c join groups g on c.id = g.course_id GROUP BY c.id;


-- TEACHERS
CREATE TABLE teachers(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    image TEXT,
    phone TEXT NOT NULL,
    course_id TEXT NOT NULL, FOREIGN KEY(course_id) REFERENCES courses(id)
);
INSERT INTO teachers(name,image,phone,course_id)
    VALUES('Eshmat dtm', 'https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg', '+998654125698', '04ca5634-b0c4-4bd2-b02a-50869c59b335'),('Anna cefr', 'https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=', '+88954648966', '696ed573-4ee6-4ba9-8476-53a99f34495a'),
    ('Eshmat dtm', 'https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg', '+998654125698', '04ca5634-b0c4-4bd2-b02a-50869c59b335'),('Eren Yeager', 'https://www.spieltimes.com/wp-content/uploads/2023/04/Eren-1.png', '+565987965446', 'a5f902d8-7736-4ecb-a93a-e578fd882329'),('Mikey ielts', 'image.png', '+9989654654','967ed74d-0e6d-4c70-baa2-50b69636e8eb'),
    ('Sarah kids', 'men.jpg', '+99879756545','29027cbe-bd7d-42ee-bb2e-799834df54ce'),
    ('Thomas intens', 'avatar.png', '+99856987459','98912737-ff82-4f5d-9288-2118ad80f0cf');

UPDATE teachers SET name = COALESCE($1, name) where id = $2;
ALTER TABLE teachers ADD COLUMN isDeleted BOOLEAN DEFAULT false;

-- GROUP
CREATE TABLE groups(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    days TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    course_id TEXT NOT NULL, FOREIGN KEY (course_id) REFERENCES courses(id),
    teacher_id TEXT NOT NULL, FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);
INSERT INTO groups(days ,start_time, end_time, course_id, teacher_id) 
    VALUES('even','16:00', '18:00','04ca5634-b0c4-4bd2-b02a-50869c59b335','c524111d-f1ec-41fd-957f-bf577ae05d80'),
    ('odd','09:00', '11:00','04ca5634-b0c4-4bd2-b02a-50869c59b335','c524111d-f1ec-41fd-957f-bf577ae05d80'),
    ('even','08:00', '10:00','696ed573-4ee6-4ba9-8476-53a99f34495a','6e553b87-5cd7-4110-be3e-6478d8ee0c58'),
    ('even','14:00', '16:00','a5f902d8-7736-4ecb-a93a-e578fd882329','fae2265f-c765-404d-92ef-86bd01c8f538'),
    ('even','15:00', '17:00','967ed74d-0e6d-4c70-baa2-50b69636e8eb','e2b59648-b673-4e3e-abfe-a58794a96eca'),
    ('odd','10:00', '12:00','967ed74d-0e6d-4c70-baa2-50b69636e8eb','e2b59648-b673-4e3e-abfe-a58794a96eca'),
    ('odd','09:00', '11:00','29027cbe-bd7d-42ee-bb2e-799834df54ce','a8680039-8010-4429-94ae-7f115dad69aa'),
    ('even','15:00', '17:00','98912737-ff82-4f5d-9288-2118ad80f0cf','72f78cae-f037-422e-8a70-1583c9b21666');
          
-- REGISTER STUDENTS
CREATE TABLE registered(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    course TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO registered(name,phone,course)
    VALUES('Adam', '+9989498545946', 'Intensive'),
          ('Odell', '+9989498547890', 'Kids'),
          ('Zayn', '+9989498512345', 'IELTS');
          
-- STUDENTS
CREATE TABLE students(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    group_id TEXT NOT NULL, FOREIGN KEY(group_id) REFERENCES groups(id)
);
INSERT INTO students(name,phone, group_id)
    VALUES('Naruto', '+9989498545946', '81093890-a862-40c2-94cd-e6f3812b2410'),
          ('Sasuke', '+9989498547890', 'a97c309d-7301-485c-ab81-bc61afecccdc'),
          ('Choji', '+9989498544565', 'a97c309d-7301-485c-ab81-bc61afecccdc'),
          ('Ino', '+9989498514589', '2e75bb94-6b38-41b4-a39f-7ac12bc3a32d'),
          ('TenTen', '+9989498512222', '2e75bb94-6b38-41b4-a39f-7ac12bc3a32d'),
          ('Sakura', '+9989498512345', '2e75bb94-6b38-41b4-a39f-7ac12bc3a32d');


CREATE TABLE "deleted_students"(
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "date" TIMESTAMP  DEFAULT CURRENT_DATE
);
CREATE OR REPLACE FUNCTION deleteStudentsFunc() RETURNS TRIGGER AS $delete_student$
    BEGIN
       INSERT INTO deleted_students(id,name,phone,group_id) VALUES (old.id, old.name,old.phone, old.group_id);
       RETURN old;
    END;
 $delete_student$ LANGUAGE plpgsql;
 
CREATE TRIGGER delete_student_tg AFTER
DELETE ON "students"
FOR EACH ROW EXECUTE PROCEDURE deleteStudentsFunc();


-- ATTENDANCE
CREATE TABLE attendance (
  id SERIAL NOT NULL UNIQUE,
  student_id TEXT NOT NULL,
  group_id TEXT NOT NULL,
  date TEXT NOT NULL,
  present BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (student_id) REFERENCES students (id),
  FOREIGN KEY (group_id) REFERENCES groups (id)
);


-- NEWS
CREATE TABLE news(
    id TEXT NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    time TEXT DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO news(title,description,image)
VALUES('New Branch',
       'We are opening a new branch of our center',
       'image.jpg');

-- IELTS RESULTS
CREATE TABLE ieltsresults(
    eightpoint INT,
    eight INT,
    sevenpoint INT,
    seven INT,
    sixpoint INT,
    six INT,
    fivepoint INT,
    five INT
);
INSERT INTO ieltsresults(eight)VALUES(3);
INSERT INTO ieltsresults(sevenpoint)VALUES(12);
INSERT INTO ieltsresults(seven)VALUES(43);
INSERT INTO ieltsresults(sixpoint)VALUES(75);
INSERT INTO ieltsresults(six)VALUES(53);
INSERT INTO ieltsresults(fivepoint)VALUES(46);
INSERT INTO ieltsresults(five)VALUES(8);

-- INTENSIVE RESULTS
CREATE TABLE intensiveresults(
    eightpoint INT,
    eight INT,
    sevenpoint INT,
    seven INT,
    sixpoint INT,
    six INT,
    fivepoint INT,
    five INT,
    belowfive INT
);
INSERT INTO intensiveresults(sevenpoint)VALUES(2);
INSERT INTO intensiveresults(seven)VALUES(15);
INSERT INTO intensiveresults(sixpoint)VALUES(56);
INSERT INTO intensiveresults(six)VALUES(58);
INSERT INTO intensiveresults(fivepoint)VALUES(62);
INSERT INTO intensiveresults(five)VALUES(30);

