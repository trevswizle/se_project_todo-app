import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

// Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Modal helpers
const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

// ✅ Create validator ONCE
const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

// Create a todo element using the Todo class
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

function renderTodo(todoData) {
  const todoEl = generateTodo(todoData);
  todosList.append(todoEl);
}

initialTodos.forEach((todo) => renderTodo(todo));

// Open/close popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Submit handler
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Guard: only proceed if valid
  if (!addTodoForm.checkValidity()) return;

  const todoData = {
    id: uuidv4(),
    name: addTodoForm.elements.name.value,
    date: addTodoForm.elements.date.value,
    completed: false,
  };

  renderTodo(todoData);

  // ✅ Task 6: reset form + validation only after successful submit
  addTodoForm.reset();
  addTodoValidator.resetValidation();

  closeModal(addTodoPopup);
});
