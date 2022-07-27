const Queue = require("../43-8-queues");

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key; //a positive integer serves as an identifier for each node
    this.value = value; //value that we want to store, can be anything
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // Time complexity O(log n), worse case O(n)
  // Space complexity: O(1)
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  // Time complexity O(log n), worse case O(n)
  // Space complexity: O(1)
  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  //Time complexity worst case O(n);
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this.replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }

    return this.left._findMin();
  }

  bfs(values = []) {
    const queue = new Queue(); //initialize our queue
    queue.enqueue(this); //start traversal at the beginning of the tree
    let node = queue.dequeue(); //

    while (node) {
      //process
      values.push(node.value);

      //left
      if (node.left) {
        queue.enqueue(node.left);
      }

      //right
      if (node.right) {
        queue.enqueue(node.right);
      }

      //we are done processing the current node
      //so we move onto the next node
      node = queue.dequeue();
    }

    return values;
  }
}

module.exports = BinarySearchTree;
