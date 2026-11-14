export const ACCESS_EMAIL="nathnael.eb@outlook.com";
export const ACCESS_INTERESTS=["Financial institution","AI platform or developer","Other"];
export const PROJECT_INTERESTS=["Data & analytics","AI & automation","Digital & IT solutions","Strategy & transformation","Financial services technology","Not sure yet"];
// Keep earlier project categories valid for forms open during a deployment.
export const PROJECT_REQUEST_INTERESTS=[...PROJECT_INTERESTS,"AI strategy & roadmap","Workflow automation","AI assistants & integrations"];
export function accessEmailDraft(data:Record<string,unknown>){
 const field=(name:string,max:number)=>typeof data[name]==="string"?(data[name] as string).trim().slice(0,max):"";
 const subject=PROJECT_REQUEST_INTERESTS.includes(field("audience",100))?"CADON project enquiry":"CADON access request";
 const body=`${subject}\n\nWork email: ${field("email",254)}\nCompany: ${field("company",120)}\nRole: ${field("role",100)}\nInterested in: ${field("audience",100)}\n\nUse case:\n${field("useCase",1500)}`;
 return {subject,body,href:`mailto:${ACCESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
