"use client";
export default function DemoError({reset}:{reset:()=>void}){return <main className="gate-page"><section className="gate-card"><h1>The demo is temporarily unavailable.</h1><p>Please try loading the page again.</p><button className="button" onClick={reset}>Try again</button></section></main>}
