export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  brand: string;
}

export interface Order {
  id: string;
  date: string;
  items: Array<{ productId: string; name: string; quantity: number; price: number }>;
  total: number;
}