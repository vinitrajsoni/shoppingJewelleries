import { G } from "../App";
import { ProductCard } from "../components/components";

function HomePage({products,recentProducts,recentIds,search,setSearch,filterMetal,setFilterMetal,filterPrice,setFilterPrice,onAddCart}) {
  return (
    <div style={{maxWidth:1200,margin:"0 auto",padding:"2rem"}}>
      {/* Hero */}
      <div style={{textAlign:"center",padding:"3rem 0 2.5rem",borderBottom:`1px solid ${G.border}`,marginBottom:"2.5rem"}}>
        <p style={{fontSize:".78rem",letterSpacing:".3em",textTransform:"uppercase",color:G.textMuted,marginBottom:"1rem"}}>Curated Fine Jewellery</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.5rem,5vw,4rem)",fontWeight:300,lineHeight:1.15,color:G.cream,marginBottom:"1rem"}}>
          Adorn Yourself with<br/><em style={{color:G.gold}}>Timeless Elegance</em>
        </h1>
        <p style={{color:G.textMuted,fontSize:".9rem",maxWidth:480,margin:"0 auto"}}>Gold, silver & artisan-crafted pieces for every occasion.</p>
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
      {!search && filterMetal==="all" && filterPrice==="all" && (
        <>
          <SectionHead title="Recent Arrivals" sub="Freshly added to our collection"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:"1.2rem",marginBottom:"3rem"}}>
            {recentProducts.map(p=><ProductCard key={p.id} product={p} onAddCart={onAddCart} isNew/>)}
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:"1.2rem"}}>
          {products.map(p=><ProductCard key={p.id} product={p} onAddCart={onAddCart} isNew={!search&&filterMetal==="all"&&filterPrice==="all"&&recentIds.has(p.id)}/>)}
        </div>
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