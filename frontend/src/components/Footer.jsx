import { G } from "../App";

export default function Footer({ setPage }) {
  return (
    <footer style={{background: G.darkCard, borderTop: `1px solid ${G.border}`, padding: "3rem 2rem", marginTop: "auto"}}>
      <div style={{maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem"}}>
        
        {/* Brand & Address */}
        <div>
          <h3 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: G.gold, marginBottom: "1rem"}}>H.P. Jewellers</h3>
          <p style={{color: G.cream, opacity: 0.8, fontSize: ".9rem", lineHeight: 1.6, marginBottom: "1rem"}}>
            Crafting timeless elegance and preserving the legacy of fine jewellery.
          </p>
          <div style={{color: G.textMuted, fontSize: ".85rem", lineHeight: 1.6}}>
            <strong>Address:</strong><br />
            123 Main Street, Jewellery Market<br />
            City, State, Zip Code
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{color: G.cream, fontSize: "1rem", marginBottom: "1rem", letterSpacing: ".05em"}}>Contact Us</h4>
          <ul style={{listStyle: "none", padding: 0, margin: 0, color: G.textMuted, fontSize: ".9rem", lineHeight: 2}}>
            <li><strong>Phone:</strong> +91 9876543210</li>
            <li><strong>Email:</strong> contact@hpjewellers.com</li>
            <li>
              <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noreferrer" style={{color: G.gold, textDecoration: "none"}}>
                Join our WhatsApp Group
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 style={{color: G.cream, fontSize: "1rem", marginBottom: "1rem", letterSpacing: ".05em"}}>Follow Us</h4>
          <div style={{display: "flex", gap: "1rem"}}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{color: G.textMuted, textDecoration: "none", fontSize: "1.2rem"}}>
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{color: G.textMuted, textDecoration: "none", fontSize: "1.2rem"}}>
              YouTube
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{color: G.cream, fontSize: "1rem", marginBottom: "1rem", letterSpacing: ".05em"}}>Legal</h4>
          <ul style={{listStyle: "none", padding: 0, margin: 0, color: G.textMuted, fontSize: ".9rem", lineHeight: 2}}>
            <li><button onClick={() => { window.scrollTo(0, 0); setPage("terms"); }} style={{background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "inherit", padding: 0}}>Terms & Conditions</button></li>
            <li><button onClick={() => { window.scrollTo(0, 0); setPage("privacy"); }} style={{background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "inherit", padding: 0}}>Privacy Policy</button></li>
            <li><button onClick={() => { window.scrollTo(0, 0); setPage("return"); }} style={{background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "inherit", padding: 0}}>Return Policy</button></li>
          </ul>
        </div>

      </div>
      <div style={{textAlign: "center", marginTop: "3rem", paddingTop: "1.5rem", borderTop: `1px solid ${G.border}`, color: G.textMuted, fontSize: ".8rem"}}>
        &copy; {new Date().getFullYear()} H.P. Jewellers. All rights reserved.
      </div>
    </footer>
  );
}
