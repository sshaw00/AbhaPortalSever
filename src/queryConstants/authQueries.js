const trainerEmailID = "select employee_id,employee_email from teamabha";
const registerTrainer =
  "insert into teamabha(employee_email,employee_password,employee_name,employee_phone,status) values ($1 , $2, $3, $4, $5)";
const particularTrainerByEmail =
  "SELECT * from teamabha WHERE employee_email = $1";
const particularTrainerById =
  "SELECT employee_id, employee_email FROM teamabha WHERE employee_id = $1";
const updatePassword =
  "UPDATE teamabha SET employee_password = $1 WHERE employee_id = $2 RETURNING *";
const centreidbycentrename =
  "SELECT batch_id,centre_id, batch_name from batch where centre_id = $1";
const centres = "SELECT centre_id, centre_name from centre";

const getStudents = "SELECT * from student where batch_id = $1";
const getStudentsByCentre = "SELECT * from student where centre_id = $1";
const registerStudent =
  "INSERT INTO student( centre_name,centre_id, batch_name,batch_id,student_id,  name, contact, address) VALUES ($1, $2,$3,$4,$5,$6,$7,$8)";
const deleteStudent = "DELETE FROM student WHERE student_id = $1";
const registerBatch =
  "INSERT INTO batch( centre_id,batch_id, batch_name) VALUES ($1, $2,$3)";
const updateStudent =
  "update student set name = $1, contact = $2, address =$3 where student_id= $4;";
const registerCentre =
  "INSERT INTO centre (centre_number,centre_type,centre_name,centre_address,status) values($1,$2,$3,$4,$5)";
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
  registerCentre,
};
