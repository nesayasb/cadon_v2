import "server-only";
export function accessDeliveryError(value:unknown,status:number){
 const error=value&&typeof value==="object"?value as Record<string,unknown>:{};
 const name=typeof error.name==="string"?error.name:"";
 const detail=typeof error.message==="string"?error.message.toLowerCase().slice(0,4000):"";
 let category="provider_failure",message="The email provider rejected the request. Check the failed POST /emails entry in Resend Logs.";
 if(detail.includes("only send testing emails")){category="test_recipient_restriction";message="Resend is restricting delivery to its account owner. Verify a sender domain in Resend and use that domain in CADON_ACCESS_FROM.";}
 else if(detail.includes("not verified")){category="unverified_sender";message="Resend has not verified the sender domain. Verify the domain used in CADON_ACCESS_FROM in Resend → Domains.";}
 else if(status===401||["restricted_api_key","suspended_api_key","invalid_api_key","missing_api_key","invalid_permission"].includes(name)){category="key_permissions";message="Resend rejected the API key or its permissions. Check RESEND_API_KEY and the key’s sending permissions, then redeploy.";}
 else if(status===429||name.includes("quota")){category="sending_limit";message="Resend’s sending limit has been reached. Check the account’s limits or retry later.";}
 else if(status===422||status===400){category="invalid_sender_or_fields";message="Resend rejected an email field. Check that CADON_ACCESS_FROM is a valid sender address, such as CADON <access@cadon.io>, and inspect Resend Logs.";}
 console.error("cadon_access_delivery_failure",{provider:"resend",category,status});
 return message+" Your request has not been delivered. You can use Send request by email below.";
}
