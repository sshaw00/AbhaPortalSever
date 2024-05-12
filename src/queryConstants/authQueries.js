const trainerEmailID = "select trainer_id,email from trainer";
const registerTrainer =
  "insert into trainer(email,password,name,phone,status) values ($1 , $2, $3, $4, $5)";
const particularTrainerByEmail = "SELECT * from trainer WHERE email = $1";
const particularTrainerById =
  "SELECT trainer_id, email FROM trainer WHERE trainer_id = $1";
const updatePassword =
  "UPDATE trainer SET password = $1 WHERE trainer_id = $2 RETURNING *";
const centreidbycentrename =
  "SELECT batch_id,centre_id, batch_name from batch where centre_id = $1";
const centres = "SELECT centre_id, name from centre";

const getStudents = "SELECT * from student where batch_id = $1";
const getStudentsByCentre = "SELECT * from student where centre_id = $1";
const registerStudent =
  "INSERT INTO student( centre_name,centre_id, batch_name,batch_id,student_id,  name, contact, address) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)";
const deleteStudent = "DELETE FROM student WHERE student_id = $1";
const registerBatch =
  "INSERT INTO batch( centre_id,batch_id, batch_name) VALUES ($1, $2,$3)";
const updateStudent =
  "update student set name = $1, contact = $2, address =$3 where student_id= $4;";
module.exports = {
  trainerEmailID,
  registerTrainer,
  particularTrainerByEmail,
  updatePassword,
  particularTrainerById,
  centreidbycentrename,
  centres,
  getStudents,
  registerStudent,
  getStudentsByCentre,
  deleteStudent,
  registerBatch,
  updateStudent,
};
