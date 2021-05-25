//
//
//
// ===================== Global Variables =====================
Book.library = [];

const bookFormElem = document.getElementById('book-form');

const scifiContainer = document.querySelector('.sci-fi-container');
const romanceContainer = document.querySelector('.romance-container');
const nonfictionContainer = document.querySelector('.non-fiction-container');
const fantasyContainer = document.querySelector('.fantasy-container');
const adventureContainer = document.querySelector('.adventure-container');
const poetryContainer = document.querySelector('.poetry-container');
const otherContainer = document.querySelector('.other-container');

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

bookScoreOutput.textContent = bookScoreInput.value;

bookScoreInput.addEventListener('input', function() {
  bookScoreOutput.textContent = bookScoreInput.value;
});


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

  for(let a = 0; a < genreArray.length; a++){
    if (Book.library[Book.library.length - 1].genre.value === genreArray[1].value){
      Book.library[Book.library.length - 1].renderToBookList(genreArray.indexOf(a));
      console.log('Adding book to ', genreArray[a]);
    }
    else {
      alert('this is bad');
    }
  }
}

// ===================== List Creator =====================
Book.prototype.renderToBookList = function(){
  const bookBackgroundElem = document.createElement('div');
  bookBackgroundElem.classList.add('book-background');
  scifiContainer.appendChild(bookBackgroundElem);

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

  const noteElem = document.createElement('p');
  noteElem.textContent = `My Notes: ${this.notes}`;
  bookBackgroundElem.appendChild(noteElem);
}


// ===================== Calling Functions =====================
bookFormElem.addEventListener('submit', handleBookSubmit);
pullBooksFromStorage();

for (let a = 0; a < Book.library.length; a++) {
  Book.library[a].renderToBookList();
}
