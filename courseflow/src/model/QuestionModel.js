import { database } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

class QuestionModel{
    constructor(title = null, userName=null, text=null, answers=null){
        this.title = title;
        this.userName = userName;
        this.text = text;
        this.answers = answers;
    }

    resetModel(){
        this.title = null;
        this.userName = null;
        this.text = null;
        this.answers = null;
    }

}

export default QuestionModel;