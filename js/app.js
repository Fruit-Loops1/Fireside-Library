//
//
//
// ===================== Global Variables =====================
Book.library = [];
const bookFormElem = document.getElementById('book-form');
 

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
    new Book(parsedBooks[b].title, parsedBooks[b].authorName, parsedBooks[b].reviewScore, parsedBooks[b].genre);
    }
  }
  else {
    console.log('test');
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

  // We need to have a render function here. Every time submit is pressed, local storage resets at the moment.
}

bookFormElem.addEventListener('submit', handleBookSubmit);

pullBooksFromStorage();


