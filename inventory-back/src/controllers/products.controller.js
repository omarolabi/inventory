import { PRODUCTS } from "../data/products.js";

export const getProducts = (_, res) => {
  res.json(PRODUCTS);
};
