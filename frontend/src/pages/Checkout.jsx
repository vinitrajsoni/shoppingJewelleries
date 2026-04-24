import { useState } from "react";
import { G } from "../App";
import { SectionHead } from "./Homepage";
import { Field } from "./Authpage";
import { fmt } from "../components/Helpers";
import { createOrder } from "../services/api";

function CheckoutPage({cart,cartTotal,currentUser,orders,setOrders,setCart,setPage,showToast,products,setProducts}) {
  const [form,setForm]=useState({name:currentUser?.name||"",email:currentUser?.email||"",mobile:"",address:"",city:"",state:"",pincode:""});
  const [placed,setPlaced]=useState(false);
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const placeOrder = async () => {
    const req = ["name","email","mobile","address","city","state","pincode"];
    if(req.some(k=>!form[k])){showToast("Please fill all fields","error");return;}
    if(!/^\d{10}$/.test(form.mobile)){showToast("Enter valid 10-digit mobile","error");return;}
    if(!/^\d{6}$/.test(form.pincode)){showToast("Enter valid 6-digit pincode","error");return;}
    
    const token = localStorage.getItem("userToken");
    const orderData = {
      orderItems: cart.map(i => ({
        name: i.name,
        qty: i.qty,
        image: i.images && i.images[0],
        price: i.price,
        product: i.id
      })),
      shippingAddress: {
        address: form.address,
        city: form.city,
        postalCode: form.pincode,
        country: "India", // Default or add to form
        phone: form.mobile
      },
      paymentMethod: "Cash on Delivery", // Default
      totalPrice: cartTotal
    };

    try {
      await createOrder(orderData, token);
      
      // Reduce stock locally (Backend should handle this too in production)
      setProducts(ps=>ps.map(p=>{
        const ci=cart.find(i=>i.id===p.id);
        return ci?{...p,stock:Math.max(0,p.stock-ci.qty)}:p;
      }));
      setCart([]);
      setPlaced(true);
      showToast("Order placed successfully!");
    } catch (error) {
      showToast("Failed to place order","error");
      console.error(error);
    }
  };

  if(placed) return (
    <div style={{textAlign:"center",padding:"6rem 2rem",maxWidth:500,margin:"0 auto"}}>
      <div style={{fontSize:"3rem",marginBottom:"1rem"}}>✦</div>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:300,color:G.gold,marginBottom:".8rem"}}>Order Placed!</h2>
      <p style={{color:G.textMuted,marginBottom:"2rem"}}>Thank you for shopping with Zehura. Your jewellery will be delivered soon.</p>
      <button className="gold-btn" onClick={()=>setPage("home")}>Continue Shopping</button>
    </div>
  );

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"2rem"}}>
      <SectionHead title="Checkout" sub="Complete your delivery details"/>
      <div style={{display:"grid",gap:"1rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
          <Field label="Full Name"><input className="input-field" value={form.name} onChange={set("name")} placeholder="Priya Sharma"/></Field>
          <Field label="Email"><input className="input-field" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"/></Field>
        </div>
        <Field label="Mobile Number"><input className="input-field" value={form.mobile} onChange={set("mobile")} placeholder="10-digit mobile"/></Field>
        <Field label="Address"><textarea className="input-field" value={form.address} onChange={set("address")} placeholder="House no, Street, Area…" style={{resize:"vertical",minHeight:70}}/></Field>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1rem"}}>
          <Field label="City"><input className="input-field" value={form.city} onChange={set("city")} placeholder="Jaipur"/></Field>
          <Field label="State"><input className="input-field" value={form.state} onChange={set("state")} placeholder="Rajasthan"/></Field>
          <Field label="Pincode"><input className="input-field" value={form.pincode} onChange={set("pincode")} placeholder="302001"/></Field>
        </div>
        <div className="divider"/>
        <div style={{background:"rgba(201,168,76,.06)",border:`1px solid ${G.border}`,borderRadius:4,padding:"1rem"}}>
          <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",marginBottom:".8rem"}}>Order Summary</h4>
          {cart.map(i=><div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:".82rem",color:G.textMuted,marginBottom:".3rem"}}><span>{i.name} × {i.qty}</span><span>{fmt(i.price*i.qty)}</span></div>)}
          <div className="divider" style={{margin:".7rem 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem"}}><span>Total</span><span style={{color:G.gold}}>{fmt(cartTotal)}</span></div>
        </div>
        <button className="gold-btn" style={{padding:"1rem"}} onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default CheckoutPage;