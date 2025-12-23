import Queue from "./Queue";

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default class Server{
    constructor(capacity, timeTakenBYEachRequest) {
        this.capacity = capacity;
        this.timeTakenBYEachRequest = timeTakenBYEachRequest;
        this.processingStructure = new Set();
        this.waitingArea = new Queue();
        this.completed = new Set();
        this.arrivalTimestamps = [];
        this.maxRPS = 5;
        this.maxQueueSize = 20;


    }

    serverCapacity() {
        return this.capacity;
    }

    isFull() {
        return this.processingStructure.size >= this.capacity;
    }

    async processRequest(request) {
        
       this.processingStructure.add(request);
       request.status = "processing...";
       await sleep(this.timeTakenBYEachRequest);
        this.processingStructure.delete(request);
        this.completed.add({
            id: request.id,
            arrivalTime: request.arrivalTime,
            status: "completed"
        });

        if (!this.waitingArea.isEmpty()) {
            const next = this.waitingArea.dequeue();
            this.processRequest(next);
        }

    }
    addToWaitingArea(request) {
        request.status = "waiting";
        this.waitingArea.enqueue(request);
    }
    
    occupied() {
        return this.processingStructure.size;
    }
    canAcceptRequest() {
        const now = Date.now();
      
        // keep only timestamps in last 1 second
        this.arrivalTimestamps = this.arrivalTimestamps.filter(
          t => now - t < 1000
        );
      
        if (this.arrivalTimestamps.length >= this.maxRPS) {
          return false;
        }
      
        this.arrivalTimestamps.push(now);
        return true;
      }
      isOverloaded() {
        return this.waitingArea.queue.length > this.maxQueueSize;
      }
      getRequests() {
        return {
          queued: [...this.waitingArea.queue],
          processing: Array.from(this.processingStructure),
          completed: this.completed.size
        };
      }
      
      
}