const BASE_URL = "https://shoppingjewelleries.onrender.com/api";

// Normalize a product from backend shape (_id, imageURL) to frontend shape (id, image)
const normalizeProduct = (p) => ({
  ...p,
  id: p._id || p.id,
  image: p.imageURL || p.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  name: p.title || p.name,
  metal: p.category ? p.category.toLowerCase() : (p.metal || "gold"),
  stock: p.stockQuantity ?? p.stock ?? 1,
});

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

export const createProduct = async (product, token) => {
  const body = {
    title: product.name,
    description: product.description,
    price: product.price,
    category: product.metal || product.category,
    imageURL: product.image,
    stockQuantity: product.stock,
  };
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return normalizeProduct(data);
};

export const updateProduct = async (id, product, token) => {
  const body = {
    title: product.name,
    description: product.description,
    price: product.price,
    category: product.metal || product.category,
    imageURL: product.image,
    stockQuantity: product.stock,
  };
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return normalizeProduct(data);
};

export const deleteProduct = async (id, token) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createOrder = async (order, token) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteOrder = async (id, token) => {
  await fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteUser = async (id, token) => {
  await fetch(`${BASE_URL}/auth/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
