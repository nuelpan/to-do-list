let listWrapper = document.querySelector("ul")
let newList = document.querySelector("#inputList")
let addList = document.querySelector("#add")
let filterEvent = document.querySelector(".filter")
let clearButton = document.querySelector(".clear")

newList.addEventListener('keyup', function(event){
  if(event.key === "Enter") {
    addList.click();
  }
})
// add to do list
// <li>List dua <button class="delete">x</button></li>
addList.addEventListener("click", function(){
  // get text from add list input
  let textList = newList.value

  if (textList.trim() === "") {
    newList.value = ""
    return
  }
  // prepare li element
  let list = document.createElement("li")  
  // prepare button element
  let deleteButton = document.createElement("button")
  deleteButton.className = "delete"
  deleteButton.appendChild(document.createTextNode("x"))

  // append text from add list input, and append delete button
  list.appendChild(document.createTextNode(textList))
  list.appendChild(deleteButton)
  
  // append newly created li to ul
  listWrapper.appendChild(list);

  // store to local storage
  storeLocalSorage(textList);

  // reset input value to ""
  newList.value = ""
})


// filter list
// because list is dynamically created, event delegation is needed
filterEvent.addEventListener("keyup", function(event){
  let find = event.target.value.toLowerCase();
  document.querySelectorAll("li").forEach(function(list){
    let item = list.firstChild.textContent;
    if(item.toLowerCase().indexOf(find) != -1) {
      list.style.display = "flex"
    } else {
      list.style.display = "none"
    }
  })
})

// delete single list
// because list is dynamically created, event delegation is needed
listWrapper.addEventListener("click", function(event){
  if (event.target.classList.contains("delete")) {
    if(confirm("Are you sure want to delete this list?")) {
      // delete list from DOM
      event.target.parentElement.remove()

      // delete list from Local Storage
      deleteSingleLocalStorage(event.target.parentElement)
    }
  }
})

// delete all list
clearButton.addEventListener("click", function(){
  if(confirm("Are you sure want to delete all lists?")) {
    while(listWrapper.firstChild) {
      listWrapper.removeChild(listWrapper.firstChild);
    } 
    deleteAllLocalStorage();
  }
})





// LOCAL STORAGE FUNCTIONs

// LOAD Local Storage
getLists();
function getLists() {
  if(localStorage.getItem('lists') === null) {
    lists = []
  } else {
    lists = JSON.parse(localStorage.getItem('lists'))
  }

  lists.forEach(function(item){
    // prepare li element
  let list = document.createElement("li")  
  // prepare button element
  let deleteButton = document.createElement("button")
  deleteButton.className = "delete"
  deleteButton.appendChild(document.createTextNode("x"))

  // append text from add list input, and append delete button
  list.appendChild(document.createTextNode(item))
  list.appendChild(deleteButton)
  
  // append newly created li to ul
  listWrapper.appendChild(list);
  })
}

// SAVE to Local Storage
function storeLocalSorage(list) {
  let lists;
  if(localStorage.getItem('lists') === null) {
    lists = []
  } else {
    lists = JSON.parse(localStorage.getItem('lists'))
  }
  
  lists.push(list)
  localStorage.setItem('lists', JSON.stringify(lists))
}

// DELETE single list from Local Storage
function deleteSingleLocalStorage(listItem) {
  let lists;
  if(localStorage.getItem('lists') === null) {
    lists = []
  } else {
    lists = JSON.parse(localStorage.getItem('lists'))
  }

  lists.forEach(function(list, index){
    if(listItem.textContent.substr(0, listItem.textContent.length-1) === list) {
      lists.splice(index, 1)
    }
  })

  localStorage.setItem('lists', JSON.stringify(lists))
}

// DELETE all Local Storage

function deleteAllLocalStorage() {
  localStorage.clear();
}