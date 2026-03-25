function createCloseButton() {
  const button = document.createElement("span");
  button.className = "close";
  button.appendChild(document.createTextNode("\u00D7"));
  return button;
}

function hideTodoItem(event) {
  const item = event.currentTarget.parentElement;
  item.style.display = "none";
}

function attachCloseHandler(closeButton) {
  closeButton.addEventListener("click", hideTodoItem);
}

function appendCloseButtonToItem(listItem) {
  const closeButton = createCloseButton();
  attachCloseHandler(closeButton);
  listItem.appendChild(closeButton);
}

function addCloseButtonsToExistingItems() {
  const listItems = document.querySelectorAll("#myUL li");
  listItems.forEach(function (item) {
    appendCloseButtonToItem(item);
  });
}

function toggleCheckedState(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
}

function createTodoItem(text) {
  const listItem = document.createElement("li");
  listItem.appendChild(document.createTextNode(text));
  appendCloseButtonToItem(listItem);
  return listItem;
}

function addNewTodoItem() {
  const input = document.getElementById("myInput");
  const list = document.getElementById("myUL");
  const value = input.value.trim();

  if (value === "") {
    alert("You must write something!");
    return;
  }

  const item = createTodoItem(value);
  list.appendChild(item);
  input.value = "";
}

function bindEvents() {
  const list = document.getElementById("myUL");
  const addButton = document.getElementById("addButton");
  const input = document.getElementById("myInput");

  list.addEventListener("click", toggleCheckedState);
  addButton.addEventListener("click", addNewTodoItem);

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addNewTodoItem();
    }
  });
}

function initTodoApp() {
  addCloseButtonsToExistingItems();
  bindEvents();
}

initTodoApp();
