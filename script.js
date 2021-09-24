const listItemContainer = document.querySelector(".items");
const inputValue = document.querySelector(".newItemInput");

const btnSubmit = document.querySelector(".submit");
const btnDelete = document.querySelector(".delete");

const itemFns = e => {
  const li = document.createElement("li");
  const title = document.createElement("div");
  const editInput = document.createElement("input");
  const btns = document.createElement("div");
  const btnEdit = document.createElement("button");
  const btnSave = document.createElement("button");
  const btnDelete = document.createElement("button");

  li.classList.add("flexItem");
  title.classList.add("itemText");
  title.innerText = e;

  editInput.classList.add("editInput");
  editInput.classList.add("hidden");

  btns.classList.add("btnsOpt");

  btnEdit.innerHTML = "Edit";
  btnEdit.classList.add("btnEdit");

  btnSave.innerHTML = "Save";
  btnSave.classList.add("hidden");
  btnSave.classList.add("btnSave");

  btnDelete.innerHTML = "X";
  btnDelete.classList.add("btnDelete");

  li.appendChild(title);
  li.appendChild(btns);
  li.appendChild(editInput);
  btns.appendChild(btnDelete);
  btns.appendChild(btnEdit);
  btns.appendChild(btnSave);

  listItemContainer.appendChild(li);

  const toggle = () => {
    li.classList.toggle("flexReverse");
    title.classList.toggle("hidden");
    editInput.classList.toggle("hidden");
    btnEdit.classList.toggle("hidden");
    btnSave.classList.toggle("hidden");
  };

  // btns listeners

  btnEdit.addEventListener("click", () => {
    toggle();
    editInput.focus();
  });
  btnSave.addEventListener("click", () => {
    title.innerText = editInput.value;
    toggle();
  });
  btnDelete.addEventListener("click", () => {
    listItemContainer.removeChild(li);
  });
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const taskName = inputValue.value;
  itemFns(taskName);
  inputValue.value = "";
});
