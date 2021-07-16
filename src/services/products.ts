import { Product } from "@/types";

export const productService = {
  async get(): Promise<Product[]> {
    const books = await fetch("/books.mock.json", {
      headers: {
        Accept: "application/json",
      },
    }).then((response) => response.json());
    return books;
  },
};
