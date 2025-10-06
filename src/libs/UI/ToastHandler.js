export class ToastHandler {
  static #toast = bootstrap.Toast.getOrCreateInstance("#liveToast");
  static #toastBody = document.querySelector(".toast-body");

  static showToast(message) {
    this.#toastBody.innerHTML = message;
    this.#toast.show();
    setTimeout(() => this.#toast.hide(), 5000);
  }
}
