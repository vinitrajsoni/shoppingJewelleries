import { G } from "../App";

export default function AboutUs() {
  return (
    <div className="fadeUp" style={{maxWidth: 1000, margin: "0 auto", padding: "4rem 2rem"}}>
      <div style={{textAlign: "center", marginBottom: "3rem"}}>
        <p style={{fontSize: ".78rem", letterSpacing: ".3em", textTransform: "uppercase", color: G.textMuted, marginBottom: "1rem"}}>About Our Legacy</p>
        <h1 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: G.cream}}>H.P. Jewellers</h1>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center", marginBottom: "4rem"}}>
        <div>
          <div style={{width: "100%", aspectRatio: "4/3", background: G.darkCard, border: `1px solid ${G.border}`, borderRadius: "4px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>
            {/* Placeholder for Shop Picture */}
            <span style={{color: G.textMuted, fontSize: "2rem"}}>❖ Shop Picture ❖</span>
          </div>
        </div>
        <div>
          <h2 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: G.gold, marginBottom: "1rem"}}>Our Story</h2>
          <p style={{color: G.cream, opacity: 0.8, lineHeight: 1.8, fontSize: ".95rem", marginBottom: "1rem"}}>
            Established with a passion for timeless elegance, H.P. Jewellers has been a hallmark of purity and trust. We craft exquisite gold, silver, and artisan pieces that celebrate life's most precious moments.
          </p>
          <p style={{color: G.cream, opacity: 0.8, lineHeight: 1.8, fontSize: ".95rem", marginBottom: "1.5rem"}}>
            Every piece in our collection tells a story of meticulous craftsmanship and unparalleled artistry. We believe in providing our customers with not just jewellery, but heirlooms that can be cherished for generations.
          </p>
          <p style={{color: G.textMuted, fontSize: ".85rem", letterSpacing: ".05em"}}>Owned By: <span style={{color: G.gold}}>H.P. Family</span></p>
        </div>
      </div>

      <div style={{marginBottom: "4rem", textAlign: "center"}}>
        <h2 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: G.gold, marginBottom: "2rem"}}>Our Certifications</h2>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem"}}>
          <div style={{width: 150, height: 200, background: G.darkCard, border: `1px solid ${G.border}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{color: G.textMuted, fontSize: ".8rem"}}>Certificate 1</span>
          </div>
          <div style={{width: 150, height: 200, background: G.darkCard, border: `1px solid ${G.border}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{color: G.textMuted, fontSize: ".8rem"}}>Certificate 2</span>
          </div>
          <div style={{width: 150, height: 200, background: G.darkCard, border: `1px solid ${G.border}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span style={{color: G.textMuted, fontSize: ".8rem"}}>Certificate 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
