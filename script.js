const input = document.querySelector(".newItemInput");
const btnSubmit = document.querySelector(".btnSubmit");
const itemsList = document.querySelector(".itemsList");

const addItem = (e) => {
  e.preventDefault();

  const date = new Date();
  const itemAddDate = date.toLocaleDateString();
  console.log(itemAddDate);

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item");

  const newItem = document.createElement("div");
  newItem.innerText = input.value;
  newItem.classList.add("newItem");
  itemContainer.appendChild(newItem);

  const btnMark = document.createElement("button");
  btnMark.innerHTML = "✔️";
  btnMark.classList.add("btnMark");
  itemContainer.appendChild(btnMark);
  localSave({ name: input.value, date: itemAddDate });
  const btnDel = document.createElement("button");
  btnDel.innerHTML = "✖️";
  btnDel.classList.add("btnDel");
  itemContainer.appendChild(btnDel);

  itemsList.appendChild(itemContainer);

  //reset input
  btnSubmit.disabled = true;
  btnSubmit.classList.add("disabledBtn");
  input.value = "";
};

const deleteAndCheck = (e) => {
  const element = e.target;

  if (element.classList[0] === "btnDel") {
    const parent = element.parentElement;
    parent.classList.add("disappear");
    removeLocaltodoItems(parent);
    parent.addEventListener("transitionend", () => {
      parent.remove();
    });
  }

  if (element.classList[0] === "btnMark") {
    const parent = element.parentElement;
    const liChild = parent.firstChild;

    liChild.classList.toggle("completed");
    toggleCheckText(element);
    parent.classList.toggle("greenBottomBorder");
  }
};

const toggleCheckText = (el) => {
  if (el.innerHTML === "✔️") {
    el.innerHTML = "✎";
    el.classList.add("btnReMark");
  } else {
    el.innerHTML = "✔️";
    el.classList.remove("btnReMark");
  }
};

const btnEnable = () => {
  if (input.value !== "") {
    btnSubmit.disabled = false;
    btnSubmit.classList.remove("disabledBtn");
  } else {
    btnSubmit.disabled = true;
    btnSubmit.classList.add("disabledBtn");
  }
};

const localSave = (todo) => {
  let todoItems;

  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }

  todoItems.push(todo);
  console.log(todoItems);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

const getTodo = () => {
  let todoItems;
  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }

  todoItems.forEach((todo) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    const newItem = document.createElement("div");
    newItem.innerText = todo.name;
    newItem.classList.add("newItem");

    itemContainer.appendChild(newItem);

    const btnMark = document.createElement("button");
    btnMark.innerHTML = "✔️";
    btnMark.classList.add("btnMark");
    itemContainer.appendChild(btnMark);

    const btnDel = document.createElement("button");
    btnDel.innerHTML = "✖️";
    btnDel.classList.add("btnDel");
    itemContainer.appendChild(btnDel);

    // const itemTextDate = document.createElement("span");
    // itemContainer.appendChild(itemTextDate);
    // itemTextDate.innerHTML = todo.date;
    // itemTextDate.classList.add("itemTextDate");

    itemsList.appendChild(itemContainer);
    // itemContainer.appendChild(itemTextDate);
  });
};

const removeLocaltodoItems = (todo) => {
  let todoItems;

  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }

  const todoIndex = todo.children[0].innerText;
  todoItems.splice(todoItems.indexOf(todoIndex), 1);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

input.addEventListener("change", btnEnable);
document.addEventListener("DOMContentLoaded", getTodo);
btnSubmit.addEventListener("click", addItem);
itemsList.addEventListener("click", deleteAndCheck);
