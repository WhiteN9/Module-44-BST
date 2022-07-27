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
      //get the current last node to point to the last node
      this.last.next = newNode;
    } else {
      // Set the node of the queue's next pointer to be the new node
      this.first = newNode;
    }
    // Make the new node the new last node in the queue
    this.last = newNode;
  }

  dequeue() {
    if (this.first) {
      const dequeued = this.first;

      //Update first pointer to point to the next node of the dequeued node
      this.first = dequeued.next;

      //If the dequeued node is the last node in the queue,
      //update the last pointer to point to `null`
      // if (dequeued === this.last) {
      //   this.last = null;
      // }

      return dequeued.value;
    }
  }
}

module.exports = Queue;
