import Users from "./Users.js";

export default class Librarian extends Users {
    
    #role = 'librarian';

    constructor(name, idUser) {
        super(name, idUser);
    }

    seeProfile() {
        super.seeProfile();
        console.log(this.#role);
    }

    getRole() {
        return this.#role;
    }
}