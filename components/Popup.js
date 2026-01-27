export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);

    this._handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    this._popupElement.addEventListener("mousedown", (evt) => {
      // closes when clicking the overlay (outside the content)
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}