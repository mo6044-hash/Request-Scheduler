import Server from "./utils/Server";
import { useRef } from 'react';

let count = 0;
function RequestGenerator() {
    const serverRef = useRef(null);
    if (!serverRef.current) {
        serverRef.current = new Server(10, 6000);
    }
    const server = serverRef.current;

    function createRequest(){
       const request = {
        id: count++,
        arrivalTime: new Date(),
        status: "new"
       };
       serveRequest(request);    
    }

    async function serveRequest(request) { 
        if (!server.canAcceptRequest()) {
            request.status = "rejected (rate limit)";
            return;
          }
          
        if (!server.isFull()) {
            server.processRequest(request);
        } else {
            server.addToWaitingArea(request);
        }
    }

    return(<>
        <button onClick={createRequest}>Generate Request</button>
            </>);
}
export default RequestGenerator;