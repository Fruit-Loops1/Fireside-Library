//
//
//
// ===================== Global Variables =====================
Book.library = [];

const bookFormElem = document.getElementById('book-form');

// generate list button
const generateListButton = document.getElementById('load-book-list');

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

console.log(genreArray);
// ===================== Review Score Slider Functionality ===================== 
const bookScoreInput = document.getElementById('reviewInput');
const bookScoreOutput = document.querySelector('.reviewOutput');

if (bookScoreInput !== null || bookScoreOutput !== null) {
  bookScoreOutput.textContent = bookScoreInput.value;
}

if (bookScoreInput !== null || bookScoreOutput !== null) {
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
  console.log(stringifiedBooks, 'all of these books were stored.');
  localStorage.setItem('storedBooks', stringifiedBooks);
} 

const pullBooksFromStorage = function() {
  let stringifiedBooks = localStorage.getItem('storedBooks');
  console.log('Pulling from storage -', stringifiedBooks);
  
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
}

const handleBookDelete = function(event) {
  
}

// ===================== List Creator =====================
  function test(container) {
  let bookBackgroundElem = document.createElement('div');
  console.log(container);
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
  noteElem.textContent = `My Notes: ${this.notes}`;
  pDivElem.appendChild(noteElem);
}




Book.prototype.renderToBookList = test;


// Generate List function 
const generateList = function() {
  for(let a = 0; a < Book.library.length; a++) {
    for(let b = 0; b < genreArray.length; b++) {
      console.log(Book.library[a].genre);
      console.log(genreArray[b].id);
      if (Book.library[a].genre === genreArray[b].id){
        console.log('found correct genre in genreArray', genreArray[b]);
        Book.library[a].renderToBookList(genreArray[b]);
        console.log('Adding book to ', genreArray[a]);
        break;
      }
      else {
        console.log('genre not found')
      }
    }
  }
}
// ===================== Calling Functions =====================
if (bookFormElem !== null) {
  bookFormElem.addEventListener('submit', handleBookSubmit);
}

pullBooksFromStorage();

generateList();
//TODO: create a div in the p tag to be able to keep the text inside of the book. 
//TODO: click book to be able to see the full note
//TODO: delete button
