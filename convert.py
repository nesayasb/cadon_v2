import re
import sys

def html_to_jsx(html):
    # Basic replacements
    jsx = html
    # class to className
    jsx = re.sub(r'\bclass=', 'className=', jsx)
    # for to htmlFor (in labels)
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    
    # Само-закрывающиеся теги
    tags = ['br', 'hr', 'img', 'input', 'meta', 'link']
    for tag in tags:
        jsx = re.sub(rf'<{tag}([^>]*?)(?<!/)>', rf'<{tag}\1 />', jsx)
        
    # inline style strings to objects -> style="max-width:600px;color:#f0f1ea" -> style={{maxWidth: '600px', color: '#f0f1ea'}}
    def repl_style(match):
        style_str = match.group(1)
        styles = []
        for prop in style_str.split(';'):
            if not prop.strip(): continue
            parts = prop.split(':')
            if len(parts) == 2:
                k, v = parts[0].strip(), parts[1].strip()
                # camelCase key
                k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
                styles.append(f"'{k}': '{v}'")
        return f"style={{{{ {', '.join(styles)} }}}}"
    jsx = re.sub(r'style="([^"]*)"', repl_style, jsx)

    # svg attributes (just common ones in this snippet)
    jsx = re.sub(r'fill-rule', 'fillRule', jsx)
    jsx = re.sub(r'clip-rule', 'clipRule', jsx)
    
    # remove HTML comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx)

    # onclick to onClick wrappers (we will handle these manually or strip them for React)
    jsx = re.sub(r'onclick="([^"]*)"', r'onClick={() => { /* \1 */ }}', jsx)

    # remove <script>
    jsx = re.sub(r'<script.*?>.*?</script>', '', jsx, flags=re.DOTALL)
    jsx = re.sub(r'<style>.*?</style>', '', jsx, flags=re.DOTALL)
    
    return jsx

with open('cadon_landing_v4.html', 'r', encoding='utf-8') as f:
    text = f.read()

body_match = re.search(r'<section id="hero">.*?</section>\s*(.*?)<footer', text, re.DOTALL)
if not body_match:
    print("Match failed")
    sys.exit(1)

body_html = '<section id="hero">' + body_match.group(1).rsplit('<section id="cta">', 1)[0] + '<section id="cta">' + body_match.group(1).rsplit('<section id="cta">', 1)[1]
# Actually, a simpler way is regex from <section id="hero"> up to the END of <section id="cta">
body_match2 = re.search(r'(<section id="hero">.*?</section>\s*<!-- FOOTER -->)', text, re.DOTALL)
if body_match2:
    # Just take everything from Hero to right before Footer
    body_html = body_match2.group(1).replace('<!-- FOOTER -->', '')
else:
    body_html = '<section id="hero">' + re.search(r'<section id="hero">(.*?)<footer', text, re.DOTALL).group(1)

# Remove Logos!
body_html = re.sub(r'<!-- LOGOS -->.*?<div class="lfr"></div>\s*</div>', '', body_html, flags=re.DOTALL)

jsx_body = html_to_jsx(body_html)

out = """
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import '../app/v4.css';

export default function LandingV4Body() {
  useEffect(() => {
    /* REVEAL */
    const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.07});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    /* HERO FADE */
    ['.h-kicker','h1','.h-foot'].forEach((s,i)=>{
      const el=document.querySelector(s);if(!el)return;
      Object.assign(el.style,{opacity:'0',transform:'translateY(11px)',transition:`opacity .6s ease ${i*.12}s,transform .6s ease ${i*.12}s`});
      requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='translateY(0)'});
    });

    /* SCROLL-REVEAL */
    const sec=document.getElementById('sr-section');
    const L=document.getElementById('srL'),R=document.getElementById('srR');
    const seed=document.getElementById('srSeed'),seedLbl=document.getElementById('srSeedLbl');
    const popup=document.getElementById('srPopup');
    const bot=document.getElementById('srBot'),cue=document.getElementById('srCue');
    if(!sec||window.matchMedia('(max-width:768px)').matches) return;

    const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
    const lp=(a,b,t)=>a+(b-a)*t;
    const ease=t=>t<.5?2*t*t:-1+(4-2*t)*t;

    if(L) L.style.cssText='opacity:1;transform:translateY(-50%) translateX(0)';
    if(R) R.style.cssText='opacity:1;transform:translateY(-50%) translateX(0)';
    if(seed) seed.style.opacity='1';
    if(popup) { popup.style.opacity='0';popup.style.transform='translate(-50%,-50%) scale(0.1)'; }
    if(bot) bot.style.cssText='opacity:0;transform:translateY(12px)';

    const handler = () => {
      const secTop=sec.getBoundingClientRect().top+window.scrollY;
      const p=cl((window.scrollY-secTop)/(sec.offsetHeight-window.innerHeight),0,1);

      const pSide=cl(1-p*2.8,0,1);
      const pSeed=cl(1-p*6,0,1);
      const pLbl=cl(p*6-.5,0,1)*cl(1-p*5,0,1);
      const pPopup=ease(cl((p-.12)/.65,0,1));
      const pBot=cl((p-.82)/.18,0,1);
      const pCue=cl(1-p*6,0,1);
      const slide=ease(cl((p-.04)/.55,0,1))*65;

      if(L) { L.style.opacity=pSide;L.style.transform=`translateY(-50%) translateX(${-slide}px)`; }
      if(R) { R.style.opacity=pSide;R.style.transform=`translateY(-50%) translateX(${slide}px)`; }
      if(seed) seed.style.opacity=pSeed;
      if(seedLbl) seedLbl.style.opacity=pLbl;
      if(cue) cue.style.opacity=pCue;
      
      if(popup) {
        if(pPopup>0.01) {
          popup.style.opacity=pPopup;
          popup.style.transform=`translate(-50%,-50%) scale(${.1+.9*pPopup})`;
          if(pPopup>.9) popup.classList.add('live'); else popup.classList.remove('live');
        } else {
          popup.style.opacity=0;
        }
      }
      if(bot) {
        bot.style.opacity=pBot;
        bot.style.transform=`translateY(${(1-pBot)*12}px)`;
      }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      __JSX_BODY__
    </>
  );
}
""".replace('__JSX_BODY__', jsx_body)

with open('src/components/LandingV4Body.tsx', 'w', encoding='utf-8') as f:
    f.write(out)
print("LandingV4Body written!")
