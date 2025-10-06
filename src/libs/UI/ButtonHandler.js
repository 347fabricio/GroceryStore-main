import { ToastHandler } from "./ToastHandler.js";
import { ModalHandler } from "./ModalHandler.js";
import { APIConnector } from "../API/suppliers.js";
import { Table } from "../utils/Table.js";
import { TableUtils } from "../utils/TableUtils.js";

export class ButtonHandler {
  static #checkBox;
  static #modalTitle = document.querySelector("#modalLabel");
  static #submitBtn = document.querySelector("#submitBtn");

  static add() {
    document.querySelector("#addRow").addEventListener("click", () => {
      ModalHandler.toggleModal();

      this.#submitBtn.addEventListener("click", async () => {
        const supplier = TableUtils.getSupplierData();
        try {
          supplier.name = Table.isValidName(supplier.name);
          supplier.email = Table.isValidEmail(supplier.email);
          supplier.phoneNumber = Table.formatNumber(supplier.phoneNumber).digitsOnly;

          const response = await this.#submit(supplier, "POST");
          if (response.ok) window.location.reload();
        } catch (error) {
          ToastHandler.showToast(error.message);
          return;
        }
      });
    });
  }

  static delete() {
    document.querySelector("#delRow").addEventListener("click", async () => {
      this.#checkBox = document.querySelectorAll(".actionCheckbox:checked");

      if (this.#checkBox.length == 0) ToastHandler.showToast("Selecione o(s) produto(s) a ser removido.");

      let supplier_id = Number.parseInt(this.#checkBox[0].value);
      const responseStatus = await this.#submit(supplier_id, "DELETE");
      // console.log(responseStatus);

      if (responseStatus.ok) window.location.reload();
      // Table.removeRows(this.#checkBox);
    });
  }

  static update() {
    document.querySelector("#updateRow").addEventListener("click", () => {
      this.#checkBox = document.querySelectorAll(".actionCheckbox:checked");
      this.#modalTitle.textContent = "Atualizar Produto";

      switch (this.#checkBox.length) {
        case 0:
          ToastHandler.showToast("Selecione o produto a ser atualizado.");
          return;
        case 1:
          ModalHandler.toggleModal();
          ModalHandler.buildUpdate(this.#checkBox[0]);
          break;
        default:
          ToastHandler.showToast("Você só pode atualizar <strong>um</strong> produto por vez.");
          return;
      }

      this.#submitBtn.addEventListener("click", async () => {
        let supplier = TableUtils.getSupplierData();
        supplier.id = this.#checkBox[0].value;
        const responseStatus = await this.#submit(supplier, "PUT");

        if (responseStatus.ok) window.location.reload();
      });
    });
  }

  static async #submit(body, method) {
    try {
      switch (method) {
        case "DELETE":
          return await APIConnector.delete("supplier", body);
        case "POST":
          return await APIConnector.post("supplier", body);
        case "PUT":
          return await APIConnector.put("supplier", body);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
