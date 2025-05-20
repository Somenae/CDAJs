import ManageDom from "../assets/ManageDom.js";

export default class Users extends ManageDom {
    constructor(name, idUser) {
        super();
        this.name = name;
        this.idUser = idUser;
    }

    seeProfile() {
        console.log(this.name, this.idUser)
    }
}