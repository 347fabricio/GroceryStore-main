import { TableUtils } from "./TableUtils.js";

export class SupplierUtils {
  static #modalBody = document.querySelectorAll(".modal-body input");

  static hideSwitchField() {
    const isActive = document.querySelector('div[data-field="isActive"]');
    isActive.classList.remove("d-none");
    isActive.classList.add("d-block");

    document.querySelector(".modal-header > .btn-close").addEventListener("click", () => {
      const isActive = document.querySelector('div[data-field="isActive"]');
      isActive.classList.remove("d-block");
      isActive.classList.add("d-none");
    });
  }

  static getSupplierData(isUpdating = false) {
    const supplierData = {
      name: this.#modalBody[0].value,
      email: this.#modalBody[1].value,
      phoneNumber: this.#modalBody[2].value,
      isActive: this.#modalBody[3].checked,
    };

    if (isUpdating) supplierData.id = TableUtils.getCheckedCheckboxes()[0];

    return supplierData;
  }
}
