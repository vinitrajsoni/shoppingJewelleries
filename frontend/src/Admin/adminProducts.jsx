
import { useState } from "react";
import { G } from "../App";
import { SectionHead } from "../pages/Homepage";
import { Field } from "../pages/Authpage";
import { fmt, metalColor, metalLabel } from "../components/Helpers";
import { createProduct, updateProduct, deleteProduct as apiDeleteProduct } from "../services/api";
// ── Admin Products ─────────────────────────────────────────────────────────────
function AdminProductsPage({products,setProducts,setPage,showToast}) {
  const blank = {name:"",description:"",price:"",metal:"gold",category:"ring",stock:"",image:""};
  const [form,setForm]=useState(blank);
  const [editId,setEditId]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const resetForm = () => { setForm(blank); setEditId(null); setShowForm(false); };

  const saveProduct = async () => {
    if(!form.name||!form.price||!form.stock){showToast("Name, price & stock required","error");return;}
    const token = localStorage.getItem("userToken");
    
    try {
      if(editId) {
        const updated = await updateProduct(editId, form, token);
        setProducts(ps=>ps.map(p=>p.id===editId ? updated : p));
        showToast("Product updated");
      } else {
        const created = await createProduct(form, token);
        setProducts(ps=>[created,...ps]);
        showToast("Product added");
      }
      resetForm();
    } catch (error) {
      showToast("Error saving product","error");
      console.error(error);
    }
  };

  const startEdit = (p) => { 
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      metal: p.metal,
      category: p.category,
      stock: p.stock,
      image: p.image
    }); 
    setEditId(p._id || p.id); 
    setShowForm(true); 
    window.scrollTo(0,0); 
  };
  
  const deleteProduct = async (id) => { 
    if(window.confirm("Delete this product?")){ 
      const token = localStorage.getItem("userToken");
      try {
        await apiDeleteProduct(id, token);
        setProducts(ps=>ps.filter(p=>p.id!==id)); 
        showToast("Product deleted"); 
      } catch (error) {
        showToast("Error deleting product","error");
      }
    } 
  };

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",marginBottom:"2rem"}}>
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <button className="ghost-btn" onClick={()=>setPage("admin")} style={{fontSize:".72rem",padding:".4rem .9rem"}}>← Back</button>
          <SectionHead title="Manage Products" sub={`${products.length} products`}/>
        </div>
        <button className="gold-btn" onClick={()=>{setShowForm(!showForm);setEditId(null);setForm(blank);}}>
          {showForm?"Cancel":"+ Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card" style={{padding:"1.5rem",marginBottom:"2rem"}}>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",marginBottom:"1.2rem"}}>{editId?"Edit Product":"New Product"}</h3>
          <div style={{display:"grid",gap:"1rem"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              <Field label="Product Name"><input className="input-field" value={form.name} onChange={set("name")} placeholder="Empress Gold Bangle"/></Field>
              <Field label="Image URL"><input className="input-field" value={form.image} onChange={set("image")} placeholder="https://…"/></Field>
            </div>
            <Field label="Description"><textarea className="input-field" value={form.description} onChange={set("description")} placeholder="Describe this piece…" style={{resize:"vertical",minHeight:60}}/></Field>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"1rem"}}>
              <Field label="Price (₹)"><input className="input-field" type="number" value={form.price} onChange={set("price")} placeholder="45000"/></Field>
              <Field label="Stock"><input className="input-field" type="number" value={form.stock} onChange={set("stock")} placeholder="10"/></Field>
              <Field label="Metal">
                <select className="input-field" value={form.metal} onChange={set("metal")}>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="artificial">Artificial</option>
                </select>
              </Field>
              <Field label="Category">
                <select className="input-field" value={form.category} onChange={set("category")}>
                  {["ring","necklace","bangle","earring","maangtikka","set","bracelet","other"].map(c=><option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                </select>
              </Field>
            </div>
            <div style={{display:"flex",gap:".8rem"}}>
              <button className="gold-btn" onClick={saveProduct}>{editId?"Save Changes":"Add Product"}</button>
              <button className="ghost-btn" onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Table */}
      <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
        {products.map(p=>(
          <div key={p._id || p.id} className="card" style={{display:"flex",gap:"1rem",padding:"1rem",alignItems:"center",flexWrap:"wrap"}}>
            <img src={p.image} alt={p.name} style={{width:64,height:64,objectFit:"cover",borderRadius:2,flexShrink:0}}/>
            <div style={{flex:1,minWidth:160}}>
              <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",marginBottom:".2rem"}}>{p.name || "Untitled"}</h4>
              <div style={{display:"flex",gap:".4rem",flexWrap:"wrap"}}>
                <span className="tag" style={{background:`${metalColor(p.metal)}22`,color:metalColor(p.metal)}}>{metalLabel(p.metal)}</span>
                <span className="tag" style={{background:"rgba(255,255,255,.05)",color:G.textMuted}}>{p.category}</span>
              </div>
            </div>
            <div style={{textAlign:"center",minWidth:80}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",color:G.gold,fontSize:"1.1rem"}}>{fmt(p.price || 0)}</div>
              <div style={{fontSize:".72rem",color:G.textMuted}}>price</div>
            </div>
            <div style={{textAlign:"center",minWidth:60}}>
              <div style={{color:p.stock<=3?G.error:G.success,fontWeight:500}}>{p.stock || 0}</div>
              <div style={{fontSize:".72rem",color:G.textMuted}}>stock</div>
            </div>
            <div style={{display:"flex",gap:".5rem"}}>
              <button className="ghost-btn" style={{fontSize:".72rem",padding:".4rem .8rem"}} onClick={()=>startEdit(p)}>Edit</button>
              <button onClick={()=>deleteProduct(p._id || p.id)} style={{background:"rgba(224,85,85,.1)",border:`1px solid rgba(224,85,85,.3)`,color:G.error,borderRadius:2,padding:".4rem .8rem",fontSize:".72rem",cursor:"pointer",letterSpacing:".06em",textTransform:"uppercase"}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductsPage;