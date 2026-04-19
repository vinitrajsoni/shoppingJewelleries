import { G } from "../App";
import { SectionHead } from "../pages/Homepage";
import { fmt } from "../components/Helpers";
import { deleteUser as apiDeleteUser } from "../services/api";

// ── Admin Dashboard ────────────────────────────────────────────────────────────
function AdminPage({setPage,orders,products,users,setUsers,showToast}) {
  const totalRevenue = orders.reduce((s,o)=>s+o.totalPrice,0);
  const stats = [
    {label:"Total Orders",value:orders.length,icon:"📦"},
    {label:"Total Products",value:products.length,icon:"💎"},
    {label:"Total Users",value:users.length,icon:"👥"},
    {label:"Revenue",value:fmt(totalRevenue),icon:"₹"},
  ];

  const handleDeleteUser = async (id) => {
    if(window.confirm("Delete this user?")) {
      const token = localStorage.getItem("userToken");
      try {
        await apiDeleteUser(id, token);
        setUsers(users.filter(u => u._id !== id));
        showToast("User deleted successfully");
      } catch (error) {
        showToast("Error deleting user", "error");
      }
    }
  };

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
      
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2.5rem"}}>
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

      <SectionHead title="User Management" sub="Manage registered customers"/>
      <div className="card" style={{padding:"1rem",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:".9rem"}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${G.border}`,color:G.textMuted}}>
              <th style={{padding:"1rem"}}>NAME</th>
              <th style={{padding:"1rem"}}>EMAIL</th>
              <th style={{padding:"1rem"}}>ROLE</th>
              <th style={{padding:"1rem"}}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{borderBottom:`1px solid ${G.border}`}}>
                <td style={{padding:"1rem"}}>{u.name}</td>
                <td style={{padding:"1rem"}}>{u.email}</td>
                <td style={{padding:"1rem"}}><span className="tag" style={{background:u.role==="admin"?G.goldDark+"22":G.border,color:u.role==="admin"?G.gold:G.textMuted}}>{u.role}</span></td>
                <td style={{padding:"1rem"}}>
                  {u.role !== "admin" && (
                    <button onClick={()=>handleDeleteUser(u._id)} style={{background:"rgba(224,85,85,.1)",border:`1px solid rgba(224,85,85,.3)`,color:G.error,borderRadius:2,padding:".4rem .8rem",fontSize:".72rem",cursor:"pointer"}}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;