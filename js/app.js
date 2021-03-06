//
//
//
// ===================== Global Variables =====================
Book.library = [];

const bookFormElem = document.getElementById('book-form');

const selectedNote = document.getElementById('selected-note');

const scifiContainer = document.getElementById('Sci-fi')
const romanceContainer = document.getElementById('Romance');
const nonfictionContainer = document.getElementById('Non-fiction');
const fantasyContainer = document.getElementById('Fantasy');
const adventureContainer = document.getElementById('Adventure');
const poetryContainer = document.getElementById('Poetry');
const otherContainer = document.getElementById('Other');

let genreArray = [
  scifiContainer,
  romanceContainer,
  nonfictionContainer,
  fantasyContainer,
  adventureContainer,
  poetryContainer,
  otherContainer,
];

// ===================== Review Score Slider Functionality ===================== 
const bookScoreInput = document.getElementById('reviewInput');
const bookScoreOutput = document.querySelector('.reviewOutput');

if (bookScoreInput !== null || bookScoreOutput !== null) {
  bookScoreOutput.textContent = bookScoreInput.value;

  bookScoreInput.addEventListener('input', function() {
    bookScoreOutput.textContent = bookScoreInput.value;
    });
}

// ===================== Book Constructor =====================
function Book(title, authorName, reviewScore, genre, notes){
  this.title = title;
  this.authorName = authorName;
  this.reviewScore = reviewScore;
  this.genre = genre;
  this.notes = notes;
}

const addBook = function(title, authorName, reviewScore, genre, notes) {
  let book = new Book(title, authorName, reviewScore, genre, notes);

  Book.library.push(book);

  storeBooks();
}

// ===================== Local Storage =====================
const storeBooks = function() {
  let stringifiedBooks = JSON.stringify(Book.library);
  localStorage.setItem('storedBooks', stringifiedBooks);
} 

const pullBooksFromStorage = function() {
  let stringifiedBooks = localStorage.getItem('storedBooks');
  let parsedBooks = JSON.parse(stringifiedBooks);
  if (pullBooksFromStorage) {
    for (let b = 0; b < parsedBooks.length; b++) {
    addBook(parsedBooks[b].title, parsedBooks[b].authorName, parsedBooks[b].reviewScore, parsedBooks[b].genre, parsedBooks[b].notes);
    }
  }
  else {
    console.log('Nothing in Storage');
  }
}

// ===================== Event Listeners =====================
const handleBookSubmit = function(event) {
  event.preventDefault();
  const title = event.target.title.value;
  const authorName = event.target.authorName.value;
  const reviewScore = event.target.reviewScore.value;
  const genre = event.target.genre.value;
  const notes = event.target.notes.value;
  addBook(title, authorName, reviewScore, genre, notes);
  event.target.reset();
  alert(title + ' added to book list, happy reading!');
}
// Listening for viewing a note.
  const handleNoteClick = function(event) {

    selectedNote.parentNode.children[0].textContent = `Featured Note: ${event.target.parentNode.parentNode.children[0].textContent}`;

    selectedNote.textContent = event.target.textContent;
    console.log('item clicked');
}
// Removing books from area
const removeBookClick = function(event) {
  for (let c = 0; c < Book.library.length; c++) {
    if (event.target.parentNode.children[0].textContent === Book.library[c].title) {
      let newArr = Book.library.filter( book => book.title !== event.target.parentNode.children[0].textContent);
      Book.library = newArr;

      storeBooks();
      clearBooks();
      generateList();

      break;
    }
  }
}

// ===================== List Creator =====================
  function test(container) {
  let bookBackgroundElem = document.createElement('div');
  bookBackgroundElem.classList.add('book-background');
  container.appendChild(bookBackgroundElem);

  const headerElem = document.createElement('h1');
  headerElem.textContent =  this.title;
  bookBackgroundElem.appendChild(headerElem);
// Where the info is held
  const infoELem = document.createElement('ul');
  bookBackgroundElem.appendChild(infoELem);
// Author Area
  const authorElem = document.createElement('li');
  authorElem.textContent = `Author: ${this.authorName}`;
  infoELem.appendChild(authorElem);
// Review Area
  const reviewElem = document.createElement('li');
  reviewElem.textContent = `Score: ${this.reviewScore}`;
  infoELem.appendChild(reviewElem);
// Genre Area
  const genreElem = document.createElement('li');
  genreElem.textContent = `Genre: ${this.genre}`;
  infoELem.appendChild(genreElem);

  const pDivElem = document.createElement('div');
  pDivElem.classList.add('notes-container');
  bookBackgroundElem.appendChild(pDivElem);

  const noteElem = document.createElement('p');
  noteElem.textContent = `Notes: ${this.notes}`;
  noteElem.id = (Math.random() * 10).toString();
  pDivElem.appendChild(noteElem);
  noteElem.addEventListener('click', handleNoteClick);

  const deleteElem = document.createElement('h4');
  deleteElem.textContent = 'Delete Book';
  bookBackgroundElem.appendChild(deleteElem);
  deleteElem.setAttribute('id', headerElem.parentNode.id);
  deleteElem.addEventListener('click', removeBookClick);
}

Book.prototype.renderToBookList = test;

// ===================== Generating and clearing list =====================
const generateList = function() {
  for(let a = 0; a < Book.library.length; a++) {
    for(let b = 0; b < genreArray.length; b++) {
      if (Book.library[a].genre === genreArray[b].id){
        Book.library[a].renderToBookList(genreArray[b]);
        break;
      }
    }
  }
}

const clearBooks = function() {
  for (let genre of genreArray) {
    genre.innerHTML = '';
  }
}

// ===================== Calling Functions =====================
if (bookFormElem !== null) {
  bookFormElem.addEventListener('submit', handleBookSubmit);
}

pullBooksFromStorage();

generateList();

