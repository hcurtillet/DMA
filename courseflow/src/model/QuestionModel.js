import database from "../firebase";

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

    getQuestion(questionid=null){
        const myQuestion = database.collection('Questions').docs('1');
        myQuestion.onSnapShot(
            question =>{
                const data = question.data();
                console.log(data);
            }
        )
    }
}

export default QuestionModel;