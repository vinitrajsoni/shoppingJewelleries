import { G } from "../App";
import { fmt, metalColor, metalLabel } from "../components/Helpers";
import { SectionHead } from "./Homepage";

function CartPage({cart,removeFromCart,updateQty,cartTotal,setPage}) {
  if(cart.length===0) return (
    <div style={{textAlign:"center",padding:"6rem 2rem",color:G.textMuted}}>
      <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🛒</div>
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:300,marginBottom:".8rem",color:G.cream}}>Your cart is empty</h3>
      <button className="gold-btn" onClick={()=>setPage("home")}>Continue Shopping</button>
    </div>
  );
  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"2rem"}}>
      <SectionHead title="Shopping Cart" sub={`${cart.length} item(s)`}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"2rem",alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {cart.map(item=>(
            <div key={item.id} className="card" style={{display:"flex",gap:"1rem",padding:"1rem"}}>
              <img src={item.images && item.images[0]} alt={item.name} style={{width:80,height:80,objectFit:"cover",borderRadius:2}}/>
              <div style={{flex:1}}>
                <h4 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",marginBottom:".2rem"}}>{item.name}</h4>
                <span className="tag" style={{background:`${metalColor(item.metal)}22`,color:metalColor(item.metal),marginBottom:".5rem"}}>{metalLabel(item.metal)}</span>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:".5rem"}}>
                  <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                    <button onClick={()=>updateQty(item.id,-1)} style={{background:`rgba(255,255,255,.06)`,border:`1px solid ${G.border}`,color:G.cream,width:28,height:28,borderRadius:2,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{minWidth:20,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={()=>updateQty(item.id,1)} style={{background:`rgba(255,255,255,.06)`,border:`1px solid ${G.border}`,color:G.cream,width:28,height:28,borderRadius:2,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",color:G.gold}}>{fmt(item.price*item.qty)}</span>
                  <button onClick={()=>removeFromCart(item.id)} style={{background:"none",border:"none",color:G.textMuted,fontSize:"1rem",cursor:"pointer"}}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{padding:"1.5rem",minWidth:220,position:"sticky",top:80}}>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",marginBottom:"1rem"}}>Order Summary</h3>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:".6rem",fontSize:".85rem",color:G.textMuted}}>
            <span>Subtotal</span><span>{fmt(cartTotal)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:".6rem",fontSize:".85rem",color:G.textMuted}}>
            <span>Shipping</span><span style={{color:G.success}}>Free</span>
          </div>
          <div className="divider" style={{margin:".8rem 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"1.2rem",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem"}}>
            <span>Total</span><span style={{color:G.gold}}>{fmt(cartTotal)}</span>
          </div>
          <button className="gold-btn" style={{width:"100%"}} onClick={()=>setPage("checkout")}>Proceed to Checkout</button>
          <button className="ghost-btn" style={{width:"100%",marginTop:".6rem"}} onClick={()=>setPage("home")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;