import Library from "./Library.js";

export default class DigitalBook extends Library {
    constructor() {
        super();
        this.bookType = 'digital';
        this.addBook();
    }

    static addDigitalBook() {
        console.log('pouet');
    }
}