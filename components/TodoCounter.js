class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    // Calculate initial completed count by filtering the array
    this._completed = todos.filter((todo) => todo.completed).length;
    
    // Initial render
    this._updateText();
  }

  // Uses arrow function to preserve 'this' context
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  // Uses arrow function to preserve 'this' context
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;