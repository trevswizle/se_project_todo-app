import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Inputs (safer than evt.target.name.value)
const nameInput = addTodoForm.querySelector('input[name="name"]');
const dateInput = addTodoForm.querySelector('input[name="date"]');

const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

// Validator (create once)
const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

function renderTodo(todoData) {
  const todoEl = generateTodo(todoData);
  todosList.append(todoEl);
}

// Render initial todos ONCE
initialTodos.forEach(renderTodo);

addTodoButton.addEventListener("click", () => openModal(addTodoPopup));
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!addTodoForm.checkValidity()) return;

  const todoData = {
    id: uuidv4(),
    name: nameInput.value,
    date: dateInput.value,
    completed: false,
  };

  renderTodo(todoData);

  // Clear fields + reset errors/button state
  addTodoForm.reset();
  addTodoValidator.resetValidation();

  closeModal(addTodoPopup);
});
