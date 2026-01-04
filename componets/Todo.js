class Todo {
    constructor(data, selector) {
        this._data = data;
        this._templateEl = document.querySelector(selector);
    }


    getView() {
        // const todoTemplate = document.querySelector("#todo-template");
        this._todoElement = this._templateEl.content
        .querySelector(".todo")
        .cloneNode(true);

        this._todoNameEl = todoElement.querySelector(".todo__name");
        this._todoCheckboxEl = todoElement.querySelector(".todo__completed");
        this._todoLabel = todoElement.querySelector(".todo__label");
        this._todoDate = todoElement.querySelector(".todo__date");
        this._todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

        this._todoNameEl.textContent = this._data.name;
        // TODO - assign completed status

        // Apply id and for attributes.
        // The id will initially be undefined for new todos.
        todoCheckboxEl.id = `todo-${data.id}`;
        todoLabel.setAttribute("for", `todo-${data.id}`);

        return this._todoElement;
    }
}

export default Todo;