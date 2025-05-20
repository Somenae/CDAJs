import Library from "./Library.js";

export default class DigitalBook extends Library {
    constructor() {
        super();
        this.bookType = 'digital';
    }

    static addDigitalBook() {
        console.log('pouet');
    }
}