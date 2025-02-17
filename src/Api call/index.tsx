// get product list

import axios from "axios";
import { Product } from "../Interface";

export const getProductList = async () => {
  try {
    const response = await axios("https://fakestoreapi.com/products");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.log(error);
  }
};

//add prodcut

export const addProduct = async (productData: Product) => {
  try {
    const response = await axios.put(
      `https://fakestoreapi.com/products`,
      productData
    );
    return response.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// update the product

export const updateProduct = async (id: number, productData: Product) => {
  try {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${id}`,
      productData
    );
    return response.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
