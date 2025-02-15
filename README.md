///////////////// Server hook Test Script /////////////////////



-----------------connect to server as a new user----------------------

dev_entry.logAs_new(payload).then(async (response) => {
    console.log("response from server ", response);
    await new Promise(resolve => setTimeout(resolve, 5000));
    dev_entry.get_prof().then(response => {
        console.log("response from the server - ", response);
    });
});




----------------connect to server as an old user----------------
dev_entry.logAs_old(payload).then(async (response) => {
    console.log("response from server ", response);
    await new Promise(resolve => setTimeout(resolve, 5000));
    dev_entry.get_prof().then(response => {
        console.log("response from the server - ", response);
    });
});



------------- use connect to server with Temporary session ----------------

dev_entry.logAs_temp().then((response)=>{
    console.log(response);
});













