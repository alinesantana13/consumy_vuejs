import { Auth } from "@/auth";

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
}

export { Order }


