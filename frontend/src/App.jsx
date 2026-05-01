import { Logo, Badge, Spinner } from "./components/components";
import { SEED_PRODUCTS, SEED_USERS } from "./components/seedData";
import HomePage from "./pages/Homepage";
import { LoginPage, RegisterPage } from "./pages/Authpage";
import CartPage from "./pages/Cartproducts";
import CheckoutPage from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";

import AdminPage from "./Admin/adminDashboard";
import AdminOrdersPage from "./Admin/adminOrders";
import AdminProductsPage from "./Admin/adminProducts";
import { getProducts, getOrders, getUsers } from "./services/api";

import { useState, useEffect, useRef } from "react";

// ── Inline styles ──────────────────────────────────────────────────────────────
export const G = {
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDark: "#8B6914",
  cream: "#FDF8F0",
  dark: "#1A1208",
  darkCard: "#231A0A",
  textMuted: "#9A8060",
  border: "rgba(201,168,76,0.2)",
  borderHover: "rgba(201,168,76,0.6)",
  error: "#E05555",
  success: "#5BAD72",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${G.dark};color:${G.cream};font-family:'Jost',sans-serif;min-height:100vh}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${G.dark}}::-webkit-scrollbar-thumb{background:${G.goldDark}}
  input,textarea,select{outline:none;border:none;background:transparent;font-family:'Jost',sans-serif;color:${G.cream}}
  button{cursor:pointer;font-family:'Jost',sans-serif;border:none;outline:none}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .fadeUp{animation:fadeUp .5s ease forwards}
  .gold-btn{background:linear-gradient(135deg,${G.goldDark},${G.gold});color:${G.dark};font-weight:500;letter-spacing:.08em;text-transform:uppercase;font-size:.78rem;padding:.7rem 1.8rem;border-radius:2px;transition:all .25s;box-shadow:0 2px 12px rgba(201,168,76,.25)}
  .gold-btn:hover{box-shadow:0 4px 20px rgba(201,168,76,.45);transform:translateY(-1px)}
  .gold-btn.trace-btn { background: ${G.dark}; }
  .ghost-btn{background:transparent;color:${G.gold};border:1px solid ${G.border};font-weight:400;letter-spacing:.08em;text-transform:uppercase;font-size:.75rem;padding:.65rem 1.6rem;border-radius:2px;transition:all .25s}
  .ghost-btn:hover{border-color:${G.gold};color:${G.goldLight}}
  .input-field{width:100%;background:rgba(255,255,255,.04);border:1px solid ${G.border};border-radius:2px;padding:.75rem 1rem;color:${G.cream};font-size:.9rem;transition:border .2s}
  .input-field:focus{border-color:${G.gold}}
  .card{background:${G.darkCard};border:1px solid ${G.border};border-radius:4px;transition:all .3s}
  .card:hover{border-color:${G.borderHover};box-shadow:0 8px 32px rgba(0,0,0,.5)}
  .tag{display:inline-block;padding:.2rem .6rem;border-radius:2px;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;font-weight:500}
  .divider{width:100%;height:1px;background:${G.border};margin:1.5rem 0}
  label{font-size:.78rem;color:${G.textMuted};letter-spacing:.06em;text-transform:uppercase;margin-bottom:.4rem;display:block}

  .nav-container { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1200px; margin: 0 auto; }
  .nav-links { display: flex; align-items: center; gap: 1.5rem; }
  .menu-toggle { display: none; background: none; border: none; color: ${G.gold}; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; line-height: 1; }
  
  @media (max-width: 768px) {
    .menu-toggle { display: block; }
    .nav-links { 
      display: none; 
      position: absolute; 
      top: 100%; 
      left: 0; 
      right: 0; 
      background: rgba(26, 18, 8, 0.98); 
      flex-direction: column; 
      padding: 1.5rem; 
      gap: 1.2rem; 
      border-bottom: 1px solid ${G.border};
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .nav-links.open { display: flex; }
    .nav-links > * { width: 100%; text-align: center; display: flex; justify-content: center; align-items: center; }
    .nav-links .ghost-btn, .nav-links .gold-btn { padding: .8rem; }
  }

  .modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; z-index: 1000;
    padding: 1.5rem; animation: fadeIn 0.3s ease;
  }
  .modal-content {
    background: ${G.darkCard}; border: 1px solid ${G.border}; border-radius: 8px;
    width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto;
    position: relative; animation: slideUp 0.4s ease; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2.5rem;
  }
  @media (max-width: 768px) {
    .modal-content { grid-template-columns: 1fr; padding: 1.5rem; gap: 1.5rem; }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .image-gallery { display: flex; flex-direction: column; gap: 1rem; }
  .main-image { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 4px; border: 1px solid ${G.border}; }
  .thumbnail-list { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
  .thumbnail { width: 60px; height: 60px; object-fit: cover; border-radius: 2px; cursor: pointer; border: 1px solid transparent; transition: 0.2s; }
  .thumbnail.active { border-color: ${G.gold}; opacity: 1; }
  .thumbnail:hover { opacity: 0.8; }

  @keyframes borderTrace {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .trace-btn {
    position: relative;
    background: ${G.dark};
    color: ${G.gold} !important;
    border: 1px solid ${G.border};
    overflow: hidden;
    transition: all 0.3s;
    z-index: 1;
  }
  .trace-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, ${G.gold}, transparent);
    background-size: 200% 100%;
    animation: borderTrace 3s linear infinite;
    opacity: 0.3;
    pointer-events: none;
    z-index: -1;
  }
  .trace-btn:hover {
    box-shadow: 0 0 20px rgba(201,168,76,0.3);
    border-color: ${G.gold};
  }

  .preloader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: ${G.dark}; display: flex; flex-direction: column;
    align-items: center; justify-content: center; z-index: 10000;
  }
  .preloader-logo {
    transform: scale(1.5);
    animation: pulse 2s ease-in-out infinite;
    margin-bottom: 2rem;
  }
  @keyframes pulse {
    0% { transform: scale(1.5); opacity: 0.5; }
    50% { transform: scale(1.6); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0.5; }
  }
