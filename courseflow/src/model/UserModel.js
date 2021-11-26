import {auth} from '../firebase';

class UserModel{
    constructor(
        currentUser=null,
        courses=[]
    ){
        this.observers = [];
        this._currentUser = currentUser;
        this._courses = courses;
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
        });
    }

    /** Helper function to reset all instance internal properties without notifying the observers */
    resetModel() {
        this._currentUser = null;
        this._courses = [];
    }

    /**
     * Setter function to always notify observers when the current user is updated
     * @param {User} newValue - Updated value for the currentUser property
     */
    set currentUser(newValue) {
        this._currentUser = newValue;
        this.notifyObservers();
    }

    /** Getter function for the currentUser property (required for setter function) */
    get currentUser() {
        return this._currentUser;
    }

        /**
     * Setter function to always notify observers when the user's courses are updated
     * @param {Courses[]} newValue - Updated value for the courses property
     */
    set courses(newValue) {
        this._courses = newValue;
        this.notifyObservers();
    }

    /** Getter function for the courses property (required for setter function) */
    get courses() {
        return this._courses;
    }

    /**
     * Adds an observer calling the specified callback function
     * @param {observerCallback} callback - Callback function to be called when observed value changes
     */
    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    /**
     * Removes the specified observer callback
     * @param {observerCallback} callback - Callback function to be removed
     */
    removeObserver(callback) {
        this.observers = this.observers.filter(
            (observer) => observer !== callback
        );
    }

    /** Calls each callback function in the observers array */
    notifyObservers() {
        this.observers.forEach((callback) => {
            setTimeout(() => {
                try {
                    callback();
                } catch (error) {
                    console.error(error);
                }
            }, 0);
        });
    }

}

export default UserModel;