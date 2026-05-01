import { G } from "../App";

function PageContainer({ title, children }) {
  return (
    <div className="fadeUp" style={{maxWidth: 800, margin: "0 auto", padding: "4rem 2rem", minHeight: "60vh"}}>
      <h1 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: G.gold, marginBottom: "2rem", textAlign: "center"}}>
        {title}
      </h1>
      <div style={{color: G.cream, opacity: 0.85, lineHeight: 1.8, fontSize: ".95rem", display: "flex", flexDirection: "column", gap: "1.5rem"}}>
        {children}
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <PageContainer title="Terms & Conditions">
      <p>Welcome to H.P. Jewellers. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
      
      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>1. General Conditions</h3>
      <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use H.P. Jewellers if you do not agree to take all of the terms and conditions stated on this page.</p>

      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>2. Pricing and Payment</h3>
      <p>The prices of our jewellery are subject to change based on the live market rates of gold, silver, and other precious metals. The final price calculated at checkout or in-store is binding. We accept major credit cards, debit cards, and secure online payment methods.</p>

      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>3. Custom Orders</h3>
      <p>Custom orders require a non-refundable deposit. The estimated completion time will be provided at the time of order, but it is subject to change due to the intricate nature of craftsmanship.</p>
    </PageContainer>
  );
}

export function PrivacyPage() {
  return (
    <PageContainer title="Privacy Policy">
      <p>At H.P. Jewellers, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.</p>
      
      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>1. Information We Collect</h3>
      <p>We collect personal information that you provide to us voluntarily when registering on the site, expressing an interest in obtaining information about us or our products, or when contacting us. The personal information that we collect depends on the context of your interactions with us and the Site.</p>

      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>2. How We Use Your Information</h3>
      <p>We use the information we collect in various ways, including to provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website; and communicate with you for customer service and updates.</p>
    </PageContainer>
  );
}

export function ReturnPage() {
  return (
    <PageContainer title="Return & Refund Policy">
      <p>Thank you for shopping at H.P. Jewellers. If you are not entirely satisfied with your purchase, we're here to help.</p>
      
      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>1. Returns</h3>
      <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging, and needs to have the receipt or proof of purchase.</p>

      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>2. Refunds</h3>
      <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).</p>

      <h3 style={{color: G.goldLight, marginTop: "1rem"}}>3. Non-Returnable Items</h3>
      <p>Custom-made, personalized, and engraved items are non-returnable. Items that have been worn, resized, or altered in any way cannot be accepted for return.</p>
    </PageContainer>
  );
}
