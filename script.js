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



let myLibrary = [];
let code = 0;
//let newBook;

function toggleWindow () {

    if (divWindowEl.style.display === 'flex'){
        divWindowEl.style.display = 'none';
        bodyEl.style.backgroundColor = 'rgb(129, 192, 248)';
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
        && /^[a-z A-z]*$/g.test(authorEl.value) ===true && bookNameEl.value !== ''){

        createBook();
        clearPopUp();

        //renderLibrary();
        //data();
    }

    else {
        alert('Check the description below the text area, something is wrong!!!');
        
    }

}

function createBook() {
    let newBook = new Book(bookNameEl.value, authorEl.value, pagesEl.value, readEl.value);
    myLibrary.push(newBook);

    

    toggleWindow();

    let divBook = document.createElement('div');
    let lbookName = document.createElement('p');
    let lbookAuthor = document.createElement('p');
    let lbookPage = document.createElement('p');
    let buttonRead = document.createElement('button');
    let buttonRemove = document.createElement('button');
    
    
    lbookName.textContent = 'Book: ' + bookNameEl.value;
    lbookAuthor.textContent ='By' + authorEl.value;
    lbookPage.textContent = 'Pages:' + pagesEl.value;

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

    divBook.id = code;
    buttonRemove.id = code;

    divBook.appendChild(lbookName);
    divBook.appendChild(lbookAuthor);
    divBook.appendChild(lbookPage);
    divBook.appendChild(buttonRead);
    divBook.appendChild(buttonRemove);

    libraryEl.appendChild(divBook).classList.add('divBook');

    buttonRead.addEventListener('click', () => changeButtonRead(buttonRead));

    buttonRemove.addEventListener('click', () => {
        remove(buttonRemove.id, code)
        
    });

    code++;

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

    //renderLibrary();
    //data();
}
 function getElementToRemove(divToRemove) {

    let a = divToRemove.firstChild.textContent;

    myLibrary.forEach(e => {
        if(e.title === a.substr(6))
            return(myLibrary.indexOf(e));
    });
 }

function remove(id) {

    let divToRemove = document.getElementById(id);
   
    myLibrary.splice(getElementToRemove(divToRemove), 1);
    divToRemove.remove();


}

function refresh() {
    if (localStorage.myLibrary ){
        let render = JSON.parse(localStorage.getItem('myLibrary'));
        myLibrary = render;
    }

    else
        data();
}

//unction //data() {
//    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
//}

//myLibrary.forEach(book => console.log(book));

newButtonEl.addEventListener('click', toggleWindow);
closeEl.addEventListener('click', toggleWindow);
closeEl.addEventListener('mouseover', () => closeEl.style.cursor = 'pointer' );
addButtonEl.addEventListener('click', addBookToLibrary);

//refresh();