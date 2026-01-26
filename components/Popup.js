export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscapeClose = (evt) => { 
            if (evt.key == "Escape") { 
                this.close(); 
            };
        }
    }
    open() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscapeClose);
    }
    
    close() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscapeClose);
    }

    setEventListeners() {
    const closeButton = this._popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}