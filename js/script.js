console.log("Community Reading Club");

// Important variables
const form = document.querySelector("#libForm");
var books;
if (localStorage.getItem("books")!= null){
    books = JSON.parse(localStorage.getItem("books"));
    console.log(books)
}
else{
    books = [];
    console.log(books)
}

// Library class
class Library{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
    static addUI(){
        let table = document.querySelector('#tbody');
        table.innerHTML = ""
        let html = "";
        if (books.length != 0){
            books.forEach((element, index) => {
                html += ` <tr>
                <td>${element.name}</td>
                <td>${element.author}</td>
                <td>${element.type}</td>
                <td><button onclick="Library.deleteBook(this.id)" type="button" class="btn btn-sm btn-danger" id="${index}">Delete</button></td>
              </tr>`
            });
            console.log(html);
        }
        else{
            html = `<tr><h5 class="mx-2">No books available</h5></tr>`
        }

      table.innerHTML = html;
    }
    static showSuccess(text){
        let msg = document.querySelector("#msg");
        msg.innerHTML = `<div class="alert alert-success alert-dismissible fade show my-2 mx-2" role="alert">
        <strong>Success |</strong> ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      setTimeout(() => {
        msg.innerHTML = "";
      }, 2000);
    }
    static showError(text){
        let msg = document.querySelector("#msg");
        msg.innerHTML = `<div class="alert alert-warning alert-dismissible fade show my-2 mx-2" role="alert">
        <strong>Error | </strong>${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      setTimeout(() => {
        msg.innerHTML = "";
      }, 2000);
    }

    static deleteBook(index){
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        Library.addUI();
        Library.showSuccess("The Book has been removed from the list");
    }
}

// adding event listener
Library.addUI();

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log("Form has been submitted");

    let name = document.querySelector('#bookName');
    let author = document.querySelector('#author');
    let type;
    
    let fic = document.querySelector('#fiction');
    let educa = document.querySelector('#educational');
    let nonFic = document.querySelector('#nonFiction');
    if (fic.checked) {
        type = fic.value;
    }
    if (educa.checked) {
        type = educa.value;
    }
    if (nonFic.checked) {
        type = nonFic.value;
    }

    if (name.value.length>2 & author.value.length >2){
        const book = new Library(name.value, author.value, type);
        console.log(book);
        name.value = "";
        author.value = "";
        Library.showSuccess("The book has been added succesfully");
        books.push(book);
        console.log(books);
        localStorage.setItem("books", JSON.stringify(books))
    }
    else{
        Library.showError("Please enter the correct values!");
    }
    Library.addUI()
});
