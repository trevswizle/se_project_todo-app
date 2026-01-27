import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForms from "../components/PopupWithForms.js"; 
import TodoCounter from "../components/TodoCounter.js";

// Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup").querySelector(".popup__form");

// Initialize TodoCounter (ensure selector matches your HTML)
const todoCounter = new TodoCounter(initialTodos, ".counter__text");


// Form Validation
const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

// Handle Todo logic: Updates counter when checked or deleted
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleCheck: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    handleDelete: (isCompleted) => {
      todoCounter.updateTotal(false);
      if (isCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });
  return todo.getView();
};

// Section logic for rendering todos
const todosSection = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoEl = generateTodo(todoData);
    todosSection.addItem(todoEl);
  },
  containerSelector: ".todos__list",
});

todosSection.renderItems();

// PopupWithForm logic
const newTodoPopup = new PopupWithForms("#add-todo-popup", (formData) => {
  const todoData = {
    id: uuidv4(),
    name: formData.name, // Ensure HTML input has name="name"
    date: formData.date,
    completed: false,
  };
  
  const todoEl = generateTodo(todoData);
  todosSection.addItem(todoEl);
  
  // Update total count when new todo is added
  todoCounter.updateTotal(true);
  
  newTodoPopup.close();
});

newTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoValidator.resetValidation();
  newTodoPopup.open();
});