export type ProductVariant = {
  name: string;
  value: string;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  colors: string[];
  variants: ProductVariant[];
  features: string[];
  badge?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  variant: string;
  color: string;
};

export type Order = {
  id: string;
  customer: string;
  status: "Pago" | "Pendente" | "Enviado" | "Cancelado";
  total: number;
  date: string;
};
