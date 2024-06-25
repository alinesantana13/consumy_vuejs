export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IStore {
  id: number;
  name: string;
  image_url: string;
}

export interface IProduct {
  id: number;
  store_id: number;
  title: string;
  price: number;
  image_url: string;
}

export interface IOrder {
  id: number;
  buyer_id: number;
  store_id: number;
  state: string;
  created_at: string;
  total_order_items: string;
  order_items: {
    product_title: string;
    amount: number;
    price: number;
  }[];
}

export interface IOrderItems {
  id: number;
  product_id: number;
  amount: number;
  price: number;
}