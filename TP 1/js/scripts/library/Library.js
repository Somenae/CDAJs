import ManageDom from "../assets/ManageDom.js";
import Librarian from "../users/Librarian.js";
import Member from "../users/Member.js";

export default class Library extends ManageDom {
    constructor() {
        super();
        /* this.books = []; */
        this.connectedUser;
        this.start();
    }

    start() {
        this.addEvent();
        this.displayBooks();
        //this.test();
    }

    addEvent() {
        const librarianButton = document.getElementById('librarian');
        librarianButton.addEventListener('click', () => this.connectLibrarian());
        
        const memberButton = document.getElementById('member');
        memberButton.addEventListener('click', () => this.connectMember());

        const findButton = document.getElementById('rechercher');
        findButton.addEventListener('click', () => this.findBook());

        const disconnectButton = document.getElementById('disconnect');
        disconnectButton.addEventListener('click', () => this.disconnect());

        let forms = document.getElementsByTagName('form');
        for (let i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", (event) => {
                event.preventDefault();
            });
        }
    }

    connectLibrarian() {
        this.disconnect();

        this.connectedUser = new Librarian('Libraire', Date.now());

        this.connect();
        
        const addBooks = document.getElementById('addBooks');
        addBooks.classList.remove('hidden');

        const addForm = document.getElementById('addForm');
        if (!document.getElementById('ajouter')) {
            const addButton = this.createMarkup('button', 'ajouter', addForm, [{ type:'submit', id:'ajouter' }]);
            addButton.addEventListener('click', () => this.addBook());
        }

        const deleteBooks = document.getElementById('deleteBooks');
        deleteBooks.classList.remove('hidden');

        const deleteForm = document.getElementById('deleteForm');
        if (!document.getElementById('supprimer')) {
            const deleteButton = this.createMarkup('button', 'supprimer', deleteForm, [{ type:'submit', id:'supprimer' }]);
            deleteButton.addEventListener('click', () => this.deleteBook());
        }

        this.showSearch();        
    }

    connectMember() {
        this.disconnect();

        this.connectedUser = new Member('Membre', Date.now());
    
        this.connect();

        this.showSearch();
    }

    showSearch() {
        const searchBook = document.getElementById('searchBook');
        if (searchBook.classList.contains('hidden')) {
            searchBook.classList.remove('hidden');
        }
    }

    connect() {
        const title = document.getElementById('title');
        this.createMarkup('h1', `Bienevenue ${this.connectedUser.name}`, title, [{ id: 'greeting' }]);

        const navBar = document.getElementById('navBar');
        if (!document.getElementById('profile')) {
            const profileButton = this.createMarkup('button', 'Profile', navBar, [{ type:'submit', id:'profile' }]);
            profileButton.addEventListener('click', () => this.connectedUser.seeProfile());
        }
    }

    disconnect() {
        const greeting = document.getElementById('greeting');
        if (greeting) {
            greeting.remove();
        }

        const addButton = document.getElementById('ajouter');
        if (addButton) {
            addButton.remove();
        }

        const addBooks = document.getElementById('addBooks');
        if (!addBooks.classList.contains('hidden')) {
            addBooks.classList.add('hidden');
        }

        const deleteButton = document.getElementById('supprimer');
        if (deleteButton) {
            deleteButton.remove();
        }

        const deleteBooks = document.getElementById('deleteBooks');
        if (!deleteBooks.classList.contains('hidden')) {
            deleteBooks.classList.add('hidden');
        }

        const searchBook = document.getElementById('searchBook');
        if (!searchBook.classList.contains('hidden')) {
            searchBook.classList.add('hidden');
        }

        const profileButton = document.getElementById('profile');
        if (profileButton) {
            profileButton.remove();
        }

        this.connectedUser = undefined;
    }

    addBook() {
        if (this.connectedUser !== undefined) {
            if (this.connectedUser.getRole() === 'librarian') {
                const titre = document.getElementById('titre').value;
                const annee = document.getElementById('annee').value;
                const auteur = document.getElementById('auteur').value;
                const bookType = document.getElementById('bookType').value;
        
                const string = JSON.stringify({
                    annee: annee,
                    auteur: auteur,
                    type: bookType,
                });
        
                localStorage.setItem(titre, string);
        
                this.displayBooks();
            } else {
                alert("Vous n'avez pas les droits requis");
            }
        } else {
            alert("Vous devez vous connecter");
        }
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
            const tdButton = this.createMarkup('td', '', tr);
            const borrowButton = this.createMarkup('button', 'Emprunter', tdButton, [{ type:'button' }]);
            borrowButton.addEventListener("click", () => Member.borrowBook(localStorage.key(searchInput.value)));
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
            /* const button = this.createMarkup('button', "Emprunter", li);
            button.addEventListener("click", () => Member.borrowBook(localStorage.key(i))); */
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

    test() {
        const navBar = document.getElementById('navBar');
        const testButton = this.createMarkup('button', 'test', navBar);
        testButton.addEventListener('click', () => this.addBook());
    }
}