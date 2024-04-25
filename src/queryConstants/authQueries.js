const trainerEmailID = "select trainer_id,email from trainer"
const registerTrainer = "insert into trainer(email,password,name,phone,status) values ($1 , $2, $3, $4, $5)"
const particularTrainerByEmail = "SELECT * from trainer WHERE email = $1"
const particularTrainerById = "SELECT trainer_id, email FROM trainer WHERE trainer_id = $1"
const updatePassword = "UPDATE trainer SET password = $1 WHERE trainer_id = $2 RETURNING *"
module.exports = {
    trainerEmailID,
    registerTrainer,
    particularTrainerByEmail,
    updatePassword,
    particularTrainerById

    
}