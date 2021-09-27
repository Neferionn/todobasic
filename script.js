const input = document.querySelector('.newItemInput');
const btnSubmit = document.querySelector('.btnSubmit');
const itemsList = document.querySelector('.itemsList');

const addItem = e => {
  e.preventDefault();

  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item');

  const newItem = document.createElement('li');
  newItem.innerText = input.value;
  newItem.classList.add('newItem');
  itemContainer.appendChild(newItem);

  localSave(input.value);

  const btnMark = document.createElement('button');
  btnMark.innerHTML = '✓';
  btnMark.classList.add('btnMark');
  itemContainer.appendChild(btnMark);

  const btnDel = document.createElement('button');
  btnDel.innerHTML = 'X';
  btnDel.classList.add('btnDel');
  itemContainer.appendChild(btnDel);

  itemsList.appendChild(itemContainer);

  input.value = '';
  btnSubmit.disabled = true;
  btnSubmit.classList.add('disabledBtn');
};

const deleteAndCheck = e => {
  const element = e.target;
  if (element.classList[0] === 'btnDel') {
    const parent = element.parentElement;
    parent.classList.add('disappear');
    removeLocaltodoItems(parent);
    parent.addEventListener('transitionend', () => {
      parent.remove();
    });
  }

  if (element.classList[0] === 'btnMark') {
    const parent = element.parentElement;
    const liChild = parent.firstChild;

    liChild.classList.toggle('completed');
    parent.classList.toggle('greenBottomBorder');
  }
};

const localSave = todo => {
  let todoItems;

  if (localStorage.getItem('todoItems') === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
  }
  todoItems.push(todo);

  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

const getTodo = () => {
  let todoItems;
  if (localStorage.getItem('todoItems') === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
  }
  todoItems.forEach(function (todo) {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item');

    const newItem = document.createElement('li');
    newItem.innerText = todo;
    newItem.classList.add('newItem');

    itemContainer.appendChild(newItem);

    const btnMark = document.createElement('button');
    btnMark.innerHTML = '✓';
    btnMark.classList.add('btnMark');
    itemContainer.appendChild(btnMark);

    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'X';
    btnDel.classList.add('btnDel');
    itemContainer.appendChild(btnDel);

    itemsList.appendChild(itemContainer);
  });
};

const removeLocaltodoItems = todo => {
  let todoItems;
  if (localStorage.getItem('todoItems') === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));
  }
  const todoIndex = todo.children[0].innerText;
  todoItems.splice(todoItems.indexOf(todoIndex), 1);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

function btnToggle() {
  if (input.value !== '') {
    btnSubmit.disabled = false;
    btnSubmit.classList.remove('disabledBtn');
  }
}

input.addEventListener('change', btnToggle);
document.addEventListener('DOMContentLoaded', getTodo);
btnSubmit.addEventListener('click', addItem);
itemsList.addEventListener('click', deleteAndCheck);
