import { G } from "../App";
import { ProductCard } from "../components/components";
import { useState, useEffect } from "react";

function HomePage({products,recentProducts,recentIds,search,setSearch,filterMetal,setFilterMetal,filterPrice,setFilterPrice,onAddCart,onView}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterMetal, filterPrice]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{maxWidth:1200,margin:"0 auto",padding:"2rem"}}>
      {/* Hero */}
      <div style={{textAlign:"center",padding:"3rem 0 2.5rem",borderBottom:`1px solid ${G.border}`,marginBottom:"2.5rem"}}>
        <p style={{fontSize:".78rem",letterSpacing:".3em",textTransform:"uppercase",color:G.textMuted,marginBottom:"1rem"}}>Curated Fine Jewellery</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,5vw,4rem)",fontWeight:300,lineHeight:1.15,color:G.cream,marginBottom:"1rem"}}>
          Adorn Yourself with<br/><em style={{color:G.gold}}>Timeless Elegance</em>
        </h1>
        <p style={{color:G.textMuted,fontSize:".9rem",maxWidth:480,margin:"0 auto",marginBottom:"1.5rem"}}>Gold, silver & artisan-crafted pieces for every occasion.</p>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",color:G.goldLight,letterSpacing:".05em"}}>Come and visit our store!</p>
      </div>

      {/* Search & Filters */}
      <div style={{display:"flex",flexWrap:"wrap",gap:"1rem",marginBottom:"2rem",alignItems:"center"}}>
        <div style={{flex:"1 1 260px",position:"relative"}}>
          <span style={{position:"absolute",left:"1rem",top:"50%",transform:"translateY(-50%)",color:G.textMuted,fontSize:".9rem"}}>⌕</span>
          <input className="input-field" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, metal, category…" style={{paddingLeft:"2.5rem"}}/>
        </div>
        <select className="input-field" value={filterMetal} onChange={e=>setFilterMetal(e.target.value)} style={{flex:"0 0 150px"}}>
          <option value="all">All Metals</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="artificial">Artificial</option>
        </select>
        <select className="input-field" value={filterPrice} onChange={e=>setFilterPrice(e.target.value)} style={{flex:"0 0 160px"}}>
          <option value="all">All Prices</option>
          <option value="low">Under ₹5,000</option>
          <option value="mid">₹5,000 – ₹30,000</option>
          <option value="high">Above ₹30,000</option>
        </select>
        {(search||filterMetal!=="all"||filterPrice!=="all") && (
          <button className="ghost-btn" onClick={()=>{setSearch("");setFilterMetal("all");setFilterPrice("all");}}>Clear</button>
        )}
      </div>

      {/* Recent Arrivals */}
      {!search && filterMetal==="all" && filterPrice==="all" && currentPage === 1 && (
        <>
          <SectionHead title="Recent Arrivals" sub="Freshly added to our collection"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:".8rem",marginBottom:"3rem"}}>
            {recentProducts.map(p=><ProductCard key={p._id || p.id} product={p} onAddCart={onAddCart} onView={onView} isNew/>)}
          </div>
          <div className="divider"/>
          <SectionHead title="All Jewellery" sub={`${products.length} pieces available`}/>
        </>
      )}

      {/* Product Grid */}
      {products.length===0 ? (
        <div style={{textAlign:"center",padding:"4rem",color:G.textMuted}}>
          <div style={{fontSize:"2rem",marginBottom:"1rem"}}>◈</div>
          <p>No products match your search.</p>
        </div>
      ) : (
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:".8rem"}}>
            {currentProducts.map(p=><ProductCard key={p._id || p.id} product={p} onAddCart={onAddCart} onView={onView} isNew={!search&&filterMetal==="all"&&filterPrice==="all"&&recentIds.has(p._id || p.id)}/>)}
          </div>
          
          {totalPages > 1 && (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "3rem"}}>
              <button 
                className="ghost-btn" 
                onClick={handlePrev} 
                disabled={currentPage === 1}
                style={{opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer"}}
              >
                Previous
              </button>
              <span style={{color: G.cream, fontSize: ".9rem"}}>Page {currentPage} of {totalPages}</span>
              <button 
                className="ghost-btn" 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                style={{opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer"}}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function SectionHead({title,sub}) {
  return (
    <div style={{marginBottom:"1.5rem"}}>
      <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:300,color:G.cream}}>{title}</h2>
      {sub && <p style={{color:G.textMuted,fontSize:".8rem",marginTop:".2rem"}}>{sub}</p>}
    </div>
  );
}

export default HomePage;