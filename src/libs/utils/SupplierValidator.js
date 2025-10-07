export class SupplierValidator {
  static validateSupplier(supplier) {
    supplier.name = SupplierValidator.isValidName(supplier.name);
    supplier.email = SupplierValidator.isValidEmail(supplier.email);
    supplier.phoneNumber = SupplierValidator.formatNumber(supplier.phoneNumber).digitsOnly;
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
}
