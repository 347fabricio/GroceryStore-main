import { ToastHandler } from "../UI/ToastHandler.js";
import { Table } from "./Table.js";

export class TableUtils {
  static #getCheckedCheckboxes() {
    return document.querySelectorAll(".actionCheckbox:checked");
  }

  static formatPhoneNumberField() {
    const input_phoneNumber = document.querySelector('input[data-field="phone_number"]');

    input_phoneNumber.addEventListener("keyup", () => {
      let newValue = Table.onlyDigits(input_phoneNumber.value);

      if (newValue.length >= 8 && newValue.length <= 11) {
        input_phoneNumber.style.background = "";
        const formatedNumber = Table.formatNumber(input_phoneNumber.value);
        document.querySelector('input[data-field="phone_number"]').value = formatedNumber;
      } else if (newValue.length == 0) {
        input_phoneNumber.style.background = "";
      } else {
        input_phoneNumber.style.background = "var(--bs-danger-border-subtle)";
      }
    });
  }

  static getSupplierData() {
    const modalBody = document.querySelectorAll(".modal-body input");

    return {
      name: modalBody[0].value,
      email: modalBody[1].value,
      phoneNumber: modalBody[2].value,
    };
  }
}
