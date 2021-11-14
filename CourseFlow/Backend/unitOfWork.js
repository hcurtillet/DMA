import userController from './userController.js';
const mysql = require("mysql2/promise");

const initConnection = async () => {
    return await mysql.createConnection({
        host: "sql11.freesqldatabase.com",
        user: "sql11450959",
        password: "XTJEBbbENG",
        database: "sql11450959",
        port: 3306
    })
}

class unitOfWork{
    constructor(){
        this.connection = initConnection();
        this.userController = new userController();
    }
}

unitOfWork = new unitOfWork();
unitOfWork.userController.setUnitOfWork(unitOfWork);
unitOfWork.userController.signIn();