const BASE_URL = "https://shoppingjewelleries.onrender.com/api";

// Normalize a product from backend shape (_id, name, images, stock) 
// to frontend shape (id, name, images, stock)
const normalizeProduct = (p) => {
  if (!p) return null;
  const normalized = {
    ...p,
    id: p._id || p.id || String(Math.random()),
    _id: p._id || p.id, // Keep both just in case
    name: p.name || p.title || "Untitled Piece",
    description: p.description || "",
    price: Number(p.price) || 0,
    images: p.images || (p.imageURL ? [p.imageURL] : ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"]),
    metal: (p.metal || "gold").toLowerCase(),
    category: p.category || "ring",
    stock: p.stock ?? p.stockQuantity ?? 0,
    createdAt: p.createdAt || Date.now(),
  };
  return normalized;
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.json();
    console.log("Fetched products:", data);
    return Array.isArray(data) ? data.map(normalizeProduct) : [];
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
};

export const createProduct = async (product, token) => {
  const body = {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    metal: product.metal,
    images: product.images, // Now an array
    stock: Number(product.stock),
  };
  console.log("Creating product with body:", body);
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Create failed");
  }
  const data = await res.json();
  return normalizeProduct(data);
};

export const updateProduct = async (id, product, token) => {
  const body = {
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    metal: product.metal,
    images: product.images, // Now an array
    stock: Number(product.stock),
  };
  console.log(`Updating product ${id} with body:`, body);
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Update failed");
  }
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
