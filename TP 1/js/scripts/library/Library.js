import ManageDom from "../assets/ManageDom.js";

export default class Library extends ManageDom {
    constructor() {
        super();
        this.books = [];
        this.start();
    }

    start() {
        this.addEvent();
        this.displayBooks();
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
        const bookType = document.getElementById('bookType');
        this.books.push({
            titre: titre.value,
            annee: annee.value,
            auteur: auteur.value,
            type: bookType.value,
        });

        const string = JSON.stringify({
            annee: annee.value,
            auteur: auteur.value,
            type: bookType.value,
        });

        localStorage.setItem(titre.value, string);

        this.displayBooks();
    }

    findBook() {
        this.removeRows();
        const searchInput = document.getElementById('findBook');
        const search = searchInput.value;
        const datas = document.getElementById('datas');
        const bookDatas = localStorage.getItem(search);
        /* let count = 0; */

        if (bookDatas === null) {
            alert('Aucun livre trouvé');
        } else {
            const parsedBookDatas = JSON.parse(bookDatas);
            const tr = this.createMarkup('tr', '', datas, [{id: 'infos'}]);
            this.createMarkup('td', searchInput.value, tr);
            this.createMarkup('td', parsedBookDatas.auteur, tr);
            this.createMarkup('td', parsedBookDatas.annee, tr);
            this.createMarkup('td', parsedBookDatas.type, tr);
        }

        /* this.books.forEach(element => {
            if (element.titre === search) {
                count++;
                const tr = this.createMarkup('tr', '', datas, [{id: 'infos'}]);
                this.createMarkup('td', element.titre, tr);
                this.createMarkup('td', element.auteur, tr);
                this.createMarkup('td', element.annee, tr);
                this.createMarkup('td', element.type, tr);
            }
        }); */

        /* if (count === 0) {
            alert('Aucun livre trouvé');
        } */
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
        for (let i = 0; i < localStorage.length; i++) {
            const li = this.createMarkup('li', `${localStorage.key(i)}`, liste);
        }
        /* this.books.forEach(element => {
            const li = this.createMarkup('li', `${element.titre}`, liste);
        }); */
        
    }

    detachBooks() {
        let li = document.getElementsByTagName('li');
        while (li.length > 0) {
            li[li.length-1].remove();
        }
    }

    deleteBook() {
        const deletedBook = document.getElementById('deletedBook');

        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) === deletedBook.value) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        } else {
            alert('Ajoutez des livres pour pouvoir en supprimer');
        }

        /* if (this.books.length > 0) {
           for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].titre === deletedBook.value) {
                    this.books.splice(i, i+1);
                } else {
                    alert('Le livre n\'existe pas');
                }
            } 
        } else {
            alert('Ajoutez des livres pour pouvoir en supprimer');
        } */
        this.displayBooks();
        this.removeRows();
    }
}