import { ToastHandler } from "./ToastHandler.js";
import { ModalHandler } from "./ModalHandler.js";
import { APIConnector } from "../API/suppliers.js";
import { TableUtils } from "../utils/TableUtils.js";
import { SupplierValidator } from "../utils/SupplierValidator.js";
import { SupplierUtils } from "../utils/SupplierUtils.js";

export class ButtonHandler {
  async #submit(body, method) {
    switch (method) {
      case "DELETE":
        return await APIConnector.deactivate("supplier", body);
      case "POST":
        return await APIConnector.post("supplier", body);
      case "PUT":
        return await APIConnector.put("supplier", body);
    }
  }

  add() {
    document.querySelector("#addRow").addEventListener("click", () => {
      ModalHandler.toggleModal();

      document.querySelector("#submitBtn").addEventListener("click", async () => {
        try {
          const supplier = SupplierUtils.getSupplierData();
          SupplierValidator.validateSupplier(supplier);

          const response = await this.#submit(supplier, "POST");
          if (response.ok) window.location.reload();
        } catch (error) {
          ToastHandler.showToast(error.message);
          return;
        }
      });
    });
  }

  deactivate() {
    document.querySelector("#delRow").addEventListener("click", async () => {
      const checkboxes = TableUtils.getCheckedCheckboxes();

      try {
        if (checkboxes.length === 0) throw new Error("Selecione o(s) produto(s) a ser removido.");

        for (const supplier_id of checkboxes) {
          const responseStatus = await this.#submit(supplier_id, "DELETE");
        }

        window.location.reload();
      } catch (error) {
        !error.ok ? setTimeout(() => window.location.reload(), 2000) : ToastHandler.showToast(error.message);
      }
    });
  }

  update() {
    document.querySelector("#updateRow").addEventListener("click", () => {
      const checkbox = document.querySelectorAll(".actionCheckbox:checked");
      document.querySelector("#modalLabel").textContent = "Atualizar Produto";

      switch (checkbox.length) {
        case 0:
          ToastHandler.showToast("Selecione o produto a ser atualizado.");
          return;
        case 1:
          ModalHandler.toggleModal();
          ModalHandler.buildUpdate(checkbox[0]);
          SupplierUtils.hideSwitchField();
          break;
        default:
          ToastHandler.showToast("Você só pode atualizar <strong>um</strong> produto por vez.");
          return;
      }
    });
    document.querySelector("#submitBtn").addEventListener("click", async () => {
      let supplier = SupplierUtils.getSupplierData(true);
      try {
        SupplierValidator.validateSupplier(supplier);

        const response = await this.#submit(supplier, "PUT");
        if (response.ok) window.location.reload();
      } catch (error) {
        ToastHandler.showToast(error.message);
        return;
      }
    });
  }
}
