
class QuestionModel {
    constructor(title=null, user=null, answers=[], date, text=null){
        this.title = title;
        this.user = user;
        this.answers = answers;
        this.date = date;
        this.text = text;
    }

    addAnswer(answer){
        this.answers = [...this.answers, answer];
    }

}