import { G } from "../App";
import { fmt, metalColor, metalLabel } from "./Helpers";
export function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
      <div style={{width:32,height:32,border:`1.5px solid ${G.gold}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem"}}>◆</div>
      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:300,letterSpacing:".1em",color:G.gold}}>H.P. JEWELLERS</span>
    </div>
  );
}

export function Spinner() {
  return <div style={{width:20,height:20,border:`2px solid ${G.border}`,borderTop:`2px solid ${G.gold}`,borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto"}}/>;
}

export function Badge({count}) {
  if(!count) return null;
  return <span style={{position:"absolute",top:-6,right:-8,background:G.gold,color:G.dark,borderRadius:"50%",width:16,height:16,fontSize:".62rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{count>9?"9+":count}</span>;
}

export function ProductCard({product, onAddCart, onView, isNew}) {
  return (
    <div className="card fadeUp" style={{overflow:"hidden",position:"relative",cursor:"pointer"}} onClick={() => onView(product)}>
      {isNew && <div style={{position:"absolute",top:8,left:8,zIndex:2,background:G.gold,color:G.dark,padding:".1rem .4rem",fontSize:".6rem",fontWeight:600,letterSpacing:".05em",borderRadius:2}}>NEW</div>}
      <div style={{height:160,overflow:"hidden",background:"#0f0a04"}}>
        <img src={product.images && product.images[0]} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.9,transition:"transform .4s"}}
          onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
          onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
      </div>
      <div style={{padding:".8rem"}}>
        <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".95rem",fontWeight:600,lineHeight:1.2,marginBottom:".3rem",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{product.name}</h3>
        <span className="tag" style={{background:`${metalColor(product.metal)}22`,color:metalColor(product.metal),marginBottom:".5rem",fontSize:".65rem"}}>{metalLabel(product.metal)}</span>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:".5rem"}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".85rem",color:G.gold, lineHeight: 1.2}}>Price based on <br/>Live Rate + Making</span>
          <button className="gold-btn trace-btn" style={{padding:".4rem .8rem",fontSize:".65rem"}} onClick={(e)=>{e.stopPropagation(); onAddCart(product)}}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
