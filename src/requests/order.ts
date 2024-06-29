import { Auth } from "@/auth";
import type { IPaymentDetails, IOrderBody } from '../interfaces/interfaces';

class Order {
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;
  private auth: Auth = new Auth();

  async GetOrders() {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const url = new URL(`${this.apiUrl}/buyers/orders`);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Error when searching for the stores");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when searching for the stores:", error);
      throw error;
    }
  }

  async CreateOrder(store_id: number, product_id: number[], amount: number[], pay_now: boolean, paymentDetails?: IPaymentDetails) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    const orderItems = product_id.map((id, index) => ({
      product_id: id,
      amount: amount[index]
    }));

    const body: IOrderBody = {
      order: {
        store_id
      },
      order_items: orderItems,
      pay_now
    };

    function formatDate(isoDate: string): string {
      const [year, month] = isoDate.split('-');
      return `${month}/${year}`;
    }

    if (paymentDetails) {
      paymentDetails.valid = formatDate(paymentDetails.valid);
      body.payment = paymentDetails;
    }

    try {
      const url = new URL(`${this.apiUrl}/buyers/orders`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Error when searching for the stores");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when searching for the stores:", error);
      throw error;
    }
  }
}

export { Order }


