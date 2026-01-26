import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"; 
import TodoCounter from "../components/TodoCounter.js";

// Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup").querySelector(".popup__form");

// Initialize TodoCounter (ensure selector matches your HTML)
const todoCounter = new TodoCounter(initialTodos, ".counter__text");


const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();

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

const todosSection = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoEl = generateTodo(todoData);
    todosSection.addItem(todoEl);
  },
  containerSelector: ".todos__list",
});

todosSection.renderItems();


const newTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const todoData = {
    id: uuidv4(),
    name: formData.name,
    date: formData.date,
    completed: false,
  };
  
  const todoEl = generateTodo(todoData);
  todosSection.addItem(todoEl);
  
  todoCounter.updateTotal(true);
  
  newTodoPopup.close();
});

newTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoValidator.resetValidation();
  newTodoPopup.open();
});