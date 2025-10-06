import { ButtonHandler } from "../../libs/UI/ButtonHandler.js";
import { Table } from "../../libs/utils/Table.js";

(async () => {
  ButtonHandler.add();
  ButtonHandler.delete();
  ButtonHandler.update();

  await Table.buildSupplierTable();
  Table.handleRowClick();
})();
