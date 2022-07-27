class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.first) {
      this.last.next = newNode;
    } else {
      this.first = newNode;
    }
    this.last = newNode;
  }

  dequeue() {
    if (this.first) {
      const dequeued = this.first;
      this.first = dequeued.next;
      return dequeued.value;
    }
  }
}

module.exports = Queue;
