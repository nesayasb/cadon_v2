import {ImageResponse} from "next/og";
export const alt="CADON — Data, AI & IT Consulting";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(
 <div style={{background:"#10152d",width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"75px",fontFamily:"sans-serif",color:"#f5f7ff"}}>
  <div style={{fontSize:40,fontWeight:700,display:"flex"}}>cadon<span style={{color:"#a4bcff"}}>.</span></div>
  <div style={{fontSize:19,letterSpacing:2,color:"#b3c1df",marginTop:50,display:"flex"}}>DATA, AI &amp; IT CONSULTING</div>
  <div style={{fontSize:68,letterSpacing:-4,lineHeight:1.07,marginTop:22,display:"flex",flexDirection:"column"}}><span>Data, AI & IT</span><span style={{color:"#a4bcff"}}>Built around your business</span></div>
  <div style={{fontSize:23,color:"#b3c1df",marginTop:40,display:"flex"}}>Strategy. Data. AI. Digital solutions.</div>
 </div>,size)}
