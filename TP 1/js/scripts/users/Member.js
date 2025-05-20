import Users from "./Users.js";

export default class Member extends Users {

    static borrowedBooks = [];
    #role = 'member';

    constructor(name, idUser) {
        super(name, idUser);
    }

    static borrowBook(title) {
        this.borrowedBooks.push(title);
        console.log(this.borrowedBooks)
    }

    seeProfile() {
        super.seeProfile();
        console.log(this.#role);
    }

    getRole() {
        return this.#role;
    }
}