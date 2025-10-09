import { APIConnector } from "../API/suppliers.js";
import { Table } from "../utils/Table.js";

export class SupplierStorage {
  #actualPage;
  #totalPages;
  #pageSize;

  constructor() {
    this.#actualPage = 0;
    this.#totalPages = 0;
    this.#pageSize = 10;
  }

  async init() {
    const suppliers = await SupplierStorage.getLocalStorage();
    this.#totalPages = Math.floor(suppliers.length / 10);
  }

  static setLocalStorage(data) {
    localStorage.setItem("suppliers", JSON.stringify(data));
  }

  static async getLocalStorage() {
    return JSON.parse(localStorage.getItem("suppliers")) || (await SupplierStorage.setSupplier());
  }

  static async setSupplier() {
    const suppliers = await APIConnector.getAll("supplier");
    SupplierStorage.setLocalStorage(suppliers);

    return suppliers;
  }

  async getSuppliersByPage() {
    const suppliers = await SupplierStorage.getLocalStorage();

    const fromIndex = this.#actualPage * this.#pageSize;

    if (fromIndex >= suppliers.length) return [];

    const toIndex = Math.min(fromIndex + this.#pageSize, suppliers.length);

    return suppliers.slice(fromIndex, toIndex);
  }

  buildPages() {
    if (this.#totalPages) {
      const pagination = document.querySelector(".pagination");

      const temp = [...pagination.children].slice(0, -1);

      for (let i = 0; i < this.#totalPages; i++) {
        const newPage = document.querySelector(".pageNumber").cloneNode(true);
        temp.push(newPage);
        newPage.firstChild.textContent = 2;
      }

      const nextPage = [...pagination.children].pop();
      temp.push(nextPage);

      [...pagination.children].forEach((child) => child.remove());
      pagination.append(...temp);
    }
  }

  previousPage() {
    document.querySelector("#previousPage").addEventListener("click", async () => {
      if (this.#actualPage > 0) {
        this.#actualPage--;
        Table.renderSupplierRows(await this.getSuppliersByPage(this.#actualPage));
      }
    });
  }

  goToPage() {
    document.querySelectorAll(".pageNumber").forEach((button) =>
      button.addEventListener("click", async (event) => {
        this.#actualPage = event.target.textContent - 1;
        Table.renderSupplierRows(await this.getSuppliersByPage(this.#actualPage));
      })
    );
  }

  nextPage() {
    document.querySelector("#nextPage").addEventListener("click", async () => {
      if (this.#actualPage < this.#totalPages) {
        this.#actualPage++;
        Table.renderSupplierRows(await this.getSuppliersByPage(this.#actualPage));
      }
    });
  }
}
