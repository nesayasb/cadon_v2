import styles from "./NetworkBackdrop.module.css";

const nodes = [[180,140],[310,90],[425,190],[570,110],[700,180],[850,100],[1030,180],[1130,320],[980,355],[1100,520],[930,610],[780,515],[660,650],[565,470],[420,595],[300,455],[165,530],[95,350],[260,285],[465,330],[655,310],[810,330],[725,430],[935,460]];
const edges = [[0,1],[0,18],[0,17],[1,2],[1,3],[2,3],[2,18],[2,19],[3,4],[4,5],[4,20],[4,21],[5,6],[6,7],[6,8],[7,8],[7,9],[8,21],[8,23],[9,10],[9,23],[10,11],[10,23],[11,12],[11,22],[12,13],[13,14],[13,19],[13,22],[14,15],[15,16],[15,18],[15,19],[16,17],[17,18],[18,19],[19,20],[19,22],[20,21],[20,22],[21,22],[21,23],[22,23]];

export default function NetworkBackdrop() {
  return <div className={styles.backdrop} aria-hidden="true">
    <svg viewBox="0 0 1200 760" fill="none" focusable="false">
      <defs>
        <radialGradient id="cadon-network-halo"><stop stopColor="#426cff" stopOpacity=".24"/><stop offset="1" stopColor="#426cff" stopOpacity="0"/></radialGradient>
        <linearGradient id="cadon-network-line" x1="200" y1="600" x2="1000" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#416bff" stopOpacity=".05"/><stop offset=".6" stopColor="#6288ff" stopOpacity=".65"/><stop offset="1" stopColor="#a9c7ff" stopOpacity=".18"/></linearGradient>
      </defs>
      <ellipse cx="690" cy="360" rx="460" ry="350" fill="url(#cadon-network-halo)"/>
      <g stroke="url(#cadon-network-line)" strokeWidth="1">{edges.map(([a,b])=><path key={`${a}-${b}`} d={`M ${nodes[a][0]} ${nodes[a][1]} L ${nodes[b][0]} ${nodes[b][1]}`}/>)}</g>
      <g className={styles.nodes}>{nodes.map(([cx,cy],i)=><g key={`${cx}-${cy}`}><circle cx={cx} cy={cy} r={i%4===0?15:8} fill="#668cff" opacity=".07"/><circle cx={cx} cy={cy} r={i%4===0?4:2.5} fill={i%3===0?"#b7ceff":"#648cff"}/></g>)}</g>
      <circle cx="655" cy="310" r="78" stroke="#7296ff" strokeOpacity=".18"/>
      <circle cx="655" cy="310" r="108" stroke="#7296ff" strokeOpacity=".08"/>
      <circle cx="655" cy="310" r="49" fill="#15244f" stroke="#7194ff" strokeOpacity=".35"/>
      <path d="M 674 292 A 27 27 0 1 0 674 328" stroke="#a9c3ff" strokeWidth="9"/>
    </svg>
  </div>;
}
