export default class Queue{
    constructor() {
        this.queue = [];
        this.set = new Set();
        this.count = 0;
    }

    enqueue(request) {
        this.queue.push(request);
        this.set.add(request.id);
    }

    contains(request) {
        return this.set.has(request.id);
    }

    dequeue() {
        if (this.isEmpty()) return null;

        const req = this.queue.shift();
        this.set.delete(req.id);
        return req;
    }

    peek() {
        if (this.isEmpty) return null;
        return this.queue[0];
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}