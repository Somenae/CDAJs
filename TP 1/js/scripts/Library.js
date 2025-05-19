import ManageDom from "./ManageDom.js";

export default class Library extends ManageDom {
    constructor() {
        super();
        this.books = [];
        this.start();
    }

    start() {
        this.addEvent();
    }

    addEvent() {
        const button = document.getElementById('ajouter');
        button.addEventListener('click', () => this.addBook());

        const findButton = document.getElementById('rechercher');
        findButton.addEventListener('click', () => this.findBook());

        const deleteButton = document.getElementById('supprimer');
        deleteButton.addEventListener('click', () => this.deleteBook());

        let forms = document.getElementsByTagName('form');
        for (let i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", (event) => {
                event.preventDefault();
            });
        }
    }

    addBook() {
        const titre = document.getElementById('titre');
        const annee = document.getElementById('annee');
        const auteur = document.getElementById('auteur');
        this.books.push({
            titre: titre.value,
            annee: annee.value,
            auteur: auteur.value,
        });
        this.displayBooks();
    }

    findBook() {
        this.removeRows();
        const searchInput = document.getElementById('findBook');
        const search = searchInput.value;
        const datas = document.getElementById('datas');
        let count = 0;

        this.books.forEach(element => {
            if (element.titre === search) {
                count++;
                const tr = this.createMarkup('tr', '', datas, [{id: 'infos'}]);
                this.createMarkup('td', element.titre, tr);
                this.createMarkup('td', element.auteur, tr);
                this.createMarkup('td', element.annee, tr);
            }
        });

        if (count === 0) {
            alert('Aucun livre trouvé');
        }
    }

    removeRows() {
        const tr = document.getElementById('infos');
        if (tr != null) {
            while (tr.firstChild) {
                tr.removeChild(tr.firstChild);
            }
        }
        const datas = document.getElementById('datas');
        while (datas.firstChild) {
            datas.removeChild(datas.firstChild);
        }
    }

    displayBooks() {        
        this.detachBooks();
        const liste = document.getElementById('listeLivres');
        this.books.forEach(element => {
            const li = this.createMarkup('li', `${element.titre}`, liste);
        });
    }

    detachBooks() {
        let li = document.getElementsByTagName('li');
        while (li.length > 0) {
            li[li.length-1].remove();
        }
    }

    deleteBook() {
        const deletedBook = document.getElementById('deletedBook');
        if (this.books.length > 0) {
           for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].titre === deletedBook.value) {
                    this.books.splice(i, i+1);
                } else {
                    alert('Le livre n\'existe pas');
                }
            } 
        } else {
            alert('Ajoutez des livres pour pouvoir en supprimer');
        }        
        this.displayBooks();
    }
}