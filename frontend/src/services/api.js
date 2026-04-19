const BASE_URL = "https://shoppingjewelleries.onrender.com/api";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const createOrder = async (order) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};
