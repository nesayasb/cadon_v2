export const ACCESS_EMAIL="nathnael.eb@outlook.com";
export function accessEmailDraft(data:Record<string,unknown>){
 const field=(name:string,max:number)=>typeof data[name]==="string"?(data[name] as string).trim().slice(0,max):"";
 const body=`CADON access request\n\nWork email: ${field("email",254)}\nCompany: ${field("company",120)}\nRole: ${field("role",100)}\nInterested in: ${field("audience",100)}\n\nUse case:\n${field("useCase",1500)}`;
 return {body,href:`mailto:${ACCESS_EMAIL}?subject=${encodeURIComponent("CADON access request")}&body=${encodeURIComponent(body)}`};
}
