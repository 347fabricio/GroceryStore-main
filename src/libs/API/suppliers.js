import { ToastHandler } from "../UI/ToastHandler.js";

export class APIConnector {
  static #URL = "http://10.0.0.201:8080/api";

  static async #fetchData(path, method, body) {
    try {
      const request = await fetch(`${this.#URL}/${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!request.ok) {
        const errorData = await request.json();
        throw new Error(errorData);
      }

      return request;
    } catch (error) {
      ToastHandler.showToast(error.message);
      return;
    }
  }

  static async getAll(path) {
    try {
      const request = await fetch(`${this.#URL}/${path}`, { method: "GET" });

      if (!request.ok) {
        const errorData = await request.json();
        throw new Error(errorData.message);
      }

      const response = await request.json();

      return response;
    } catch (error) {
      ToastHandler.showToast(error.message);
      throw error;
    }
  }

  // static async getById(path, id) {
  //   const response = await this.#fetchData(this.#URL, path, id, "GET");
  //   return response;
  // }

  static async post(path, body) {
    const response = await this.#fetchData(path, "POST", body);
    return response;
  }

  static async put(path, body) {
    const response = await this.#fetchData(path, "PUT", body);
    return response;
  }
  static async deactivate(path, id) {
    try {
      const request = await fetch(`${this.#URL}/${path}/${id}`, { method: "DELETE" });

      if (!request.ok) {
        const errorData = await request.json();
        throw new Error(errorData.message);
      }

      return request;
    } catch (error) {
      ToastHandler.showToast(error.message);
      throw error;
    }
  }
}
