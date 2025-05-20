import Library from "./Library.js";

export default class PaperBook extends Library {
    constructor() {
        super();
        this.bookType = 'paper';
        this.addBook();
    }
}