"use server";

import { revalidatePath } from "next/cache";
import { createProduct, deleteProduct, updateProduct } from "@/services/products";
import type { ProductFormData } from "@/types/product";

type ActionResult = {
  ok: boolean;
  error?: string;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Nao foi possivel concluir a acao.";
}

function revalidateProductRoutes() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/search");
  revalidatePath("/admin/products");
}

export async function createProductAction(values: ProductFormData): Promise<ActionResult> {
  try {
    await createProduct(values);
    revalidateProductRoutes();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

export async function updateProductAction(id: string, values: Partial<ProductFormData>): Promise<ActionResult> {
  try {
    await updateProduct(id, values);
    revalidateProductRoutes();
    revalidatePath(`/admin/products/${id}/edit`);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  try {
    await deleteProduct(id);
    revalidateProductRoutes();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error) };
  }
}
