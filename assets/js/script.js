const Books_URL  = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?";
const Revie_URL  = "https://api.nytimes.com/svc/books/v3/reviews.json?";
const API_Key    = "VHnbdoQ6dvoaOWLbqA2HIgEC0Oif5qns";
const search     = document.getElementById("search");
const fav        = document.getElementById("fav");
var favList      = JSON.parse(localStorage.getItem("favlist")) || [];
const favItemsEl = document.getElementById("favItems");
const clear      = document.getElementById("clear-history");


const main   = $("#main");  //main Div to be used to append child elements



async function getBooks(url) {
    const res = await fetch(url)
    const data = await res.json()

    showBooks(data.results)
}



function fetchBooks() {
    console.log("ShowBooks") 
    getBooks(Books_URL + "api-key=" + API_Key);
    return false;
}

function showBooks(books) {

    main.innerHTML = '';
    console.log(books.books);
    console.log(books.books[0].author);

    books.books.forEach((book) => {
        const { rank, title, author, book_image, primary_isbn13, description } = book;
        const bookEl = document.createElement('div')
        bookEl.classList.add('book') 
        bookEl.innerHTML = `
            <img src="${book_image}" alt="${title}" ondblclick="saveFav('${title}')">
            <div class="book-info">
                <p id="title"><strong>Title:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${title}</p>
                <p id="auther"><strong>Author:</strong>&nbsp;${author}</p>
                <p id="isbn"><strong>Isbn:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${primary_isbn13}</p>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                <button class="btnreview" onclick="getReviews('${author}')">See Reviews</button> 
                <p>
                ${description} </p>
            </div> `
        main.append(bookEl);

      })
      showFav();    
}

function showFav() {
    favItemsEl.innerHTML = "";
    for (let i=0; i<favList.length; i++) {
        var liTag = document.createElement("li");
        liTag.textContent = favList[i];
        var olEl = document.getElementById("favItems");
        olEl.appendChild(liTag);    
    }
}


function showFav1() {
    favItemsEl.innerHTML = "";
    for (let i=0; i<favList.length; i++) {

     favItemsEl.append(`<p>` + favList[i] + `</p>`);
    
    }
}


function saveFav(e){
    favList.push(e);
    localStorage.setItem("favlist",JSON.stringify(favList));
    showFav();
}

async function getReviews(author) {
    const res = await fetch(Revie_URL + "author=" + author + "&api-key=" + API_Key);
    const data = await res.json();
    
    showReviews(data.results);
}

function showReviews(review){
console.log(review);
const elm  = document.getElementById("rev");
const elmH = document.getElementById("heading");
    elmH.innerHTML = "";
    elm.innerHTML  = "";

if (review.length > 0) {
 
    console.log(review[0].url);
    var newH = document.createElement('h3'); 
        newH.innerHTML = "Review on " + review[0].book_author + " Publications";
        elmH.appendChild(newH);

    for (i=0; i<review.length; i++) {
        var count = i + 1;
        var newA = document.createElement('a');
        newA.setAttribute('href',review[0].url);
        newA.setAttribute('target',"_blank");
  
        newA.innerHTML = "Review-" + count + "<br>";
        elm.appendChild(newA);

    }
    modal.style.display = "block";
}

else{
    
    var newH = document.createElement('h3'); 
    newH.innerHTML = "No Reviews Found" ;
    elmH.appendChild(newH);
    modal.style.display = "block";

   
    

}


}


function clearHistory() {
    window.localStorage.removeItem("favlist");
    window.location.reload();
  } //end clearHighscores 

  clear.onclick = clearHistory;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




search.onclick = fetchBooks;