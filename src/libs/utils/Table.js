import { APIConnector } from "../API/suppliers.js";

export class Table {
  static async buildSupplierTable() {
    const suppliers = await APIConnector.getAll("supplier");
    const table = document.querySelector(".table > tbody");
    const columns = [...document.querySelectorAll(".table > tbody > tr > td")];

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
            const checkbox = this.createCheckbox(suppliers[i].id);
            cell1.appendChild(checkbox);
            cell1.appendChild(document.createTextNode(value));
            break;
          case "email":
            cell2.textContent = value;
            break;
          case "phoneNumber":
            cell3.textContent = this.formatNumber(value).formatted;
            break;
          case "active":
            cell4.appendChild(this.createisActive(value));
            cell4.setAttribute("data-active", value ? "true" : "false");
            break;
        }
      }
    }
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

  static isValidName(name) {
    if (name == null) throw new Error("Por favor, insira um nome válido.");

    const input_name = document.querySelector('input[data-field="name"]');
    const formattedName = String(name).trim();

    if (formattedName.length < 2 || formattedName.length > 255) {
      input_name.style.background = "var(--bs-danger-border-subtle)";
      throw new Error("Por favor, insira um nome válido; o tamanho deve ser entre 2 e 255 dígitos.");
    } else {
      input_name.style.background = "";
    }

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/u;

    if (!nameRegex.test(formattedName)) {
      input_name.style.background = "var(--bs-danger-border-subtle)";
      throw new Error(
        "Caracteres inválidos: apenas letras (incluindo acentos), espaços, apóstrofos e hífens permitidos"
      );
    } else {
      input_name.style.background = "";
    }

    return formattedName;
  }

  static isValidEmail(email) {
    const input_email = document.querySelector('input[data-field="email"]');

    if (email.length > 100) {
      input_email.style.background = "var(--bs-danger-border-subtle)";
      throw new Error("O e-mail deve ter menos de 100 caracteres.");
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      input_email.style.background = "var(--bs-danger-border-subtle)";
      throw new Error("Por favor, insira um e-mail válido.");
    } else {
      input_email.style.background = "";
    }

    return email;
  }

  // static onlyDigits(number) {
  //   const re = /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm;
  //   const digitsOnly = /\D+/g;
  //   const input = number.replace(digitsOnly, "");

  //   return input;
  // }

  static formatNumber(number) {
    const input_phoneNumber = document.querySelector('input[data-field="phone_number"]');
    const sanitizedNumber = number.replace(/\D+/g, "");

    if (sanitizedNumber.length < 8 || sanitizedNumber.length > 11) {
      input_phoneNumber.style.background = "var(--bs-danger-border-subtle)";
      throw new Error("Telefone inválido; o tamanho deve ser entre 8 e 11 dígitos.");
    } else {
      input_phoneNumber.style.background = "";
    }

    const re = /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm;
    const formatted = sanitizedNumber.replace(re, (match, ddd, part1, part2) => {
      const area = ddd ? ddd.replace(/\D/g, "") : "";
      const formattedArea = area ? `(${area}) ` : "";
      return `${formattedArea}${part1}-${part2}`;
    });
    input_phoneNumber.value = formatted;

    return { formatted, digitsOnly: sanitizedNumber };
  }

  static removeRows(rows) {
    rows.forEach((row) => row.closest("tr").remove());
  }

  static handleRowClick() {
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
}
