/*

get list of top 15 book and create dynamic tiles or cards with book name , image ,author

when a user clicks the reviews button it should fetch review for that particular book by making another api call.

user will also be provided with "my  read list" button ,on click on the button the book will be added to it's list(new div element may be).
*/


/* store the response from 1st api call in an array 
   booklist[]

  if user click book[1] then  take that as query string and search review api and display on the page
  

  
  */




var top15El = document.querySelector(".top15");
var tileContainer = document.querySelector(".suggestion-list-box1");

var responseTop15 =
    fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=VHnbdoQ6dvoaOWLbqA2HIgEC0Oif5qns").then(function(response) {
        response.json().then(function(data) {
            var bookArray = data.results.books;
            //  console.log(bookArray);

            for (var i = 0; i < bookArray.length; i++) {
                //console.log(bookArray[i]);
                console.log(bookArray[i].book_image);
                console.log(bookArray[i].author);
                console.log(bookArray[i].title);

                // first display books as tiles on page
                var tile = document.createElement("div");
                var img = document.createElement("img");
                var title = document.createElement("h1");
                var author = document.createElement("h2");
                // give a class to the tile ,so that we can capture the click event and get the title to pass it to review api
                tile.classList.add("tile-book");
                img.setAttribute("src", bookArray[i].book_image);
                title.textContent = bookArray[i].title;
                author.textContent = bookArray[i].author;
                tile.appendChild(img);
                tile.appendChild(title);
                tile.appendChild(author);
                tileContainer.appendChild(tile);

                // give the title from the tile

            }



            // On click get the title and make 2nd api call to get summary
            //display the summary



        });

    });




// var formSubmitHandler = function(event) {
//     event.preventDefault();
//     console.log(event);
// };

// top15El.addEventListener("submit", formSubmitHandler);