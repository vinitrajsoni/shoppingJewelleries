import { G } from "../App";
import { SectionHead } from "../pages/Homepage";
import { fmt } from "../components/Helpers";
// ── Admin Dashboard ────────────────────────────────────────────────────────────
function AdminPage({setPage,orders,products}) {
  const totalRevenue = orders.reduce((s,o)=>s+o.total,0);
  const stats = [
    {label:"Total Orders",value:orders.length,icon:"📦"},
    {label:"Total Products",value:products.length,icon:"💎"},
    {label:"Revenue",value:fmt(totalRevenue),icon:"₹"},
    {label:"Low Stock",value:products.filter(p=>p.stock<=3).length,icon:"⚠️"},
  ];
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"2rem"}}>
      <SectionHead title="Admin Panel" sub="Manage your jewellery store"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem",marginBottom:"2.5rem"}}>
        {stats.map(s=>(
          <div key={s.label} className="card" style={{padding:"1.5rem",textAlign:"center"}}>
            <div style={{fontSize:"1.8rem",marginBottom:".5rem"}}>{s.icon}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",color:G.gold}}>{s.value}</div>
            <div style={{fontSize:".78rem",color:G.textMuted,marginTop:".2rem"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
        <div className="card" style={{padding:"2rem",textAlign:"center",cursor:"pointer"}} onClick={()=>setPage("admin-orders")}>
          <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>📋</div>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",marginBottom:".5rem"}}>View All Orders</h3>
          <p style={{color:G.textMuted,fontSize:".82rem"}}>See customer orders, delivery info & details</p>
        </div>
        <div className="card" style={{padding:"2rem",textAlign:"center",cursor:"pointer"}} onClick={()=>setPage("admin-products")}>
          <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>💍</div>
          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",marginBottom:".5rem"}}>Manage Products</h3>
          <p style={{color:G.textMuted,fontSize:".82rem"}}>Add, edit, update stock & remove products</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;