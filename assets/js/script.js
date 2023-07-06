document.addEventListener('DOMContentLoaded', function () {
    const submit = document.getElementById('form');
    const clear = document.getElementById('btn-clear');
    const bookList = [];
    const RENDER_HTML = 'render-object';
    const SAVED_VALUE = 'saved-book';
    const STORAGE_KEY = 'Book_shelf';

    const generateID = () => {
        return Date.now();
    }

    const generateBookObject = (id, title, author, year, isFinished) => {
        return {
            id,
            title,
            author,
            year,
            isFinished
        }
    }

    document.addEventListener(SAVED_VALUE, () => {
        console.log(localStorage.getItem(STORAGE_KEY));
    });

    const loadData = () => {
        const serialData = localStorage.getItem(STORAGE_KEY);
        let bookData = JSON.parse(serialData);

        if (bookData !== null) {
            for (const data of bookData) {
                bookList.push(data);
            }
        }
        document.dispatchEvent(new Event(RENDER_HTML));
    }

    const storageExist = () => {
        if (typeof (Storage) === undefined) {
            alert("Not Supported Browser Version");
            return false;
        }
        return true;
    }

    const saveData = () => {
        if (storageExist()) {
            const parsedArray = JSON.stringify(bookList);
            localStorage.setItem(STORAGE_KEY, parsedArray);
            document.dispatchEvent(new Event(SAVED_VALUE));
        }
    }

    document.addEventListener(RENDER_HTML, () => {
        const bookListSaved = document.getElementById('bookList');
        bookListSaved.innerText = '';
        for (const bookItem of bookList) {
            const bookElement = makeBook(bookItem);
            bookListSaved.appendChild(bookElement);
        }

        if (bookListSaved.childElementCount === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Belum ada data buku';
            bookListSaved.appendChild(emptyMessage);
        }


    });

    const makeBook = (bookObject) => {
        const bookTitle = document.createElement('h3');
        bookTitle.innerText = bookObject.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.innerText = bookObject.author;

        const bookYear = document.createElement('p');
        bookYear.innerText = bookObject.year;

        const bookFinished = document.createElement('p');
        bookFinished.innerText = bookObject.isFinished;

        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book');
        bookContainer.append(bookTitle, bookAuthor, bookYear, bookFinished);
        bookContainer.setAttribute('id', `book-${bookObject.id}`);
        return bookContainer;
    }

    const addBook = () => {
        const bookTitle = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const bookYearNum = parseInt(year);

        if (bookYearNum === null) {
            alert('Input Tahun Wajib Menggunakan Angka!');
        }

        const checkRadio = document.querySelectorAll('input[name="isFinished"]');
        let selectedValue;

        for (const radio of checkRadio) {
            if (radio.checked) {
                selectedValue = radio.value;
                break;
            }
        }

        const idGenerator = generateID();
        const bookObject = generateBookObject(idGenerator, bookTitle, author, year, selectedValue);
        
        bookList.push(bookObject);

        document.dispatchEvent(new Event(RENDER_HTML));
        saveData();
    }

    submit.addEventListener('submit', (action) => {
        action.preventDefault();
        addBook();
    });

    clear.addEventListener('click', () => {
        bookList.length = 0;
        document.dispatchEvent(new Event(RENDER_HTML));
        saveData();
    });

    if (storageExist()) {
        loadData();
    }

});

window.addEventListener('scroll', () => {
    var navbar = document.querySelector('.navbar-container');
    if (window.scrollY > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});