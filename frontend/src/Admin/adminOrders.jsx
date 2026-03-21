import { G } from "../App";
import { SectionHead } from "../pages/Homepage";
import { fmt } from "../components/Helpers";
// ── Admin Orders ───────────────────────────────────────────────────────────────
function AdminOrdersPage({orders,setPage}) {
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem"}}>
      <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"2rem"}}>
        <button className="ghost-btn" onClick={()=>setPage("admin")} style={{fontSize:".72rem",padding:".4rem .9rem"}}>← Back</button>
        <SectionHead title="All Orders" sub={`${orders.length} orders total`}/>
      </div>
      {orders.length===0 ? <p style={{color:G.textMuted}}>No orders yet.</p> : (
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {orders.map(o=>(
            <div key={o.id} className="card" style={{padding:"1.2rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:".5rem",marginBottom:".8rem"}}>
                <div>
                  <span style={{fontWeight:500,fontSize:".9rem"}}>{o.id}</span>
                  <span style={{color:G.textMuted,fontSize:".75rem",marginLeft:".8rem"}}>{new Date(o.createdAt).toLocaleString()}</span>
                </div>
                <span style={{fontFamily:"'Cormorant Garamond',serif",color:G.gold,fontSize:"1.1rem"}}>{fmt(o.total)}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",fontSize:".82rem"}}>
                <div>
                  <p style={{color:G.textMuted,marginBottom:".2rem"}}>Customer</p>
                  <p>{o.address.name}</p>
                  <p style={{color:G.textMuted}}>{o.address.email}</p>
                  <p style={{color:G.textMuted}}>{o.address.mobile}</p>
                </div>
                <div>
                  <p style={{color:G.textMuted,marginBottom:".2rem"}}>Delivery Address</p>
                  <p>{o.address.address}</p>
                  <p style={{color:G.textMuted}}>{o.address.city}, {o.address.state} – {o.address.pincode}</p>
                </div>
              </div>
              <div className="divider" style={{margin:".8rem 0"}}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:".5rem"}}>
                {o.items.map(i=>(
                  <div key={i.id} style={{display:"flex",alignItems:"center",gap:".5rem",background:"rgba(255,255,255,.04)",border:`1px solid ${G.border}`,borderRadius:2,padding:".3rem .6rem",fontSize:".78rem"}}>
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