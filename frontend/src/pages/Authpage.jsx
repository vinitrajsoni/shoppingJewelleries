import { useState } from "react";
import { G } from "../App";

function LoginPage({users,setCurrentUser,setPage,showToast}) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  const submit = () => {
    const u = users.find(u=>u.email===email && u.password===pass);
    if(!u){setErr("Invalid email or password.");return;}
    setCurrentUser(u);
    showToast(`Welcome back, ${u.name.split(" ")[0]}!`);
    setPage("home");
  };

  return (
    <AuthShell title="Welcome Back" sub="Sign in to your account">
      {err && <p style={{color:G.error,fontSize:".8rem",marginBottom:"1rem"}}>{err}</p>}
      <Field label="Email"><input className="input-field" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></Field>
      <Field label="Password"><input className="input-field" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/></Field>
      <button className="gold-btn" style={{width:"100%",marginTop:".5rem"}} onClick={submit}>Sign In</button>
      <p style={{textAlign:"center",marginTop:"1.2rem",fontSize:".82rem",color:G.textMuted}}>
        New here? <button style={{background:"none",border:"none",color:G.gold,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setPage("register")}>Create an account</button>
      </p>
      <p style={{textAlign:"center",marginTop:".5rem",fontSize:".72rem",color:G.textMuted}}>Admin: admin@jewel.com / admin123</p>
    </AuthShell>
  );
}

function RegisterPage({users,setUsers,setCurrentUser,setPage,showToast}) {
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [err,setErr]=useState("");
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const submit = () => {
    if(!form.name||!form.email||!form.password){setErr("All fields are required.");return;}
    if(form.password!==form.confirm){setErr("Passwords do not match.");return;}
    if(users.find(u=>u.email===form.email)){setErr("Email already registered.");return;}
    const newUser = {id:Date.now(),email:form.email,password:form.password,name:form.name,role:"user"};
    setUsers(u=>[...u,newUser]);
    setCurrentUser(newUser);
    showToast("Account created! Welcome to Zehura.");
    setPage("home");
  };

  return (
    <AuthShell title="Create Account" sub="Join our jewellery community">
      {err && <p style={{color:G.error,fontSize:".8rem",marginBottom:"1rem"}}>{err}</p>}
      <Field label="Full Name"><input className="input-field" value={form.name} onChange={set("name")} placeholder="Priya Sharma"/></Field>
      <Field label="Email"><input className="input-field" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"/></Field>
      <Field label="Password"><input className="input-field" type="password" value={form.password} onChange={set("password")} placeholder="Min 6 characters"/></Field>
      <Field label="Confirm Password"><input className="input-field" type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/></Field>
      <button className="gold-btn" style={{width:"100%",marginTop:".5rem"}} onClick={submit}>Create Account</button>
      <p style={{textAlign:"center",marginTop:"1.2rem",fontSize:".82rem",color:G.textMuted}}>
        Already have an account? <button style={{background:"none",border:"none",color:G.gold,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setPage("login")}>Sign in</button>
      </p>
    </AuthShell>
  );
}

function AuthShell({title,sub,children}) {
  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:300}}>{title}</h2>
          <p style={{color:G.textMuted,fontSize:".85rem",marginTop:".3rem"}}>{sub}</p>
        </div>
        <div className="card" style={{padding:"2rem"}}>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({label,children}) {
  return <div><label>{label}</label>{children}</div>;
}

export { LoginPage, RegisterPage};