export default class Todo {
  constructor(data, selector, { handleCheck, handleDelete } = {}) {
    this._data = data;
    this._selector = selector;

    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const template = document.querySelector(this._selector);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      if (typeof this._handleDelete === "function") {
        this._handleDelete(this._data.id, this._data.completed);
      }

      this._todoElement.remove();
      this._todoElement = null;
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      if (typeof this._handleCheck === "function") {
        this._handleCheck(this._data.id, this._data.completed);
      }
    });
  }

  getView() {
    this._todoElement = this._getTemplate();

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabelEl = this._todoElement.querySelector(".todo__label");
    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = Boolean(this._data.completed);

    if (this._data.date) {
      const parsedDate = new Date(this._data.date);
      this._todoDateEl.textContent = isNaN(parsedDate)
        ? ""
        : `Due: ${parsedDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`;
    } else {
      this._todoDateEl.textContent = "";
    }
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabelEl.setAttribute("for", `todo-${this._data.id}`);

    this._setEventListeners();
    return this._todoElement;
  }
}