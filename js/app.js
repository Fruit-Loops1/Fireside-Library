//
//
//
// ===================== Global Variables =====================
Book.library = [];
const bookFormElem = document.getElementById('book-form');
const bookContainer = document.querySelector('.book-container');

// ===================== Review Score Slider Functionality ===================== 
const bookScoreInput = document.getElementById('reviewInput');
const bookScoreOutput = document.querySelector('.reviewOutput');

bookScoreOutput.textContent = bookScoreInput.value;

bookScoreInput.addEventListener('input', function() {
  bookScoreOutput.textContent = bookScoreInput.value;
});



// ===================== Book Constructor =====================
function Book(title, authorName, reviewScore, genre){
  this.title = title;
  this.authorName = authorName;
  this.reviewScore = reviewScore;
  this.genre = genre;
}

const addBook = function(title, authorName, reviewScore, genre) {
  let book = new Book(title, authorName, reviewScore, genre);

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
    addBook(parsedBooks[b].title, parsedBooks[b].authorName, parsedBooks[b].reviewScore, parsedBooks[b].genre);
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
  addBook(title, authorName, reviewScore, genre);
  console.log('handleBookSubmit');
  Book.library[Book.library.length - 1].renderToBookList();
}

// ===================== List Creator =====================
Book.prototype.renderToBookList = function(){
  const bookBackgroundElem = document.createElement('div');
  bookBackgroundElem.classList.add('book-background');
  bookContainer.appendChild(bookBackgroundElem);

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

// Notes Area
  const notesElem = document.createElement('textarea');
  
  notesElem.appendChild(bookBackgroundElem);
  
}







// ===================== Calling Functions =====================
bookFormElem.addEventListener('submit', handleBookSubmit);
pullBooksFromStorage();

for (let a = 0; a < Book.library.length; a++) {
  Book.library[a].renderToBookList();
}
