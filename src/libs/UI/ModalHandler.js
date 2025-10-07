import { TableUtils } from "../utils/TableUtils.js";

export class ModalHandler {
  static #modalBody = document.querySelectorAll(".modal-body div input");

  // static buildAdd() {
  //   this.reset();
  //   this.#modalTitle.textContent = "Adicionar Produto";
  // }

  static #reset() {
    this.#modalBody.forEach((input) => (input.value = ""));
  }

  static buildUpdate(product) {
    this.#reset();

    const cells = product.closest("tr").cells;

    const supplier = cells[0].textContent.trim();
    const email = cells[1].textContent.trim();
    const phoneNumber = cells[2].textContent.trim();
    const isActive = cells[3].dataset.active === "true" ? true : false;

    this.#modalBody[0].value = supplier;
    this.#modalBody[1].value = email;
    this.#modalBody[2].value = phoneNumber;
    this.#modalBody[3].checked = isActive;
  }

  static toggleModal() {
    this.#reset();
    const modal = bootstrap.Modal.getOrCreateInstance("#modal");
    modal.show();
  }
}
