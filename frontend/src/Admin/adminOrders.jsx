import { G } from "../App";
import { SectionHead } from "../pages/Homepage";
import { fmt } from "../components/Helpers";
import { deleteOrder as apiDeleteOrder } from "../services/api";

// ── Admin Orders ───────────────────────────────────────────────────────────────
function AdminOrdersPage({orders,setOrders,setPage,showToast}) {
  const handleDeleteOrder = async (id) => {
    if(window.confirm("Delete this order?")) {
      const token = localStorage.getItem("userToken");
      try {
        await apiDeleteOrder(id, token);
        setOrders(orders.filter(o => o._id !== id));
        showToast("Order deleted successfully");
      } catch (error) {
        showToast("Error deleting order", "error");
      }
    }
  };

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"2rem"}}>
        <button className="ghost-btn" onClick={()=>setPage("admin")} style={{fontSize:".72rem",padding:".4rem .9rem"}}>← Back</button>
        <SectionHead title="All Orders" sub={`${orders.length} orders total`}/>
      </div>
      {orders.length===0 ? <p style={{color:G.textMuted}}>No orders yet.</p> : (
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {orders.map(o=>(
            <div key={o._id} className="card" style={{padding:"1.2rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".8rem"}}>
                <div>
                  <span style={{fontWeight:500,fontSize:".9rem"}}>Order ID: {o._id}</span>
                  <span style={{color:G.textMuted,fontSize:".75rem",marginLeft:".8rem"}}>{new Date(o.createdAt).toLocaleString()}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",color:G.gold,fontSize:"1.1rem"}}>{fmt(o.totalPrice)}</span>
                  <button onClick={()=>handleDeleteOrder(o._id)} style={{background:"rgba(224,85,85,.1)",border:`1px solid rgba(224,85,85,.3)`,color:G.error,borderRadius:2,padding:".4rem .8rem",fontSize:".72rem",cursor:"pointer"}}>Delete</button>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",fontSize:".82rem"}}>
                <div>
                  <p style={{color:G.textMuted,marginBottom:".2rem"}}>Customer</p>
                  <p>{o.user?.name || "Guest"}</p>
                  <p style={{color:G.textMuted}}>{o.user?.email}</p>
                  <p style={{color:G.textMuted}}>{o.shippingAddress?.phone}</p>
                </div>
                <div>
                  <p style={{color:G.textMuted,marginBottom:".2rem"}}>Delivery Address</p>
                  <p>{o.shippingAddress?.address}</p>
                  <p style={{color:G.textMuted}}>{o.shippingAddress?.city}, {o.shippingAddress?.postalCode}</p>
                </div>
              </div>
              <div className="divider" style={{margin:".8rem 0"}}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:".5rem"}}>
                {o.orderItems?.map((i, idx)=>(
                  <div key={idx} style={{display:"flex",alignItems:"center",gap:".5rem",background:"rgba(255,255,255,.04)",border:`1px solid ${G.border}`,borderRadius:2,padding:".3rem .6rem",fontSize:".78rem"}}>
                    <img src={i.image} alt="" style={{width:24,height:24,objectFit:"cover",borderRadius:2}}/>
                    <span>{i.name} × {i.qty}</span>
                    <span style={{color:G.gold}}>{fmt(i.price*i.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;