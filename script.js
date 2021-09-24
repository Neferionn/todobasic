const listItemContainer = document.querySelector('.items');
const inputValue = document.querySelector('.newItemInput');

const btnSubmit = document.querySelector('.submit');

const itemListArr = [];

// const displayItems = function () {
//   const item = itemListArr.map(item => {
//     return `<li class="flexItem">
//     <div class="itemText">${item.name}</div>
//     <div class="btnsOpt"><button>Edit</button><button>X</button></div>
//     </li>`;
//   });
//   listItemContainer.insertAdjacentHTML('afterbegin', item);
// };

const addItem = function (newItem) {
  const newTaskItem = `<li class="flexItem">
  <div class="itemText">${newItem}</div>
  <div class="btnsOpt"><button>Edit</button><button class="delete">X</button></div>
  </li>`;
  console.log(newItem);
  listItemContainer.insertAdjacentHTML('afterbegin', newTaskItem);
};

btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const taskName = inputValue.value;
  addItem(taskName);
  inputValue.value = '';
});

// btnDelete.addEventListener('click', function (e) {
//   e.preventDefault();
//   console.log(e);
// });
