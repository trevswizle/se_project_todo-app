import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");


const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// ✅ Create validator ONCE (after addTodoForm exists)
const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

function renderTodo (todoData) {
  const todoEl = generateTodo(todoData);
  todosList.append(todoEl);
}

initialTodos.forEach(todo => renderTodo(todo));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!addTodoForm.checkValidity()) {
  return;
  }

  const todoData = {
    id: uuidv4(),
    name: evt.target.name.value,
    date: evt.target.date.value,
    completed: false,
  };

  renderTodo(todoData);


  // ✅ Task 6: reset ONLY after successful submission
  addTodoValidator.resetValidation();

  closeModal(addTodoPopup);
});

// Render initial todos
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