`;


// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  // Persisted state
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("home"); // home | login | register | cart | checkout | admin | admin-orders | admin-products
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [filterMetal, setFilterMetal] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Fetch products error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch Admin Data (Users & Orders)
  useEffect(() => {
    if (currentUser?.role === "admin") {
      const token = localStorage.getItem("userToken");
      const fetchAdminData = async () => {
        try {
          const [u, o] = await Promise.all([getUsers(token), getOrders(token)]);
          setUsers(Array.isArray(u) ? u : []);
          setOrders(Array.isArray(o) ? o : []);
        } catch (err) {
          console.error("Fetch admin data error:", err);
        }
      };
      fetchAdminData();
    }
  }, [currentUser]);

  // Close menu on page change
  useEffect(() => {
    setMenuOpen(false);
  }, [page]);

  // Persist (Only for non-database items if any, currently none needed for users/orders/products)

  const showToast = (msg,type="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),2500);
  };

  const addToCart = (product) => {
    if(!currentUser) { setPage("login"); showToast("Please login to add items","error"); return; }
    setCart(c => {
      const ex = c.find(i=>i.id===product.id);
      if(ex) return c.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i);
      return [...c,{...product,qty:1}];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(c=>c.filter(i=>i.id!==id));
  const updateQty = (id,delta) => setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i).filter(i=>i.qty>0));
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  const logout = () => { setCurrentUser(null); setCart([]); setPage("home"); };

  // Sort & filter products
  const sortedProducts = [...products].sort((a,b)=>b.createdAt-a.createdAt);
  const recentProducts = sortedProducts.slice(0,4);
  const filteredProducts = sortedProducts.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.metal.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchMetal = filterMetal==="all" || p.metal===filterMetal;
    const matchPrice = filterPrice==="all" ||
      (filterPrice==="low" && p.price<5000) ||
      (filterPrice==="mid" && p.price>=5000 && p.price<30000) ||
      (filterPrice==="high" && p.price>=30000);
    return matchSearch && matchMetal && matchPrice;
  });

  const isAdmin = currentUser?.role==="admin";
  const recentIds = new Set(recentProducts.map(p=>p.id));

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Jost',sans-serif"}}>
      <style>{css}</style>

      {/* Preloader */}
      {showPreloader && (
        <div className="preloader">
          <div className="preloader-logo">
            <Logo />
          </div>
          <div style={{width:150, height:1, background:G.border, position:"relative", overflow:"hidden"}}>
            <div style={{position:"absolute", top:0, left:0, height:"100%", width:"50%", background:G.gold, animation:"borderTrace 2s linear infinite"}}/>
          </div>
          <p style={{marginTop:"1.5rem", fontSize:".7rem", color:G.textMuted, letterSpacing:".3em", textTransform:"uppercase"}}>Excellence in every detail</p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:toast.type==="error"?"#3a0a0a":"#0a2010",border:`1px solid ${toast.type==="error"?G.error:G.success}`,color:toast.type==="error"?G.error:G.success,padding:".75rem 1.2rem",borderRadius:4,fontSize:".85rem",maxWidth:280,animation:"fadeUp .3s ease"}}>
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(26,18,8,.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${G.border}`,padding:"1rem 1.5rem"}}>
        <div className="nav-container">
          <button onClick={()=>{setPage("home"); setMenuOpen(false)}} style={{background:"none",border:"none",cursor:"pointer"}}><Logo/></button>
          
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} style={{marginRight: "auto", marginLeft: "2rem"}}>
            <button className="ghost-btn" onClick={()=>{setPage("home"); setMenuOpen(false)}} style={{border: "none", padding: ".5rem", fontSize: ".9rem"}}>Home</button>
            <button className="ghost-btn" onClick={()=>{setPage("about"); setMenuOpen(false)}} style={{border: "none", padding: ".5rem", fontSize: ".9rem"}}>About Us</button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {!currentUser ? (
              <>
                <button className="ghost-btn" onClick={()=>setPage("login")}>Login</button>
                <button className="gold-btn" onClick={()=>setPage("register")}>Register</button>
              </>
            ) : (
              <>
                <span style={{fontSize:".82rem",color:G.textMuted}}>Hi, {(currentUser.name || currentUser.email || "User").split(" ")[0]}</span>
                {isAdmin && <button className="ghost-btn" onClick={()=>setPage("admin")}>Admin Panel</button>}
                <button onClick={()=>setPage("cart")} style={{background:"none",border:"none",position:"relative",color:G.cream,fontSize:"1.2rem",cursor:"pointer", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  🛒<Badge count={cartCount}/>
                </button>
                <button className="ghost-btn" onClick={logout} style={{fontSize:".72rem",padding:".5rem 1rem"}}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProduct(null)}
              style={{position:"absolute", top:15, right:15, background:"none", border:"none", color:G.textMuted, fontSize:"1.5rem", cursor:"pointer"}}
            >✕</button>
            
            <div className="image-gallery">
              <img 
                src={(selectedProduct.images && selectedProduct.images[0]) || ""} 
                alt={selectedProduct.name} 
                className="main-image"
                id="main-img-view"
              />
              <div className="thumbnail-list">
                {selectedProduct.images && selectedProduct.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    className="thumbnail" 
                    onClick={() => document.getElementById('main-img-view').src = img}
                    alt={`${selectedProduct.name} ${i+1}`}
                  />
                ))}
              </div>
            </div>

            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
              <span className="tag" style={{alignSelf:"flex-start", background:G.goldDark+"22", color:G.gold, marginBottom:"1rem"}}>{selectedProduct.category}</span>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", color:G.cream, marginBottom:".5rem", lineHeight:1.2}}>{selectedProduct.name}</h2>
              <p style={{fontSize:".9rem", color:G.textMuted, marginBottom:"1.5rem", letterSpacing:".05em"}}>Material: <span style={{color:G.gold}}>{selectedProduct.metal}</span></p>
              
              <div className="divider" style={{margin:"0 0 1.5rem 0"}}/>
              
              <p style={{color:G.cream, opacity:0.8, fontSize:".95rem", lineHeight:1.6, marginBottom:"2rem"}}>{selectedProduct.description}</p>
              
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", color:G.gold, lineHeight: 1.4}}>
                  Price = (Weight × Live Rate) <br/> + Making Charges & Taxes
                </div>
                <button 
                  className="gold-btn trace-btn" 
                  style={{padding:"1rem 2rem"}}
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                >
                  Add to Cart
                </button>
              </div>
              {selectedProduct.stock <= 3 && <p style={{fontSize:".8rem", color:G.error, marginTop:"1rem"}}>Hurry! Only {selectedProduct.stock} pieces left.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Pages */}
      {loading ? (
        <div style={{height:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center"}}>
            <Spinner/>
            <p style={{marginTop:"1rem",color:G.textMuted,fontSize:".8rem",letterSpacing:".1em"}}>COLLECTING FINE PIECES...</p>
          </div>
        </div>
      ) : (
        <>
          {page==="home" && <HomePage products={filteredProducts} recentProducts={recentProducts} recentIds={recentIds} search={search} setSearch={setSearch} filterMetal={filterMetal} setFilterMetal={setFilterMetal} filterPrice={filterPrice} setFilterPrice={setFilterPrice} onAddCart={addToCart} onView={setSelectedProduct}/>}
          {page==="about" && <AboutUs />}
          {page==="login" && <LoginPage setCurrentUser={setCurrentUser} setPage={setPage} showToast={showToast}/>}
          {page==="register" && <RegisterPage setCurrentUser={setCurrentUser} setPage={setPage} showToast={showToast}/>}
          {page==="cart" && <CartPage cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} cartTotal={cartTotal} setPage={setPage}/>}
          {page==="checkout" && <CheckoutPage cart={cart} cartTotal={cartTotal} currentUser={currentUser} orders={orders} setOrders={setOrders} setCart={setCart} setPage={setPage} showToast={showToast} products={products} setProducts={setProducts}/>}
          {page==="admin" && isAdmin && <AdminPage setPage={setPage} orders={orders} products={products} users={users} setUsers={setUsers} showToast={showToast}/>}
          {page==="admin-orders" && isAdmin && <AdminOrdersPage orders={orders} setOrders={setOrders} setPage={setPage} showToast={showToast}/>}
          {page==="admin-products" && isAdmin && <AdminProductsPage products={products} setProducts={setProducts} setPage={setPage} showToast={showToast}/>}
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
