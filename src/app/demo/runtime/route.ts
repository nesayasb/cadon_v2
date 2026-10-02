import {NextResponse} from "next/server";
// Retire the legacy iframe URL. Only /api/demo-launch creates connected launch links.
export function GET(req:Request){return NextResponse.redirect(new URL("/demo",req.url));}
