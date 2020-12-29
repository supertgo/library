const newButtonEl = document.querySelector('#newButton'),
    divWindowEl = document.querySelector('#window'),
    closeEl = document.querySelector('#close'),
    addButtonEl = document.querySelector('#addButton'),
    bodyEl = document.querySelector('html'),
    libraryEl = document.querySelector('#library'),
    readEl = document.querySelector('#checkbox'),
    authorEl = document.querySelector('#authorName'),
    bookNameEl = document.querySelector('#bookName'),
    pagesEl = document.querySelector('#pages');


newButtonEl.addEventListener('click', toggleWindow);
closeEl.addEventListener('click', toggleWindow);
closeEl.addEventListener('mouseover', () => closeEl.style.cursor = 'pointer' );
addButtonEl.addEventListener('click', addBookToLibrary);


let myLibrary = [];



function toggleWindow () {

    if (divWindowEl.style.display === 'flex'){

        divWindowEl.style.display = 'none';
        bodyEl.style.backgroundColor = 'rgb(120, 2, 255)';
        libraryEl.style.display = 'flex';    
    }
        
    else{

        divWindowEl.style.display = 'flex';
        bodyEl.style.backgroundColor = 'rgba(0, 0, 0, .8)';
        libraryEl.style.display = 'none';
    }

}

class Book {

    constructor (title, author, pages, read) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = myLibrary.length;

    }
}

function clearPopUp() {

    pagesEl.value = '';
    authorEl.value = '';
    bookNameEl.value = '';

}

function addBookToLibrary() {

    if (/^\d*$/g.test(pagesEl.value) === true 
        && /^[a-z A-z]*$/g.test(authorEl.value) === true 
        && bookNameEl.value !== '')
    {

        let newBook = new Book(bookNameEl.value, authorEl.value, pagesEl.value, readEl.value);
        myLibrary.push(newBook);

        createBook(newBook);
        saveStorage();
        render();
        clearPopUp();

        
    }

    else {

        alert('Check the description below the text area, something is wrong!!!');
        
    }

}

function createBook(item) {


    toggleWindow();

    if (divWindowEl.style.display === 'flex'){

        divWindowEl.style.display = 'none';
        bodyEl.style.backgroundColor = 'rgb(120, 2, 255)';
        libraryEl.style.display = 'flex';    
    }

    let divBook = document.createElement('div');
    let lbookName = document.createElement('p');
    let lbookAuthor = document.createElement('p');
    let lbookPage = document.createElement('p');
    let buttonRead = document.createElement('button');
    let buttonRemove = document.createElement('button');
    
    
    lbookName.textContent = 'Book: ' +  item.title;
    lbookAuthor.textContent ='By ' + item.author;
    lbookPage.textContent = item.pages +' Pages';

    lbookAuthor.classList.add('details');
    lbookName.classList.add('details');
    lbookPage.classList.add('details');

    if (readEl.checked){

        buttonRead.classList.add('greenButton');
        buttonRead.textContent = 'Read';
    }

    else{
        buttonRead.classList.add('redButton');
        buttonRead.textContent = 'Not read';
    }
    
    buttonRead.classList.add('readButtons');

    buttonRemove.textContent = 'Remove'
    buttonRemove.classList.add('buttonRemove');

    divBook.id = myLibrary.indexOf(item);
    

    divBook.appendChild(lbookName);
    divBook.appendChild(lbookAuthor);
    divBook.appendChild(lbookPage);
    divBook.appendChild(buttonRead);
    divBook.appendChild(buttonRemove);

    libraryEl.appendChild(divBook).classList.add('divBook');

    buttonRead.addEventListener('click', () => changeButtonRead(buttonRead));

    buttonRemove.addEventListener('click', () =>  remove(item));

    
}

function changeButtonRead (button){

    if (button.textContent === 'Read' ){
        button.classList.remove('greenButton');
        button.textContent = 'Not Read';
        button.classList.add('redButton');
    }

    else {

        button.classList.remove('redButton');
        button.textContent = 'Read';
        button.classList.add('greenButton');
    }


    saveStorage();
    
}
 
function remove(item) {

    myLibrary.splice(myLibrary.indexOf(item), 1);

    saveStorage();
    render();

}

function render() {

    const library = document.querySelector('#library');
    const books = document.querySelectorAll('.divBook');

    books.forEach(b => library.removeChild(b));

    for (let i = 0; i < myLibrary.length; i++)
        createBook(myLibrary[i]);
}

function getStorage() {

    return JSON.parse(localStorage.getItem('myLibrary'));

}
function storage() {
   if (!localStorage.myLibrary)
        render();

    else{
        myLibrary = getStorage();
        render();
    }
}

function saveStorage() {
   localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}



storage();