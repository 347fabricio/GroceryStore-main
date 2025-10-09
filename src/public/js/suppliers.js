import { APIConnector } from "../../libs/API/suppliers.js";
import { ButtonHandler } from "../../libs/UI/ButtonHandler.js";
import { Table } from "../../libs/utils/Table.js";

(async () => {
  const buttonHandler = new ButtonHandler();
  const table = new Table();

  buttonHandler.add();
  buttonHandler.deactivate();
  buttonHandler.update();

  await table.buildSupplierTable();
  table.handleRowClick();
})();
