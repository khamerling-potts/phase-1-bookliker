//fetch books, parse json, then use foreach on the data
//the foreach callback should get the title from each book
//create li element
//set li inner text to book title
//append li

//add click event listener to each li
//callback function should take book as parameter
//create html elements and set their inner text (or src) to their respective book properties

//create button element and add to panel
//creat event listener for the button
//callback function should send patch request using the book's id with new users object

const list = document.querySelector("#list");
const panel = document.querySelector("#show-panel");
const myUser = { id: 11, username: "kyrahp" };
fetchBooks();

function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((books) => books.forEach(listBooks));
}
function listBooks(book) {
  const li = document.createElement("li");
  li.innerText = book.title;
  list.append(li);
  li.addEventListener("click", () => displayBook(book));
}

function displayBook(book) {
  panel.innerHTML = "";
  const img = document.createElement("img");
  img.src = book.img_url;
  const title = document.createElement("p");
  title.innerText = book.title;
  const subtitle = document.createElement("p");
  subtitle.innerText = book.subtitle;
  const author = document.createElement("p");
  author.innerText = book.author;
  const description = document.createElement("p");
  description.innerText = book.description;
  const userlist = document.createElement("ul");
  book.users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userlist.append(li);
  });
  const like = document.createElement("button");
  like.innerText = "Like";
  panel.append(img, title, subtitle, author, description, userlist, like);
  const exists = book.users.find((user) => user.id === myUser.id);
  like.addEventListener("click", () => {
    if (exists) {
      const myIndex = book.users.indexOf(exists);
      console.log(myIndex);
      unlikeBook(book, userlist, myIndex);
    } else {
      likeBook(book, userlist);
    }
  });
}

function likeBook(book, userlist, myIndex) {
  const newUsers = book.users.slice();
  newUsers.push(myUser);
  const configObj = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      users: newUsers,
    }),
  };

  fetch(`http://localhost:3000/books/${book.id}`, configObj)
    .then((res) => res.json())
    .then((data) => console.log(data));
  const li = document.createElement("li");
  li.innerText = myUser.username;
  userlist.append(li);
}

function unlikeBook(book, userlist, myIndex) {}

fetch(`http://localhost:3000/books/1`, {
  method: "PATCH",
  body: {
    users: [
      { id: 2, username: "auer" },
      { id: 8, username: "maverick" },
    ],
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));
