export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialTodos = [
  {
    id: "1",
    name: "Buy groceries",
    date: "2026-01-01",
    completed: false,
  },
  {
    id: "2",
    name: "Finish project",
    date: "2026-01-03",
    completed: true,
  },
];
