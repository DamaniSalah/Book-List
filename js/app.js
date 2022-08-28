let titleOfBook = document.querySelector(".titleBook");
let authorOfBook = document.querySelector(".authorBook");
let isbnBook = document.querySelector(".isbnBook");
let btnAdd = document.querySelector(".btnAdd");
let alert = document.querySelector(".alert");
let btn_Clear = document.querySelector(".btn_clear");
let books = [];

if (localStorage.getItem("bookList")) {
    books = JSON.parse(localStorage.getItem("bookList"))
}



// add data to local storage

function addDataToLocalStorage() {
    let data = {
        "id": Date.now(),
        "title": titleOfBook.value,
        "author": authorOfBook.value,
        "isbn": isbnBook.value,
    }
    books.push(data);
    localStorage.setItem("bookList", JSON.stringify(books));

    alert.style.cssText = "background:#4CAF50;color:white;transition: 0.3s;padding:10px 15px;";
    alert.innerHTML = "Book Added!";
    setTimeout(() => {
        alert.style.display = "none";
    }, 3000);
    let lastNumber = JSON.parse(localStorage.getItem("bookList")).length-1;
    document.querySelector("table").innerHTML += `
    <tr data-id=${+JSON.parse(localStorage.getItem("bookList"))[lastNumber]["id"]}>
    <td>${JSON.parse(localStorage.getItem("bookList"))[lastNumber]["title"]}</td>
    <td>${JSON.parse(localStorage.getItem("bookList"))[lastNumber]["author"]}</td>
    <td>${JSON.parse(localStorage.getItem("bookList"))[lastNumber]["isbn"]}</td>
    <td><span class="del">Delete</span></td>
    </tr>
    `;
    
}

btnAdd.onclick = () => {
    if (titleOfBook.value == "" || authorOfBook.value == "" || isbnBook.value == "") {
        alert.style.cssText = "background:rgb(175 76 76);color:white;transition: 0.3s;padding:10px 15px;";
        alert.innerHTML = "Please, Filed in All";
        setTimeout(() => {
            alert.style.display = "none";
        }, 3000);
    } else {
        addDataToLocalStorage();
       document.querySelectorAll(`input[type="text"]`).forEach((el)=>{
        el.value = "";
       })
    }
}

// Show Data From Local Storage To Page

function showDataFromLocalStorage() {
    if (localStorage.getItem("bookList") != "") {
        for (let i = 0; i < JSON.parse(localStorage.getItem("bookList")).length; i++) {
            const table = `<tr data-id=${JSON.parse(localStorage.getItem("bookList"))[i]["id"]}>
                        <td>${JSON.parse(localStorage.getItem("bookList"))[i]["title"]}</td>
                        <td>${JSON.parse(localStorage.getItem("bookList"))[i]["author"]}</td>
                        <td>${JSON.parse(localStorage.getItem("bookList"))[i]["isbn"]}</td>
                        <td><span class = "del">Delete</span></td>
                        </tr>`;
            document.querySelector("table").innerHTML += table;
        }
    }
}

showDataFromLocalStorage();


// remove data from local storage 

document.querySelectorAll(".del").forEach((el) => {
    el.onclick = _ => {
        books=[];
        JSON.parse(localStorage.getItem("bookList")).filter((va) => {
            el.parentElement.parentElement.dataset.id!=va.id?books.push(va):null;
            localStorage.setItem("bookList",JSON.stringify(books));
            alert.style.cssText = "background:#4CAF50;color:white;transition: 0.3s;padding:10px 15px;";
            alert.innerHTML = "Book Removed!";
             setTimeout(() => {
        alert.style.display = "none";
    }, 3000);
            el.parentElement.parentElement.remove();
        })
    }
})


// Clear All Items

function clearAllItems(){
    localStorage.setItem("bookList","");
    document.querySelector("table").innerHTML = "";
    alert.style.cssText = "background:#4CAF50;color:white;transition: 0.3s;padding:10px 15px;";
    alert.innerHTML = "Clear All Items!";
    setTimeout(() => {
        alert.style.display = "none";
    }, 3000);
}

btn_Clear.onclick = () => clearAllItems();