export class ToastHandler {
  static #toast = bootstrap.Toast.getOrCreateInstance("#liveToast");
  static #toastBody = document.querySelector(".toast-body");
  static #toastTimeout;
  static #isToastVisible = false;

  static hideToast() {
    this.#toast.hide();
    this.#isToastVisible = false;
  }

  static showToast(message) {
    clearTimeout(this.#toastTimeout);

    this.#toastBody.innerHTML = message;
    this.#toast.show();
    this.#isToastVisible = true;

    this.#toastTimeout = setTimeout(() => this.hideToast(), 3000);
  }
}
