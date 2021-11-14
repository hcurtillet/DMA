class userController{
    setUnitOfWork(unitOfWork){
        this.unitOfWork = unitOfWork;
    }
    singIn(){
        //user = new user(id, name, email, lastConnection, idCourseFollowed, reward, idQuestion, idResponses);
        try {
            this.unitOfWork.connection.query("INSERT INTO user (id, name, email, password) VALUE (1, 'admin', 'admin@gmail.com', 'password')")
        } catch (e) {
            console.log(e)
        }
    }
}


export default userController;