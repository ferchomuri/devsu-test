import { get, post, put, remove } from "../conexion/Conexion";

export const getProducts = async () => {
  try {
    const responseData = await get("bp/products");
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data) => {
  try {
    const responseData = await post("bp/products", data);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const responseData = await put("bp/products", data);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const responseData = await remove(`bp/products?id=${id}`, id);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const verificationId = async (id) => {
  try {
    const responseData = await get(`bp/products/verification?id=${id}`);
    return responseData;
  } catch (error) {
    throw error;
  }
};
