import { APIConnector } from "../API/suppliers.js";
import { SupplierValidator } from "./SupplierValidator.js";
import { TableUtils } from "./TableUtils.js";

export class Table {
  async buildSupplierTable() {
    const suppliers = await APIConnector.getAll("supplier");
    const table = document.querySelector(".table > tbody");
    // const columns = [...document.querySelectorAll(".table > tbody > tr > td")];

    for (let i = 0; i < suppliers.length; i++) {
      const entries = Object.entries(suppliers[i]);
      const row = table.insertRow();
      const cell1 = row.insertCell();
      const cell2 = row.insertCell();
      const cell3 = row.insertCell();
      const cell4 = row.insertCell();
      for (const [key, value] of entries) {
        switch (key) {
          case "name":
            const checkbox = Table.createCheckbox(suppliers[i].id);
            cell1.appendChild(checkbox);
            cell1.appendChild(document.createTextNode(value));
            break;
          case "email":
            cell2.textContent = value;
            break;
          case "phoneNumber":
            cell3.textContent = SupplierValidator.formatNumber(value).formatted;
            break;
          case "isActive":
            cell4.appendChild(Table.createisActive(value));
            cell4.setAttribute("data-active", value ? "true" : "false");
            break;
        }
      }
    }
  }

  handleRowClick() {
    const rows = document.querySelectorAll("table tbody tr");

    rows.forEach((row) => {
      row.addEventListener("click", (event) => {
        if (event.target.classList.contains("actionCheckbox")) return;

        const closestRow = event.target.closest("tr");
        const checkbox = closestRow.querySelector(".actionCheckbox");
        checkbox.checked = !checkbox.checked;
      });
    });
  }

  static createisActive(bool) {
    const template = document.querySelector("#isActive").cloneNode(true);
    const node = template.content.firstElementChild.cloneNode(true);

    if (bool) {
      node.style.color = "#28a745";
      return node;
    } else {
      node.style.color = "#dc3545";
      return node;
    }
  }

  static createCheckbox(supplier_id) {
    let input = document.createElement("input");
    input.classList.add(...["actionCheckbox", "form-check-input", "me-1"]);
    input.type = "checkbox";
    input.value = supplier_id;

    return input;
  }

  static removeRows(rows) {
    rows.forEach((row) => row.closest("tr").remove());
  }
}
