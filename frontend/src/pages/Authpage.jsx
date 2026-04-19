import { useState } from "react";
import { G } from "../App";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';

const API_URL = "http://localhost:5000/api/auth";

function LoginPage({setCurrentUser,setPage,showToast}) {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  const submit = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password: pass });
      setCurrentUser(res.data);
      localStorage.setItem("userToken", res.data.token);
      showToast(`Welcome back, ${res.data.name.split(" ")[0]}!`);
      setPage("home");
    } catch (error) {
      setErr(error.response?.data?.message || "Invalid email or password.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google`, { token: credentialResponse.credential });
      setCurrentUser(res.data);
      localStorage.setItem("userToken", res.data.token);
      showToast(`Welcome, ${res.data.name.split(" ")[0]}!`);
      setPage("home");
    } catch (error) {
      setErr("Google login failed.");
    }
  };

  return (
    <AuthShell title="Welcome Back" sub="Sign in to your account">
      {err && <p style={{color:G.error,fontSize:".8rem",marginBottom:"1rem"}}>{err}</p>}
      <Field label="Email"><input className="input-field" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></Field>
      <Field label="Password"><input className="input-field" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/></Field>
      <button className="gold-btn" style={{width:"100%",marginTop:".5rem"}} onClick={submit}>Sign In</button>
      
      <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <hr style={{ flex: 1, borderColor: "#ccc", opacity: 0.3 }} />
        <span style={{ padding: '0 10px', fontSize: '0.8rem', color: G.textMuted }}>OR</span>
        <hr style={{ flex: 1, borderColor: "#ccc", opacity: 0.3 }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setErr("Google Sign In was unsuccessful")}
          useOneTap
        />
      </div>

      <p style={{textAlign:"center",marginTop:"1.2rem",fontSize:".82rem",color:G.textMuted}}>
        New here? <button style={{background:"none",border:"none",color:G.gold,cursor:"pointer",textDecoration:"underline"}} onClick={()=>setPage("register")}>Create an account</button>
      </p>
    </AuthShell>
  );
}

function RegisterPage({setCurrentUser,setPage,showToast}) {
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [err,setErr]=useState("");
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const submit = async () => {
    if(!form.name||!form.email||!form.password){setErr("All fields are required.");return;}
    if(form.password!==form.confirm){setErr("Passwords do not match.");return;}
    
    try {
      const res = await axios.post(`${API_URL}/register`, { 
        name: form.name, 
        email: form.email, 
        password: form.password 
      });
      setCurrentUser(res.data);
      localStorage.setItem("userToken", res.data.token);
      showToast("Account created! Welcome to our store.");
      setPage("home");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_URL}/google`, { token: credentialResponse.credential });
      setCurrentUser(res.data);
      localStorage.setItem("userToken", res.data.token);
      showToast(`Welcome, ${res.data.name.split(" ")[0]}!`);
      setPage("home");
    } catch (error) {
      setErr("Google registration failed.");
    }
  };

  return (
    <AuthShell title="Create Account" sub="Join our jewellery community">
      {err && <p style={{color:G.error,fontSize:".8rem",marginBottom:"1rem"}}>{err}</p>}
      <Field label="Full Name"><input className="input-field" value={form.name} onChange={set("name")} placeholder="Priya Sharma"/></Field>
      <Field label="Email"><input className="input-field" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"/></Field>
      <Field label="Password"><input className="input-field" type="password" value={form.password} onChange={set("password")} placeholder="Min 6 characters"/></Field>
      <Field label="Confirm Password"><input className="input-field" type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()}/></Field>
      <button className="gold-btn" style={{width:"100%",marginTop:".5rem"}} onClick={submit}>Create Account</button>
      
      <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <hr style={{ flex: 1, borderColor: "#ccc", opacity: 0.3 }} />
        <span style={{ padding: '0 10px', fontSize: '0.8rem', color: G.textMuted }}>OR</span>
        <hr style={{ flex: 1, borderColor: "#ccc", opacity: 0.3 }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setErr("Google Sign Up was unsuccessful")}
          useOneTap
        />
      </div>

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