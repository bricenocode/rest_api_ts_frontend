import { safeParse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, ProductSchema } from "../types";
import { Product } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

const apiUrl = import.meta.env.VITE_API_URL;

function getApiUrl(path: string) {
  if (!apiUrl) {
    throw new Error("Falta configurar VITE_API_URL en las variables de entorno.");
  }

  return `${apiUrl}${path}`;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

export async function addProduct(data: ProductData) {
  const result = safeParse(DraftProductSchema, {
    name: data.name,
    price: Number(data.price),
  });

  if (!result.success) {
    throw new Error("Revisa el nombre y el precio del producto.");
  }

  try {
    await axios.post(getApiUrl("/api/products"), result.output);
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudo crear el producto."));
  }
}

export async function getProducts() {
  try {
    const { data } = await axios(getApiUrl("/api/products"));
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudieron cargar los productos."));
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const { data } = await axios(getApiUrl(`/api/products/${id}`));
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudo cargar el producto."));
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  const result = safeParse(ProductSchema, {
    id,
    name: data.name,
    price: data.price,
    availability: toBoolean(data.availability.toString()),
  });

  if (!result.success) {
    throw new Error("Revisa los datos del producto.");
  }

  try {
    await axios.put(getApiUrl(`/api/products/${id}`), result.output);
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudo actualizar el producto."));
  }
}

export async function deleteProduct(id : Product['id']){
  try {
    await axios.delete(getApiUrl(`/api/products/${id}`));
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudo eliminar el producto."));
  }
}

export async function updateProductAvailability( id : Product['id']){
  try {
    await axios.patch(getApiUrl(`/api/products/${id}`));
  } catch (error) {
    throw new Error(getErrorMessage(error, "No se pudo cambiar la disponibilidad."));
  }
}
