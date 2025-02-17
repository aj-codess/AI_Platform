///////////////// Server hook Test Script /////////////////////



-----------------connect to server as a new user----------------------

dev_entry.logAs_new(payload).then((response)=>{
    console.log("login Response :",response);
}).catch((error)=>{
    console.error("error: ",error);
})




