export class TableUtils {
  static getCheckedCheckboxes() {
    return Array.from(document.querySelectorAll(".actionCheckbox:checked")).map((checkbox) =>
      Number.parseInt(checkbox.value)
    );
  }
}
