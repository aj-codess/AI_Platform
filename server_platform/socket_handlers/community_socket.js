import WebSocket from "ws";

const community_socketModel = new WebSocet.Server({noServer:true});

community_socketModel.on("connection",(socket_address,req)=>{

    

    socket_address.on("close",()=>{

        //get track of the user that disconnected

    })

});

export default community_socketModel;