import {ImageResponse} from "next/og";
export const alt="CADON — Put AI to work across your business";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(
 <div style={{background:"#f6f8fc",width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"75px",fontFamily:"sans-serif",color:"#151c2d"}}>
  <div style={{fontSize:40,fontWeight:700,display:"flex"}}>cadon<span style={{color:"#315beb"}}>.</span></div>
  <div style={{fontSize:19,letterSpacing:2,color:"#64708a",marginTop:50,display:"flex"}}>AI CONSULTING &amp; ENGINEERING</div>
  <div style={{fontSize:79,letterSpacing:-4,lineHeight:1.07,marginTop:22,display:"flex",flexDirection:"column"}}><span>Put AI to work.</span><span style={{color:"#315beb"}}>Across your business.</span></div>
  <div style={{fontSize:23,color:"#64708a",marginTop:40,display:"flex"}}>Strategy. Automation. Custom development.</div>
 </div>,size)}
