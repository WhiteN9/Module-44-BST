const Queue = require("./44-6-Queues");
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else if (key > this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Not Found");
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key); // how does this not remove the parent now if they are now identical
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else throw new Error("Key Not Found");
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      this.left.dfsPreOrder(values);
    }
    if (this.right) {
      this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsInOrder(values = []) {
    if (this.left) {
      this.left.dfsPreOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      this.left.dfsPreOrder(values);
    }
    if (this.right) {
      this.right.dfsPreOrder(values);
    }
    values.push(this.value);
    return values;
  }

  bfs(values = []) {
    const queue = new Queue();
    queue.enqueue(this);
    let node = queue.dequeue();
    while (node) {
      values.push(node.value);

      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
      node = queue.dequeue();
    }
    return values;
  }

  /**
   *If there is a root node, and there two children nodes
   *Traverse the tree to the left as far as possible
   *Return height+1 each time you go down

   *If there is a root node, and there is left child node
   *Go to the left child node, and recursively call the function again on that left child node
   *Return height+1 each time you go down

   *If there is a root node, and there is right child node
   *Go to the right child node, and recursively call the function again on that right child node
   *Return height+1 each time you go down

   *If there is no root node, return height
   *
   */
  //The solution logic is to recurse by:
  //Recurse if left doesn't exists, but right might
  //Recurse if right doesn't exist, but left might
  //Recurse if both exist
  getHeight(currentHeight = 0) {
    // BASE CASE:
    // If the current node doesn't have a left or right child,
    // then the base case is reached, and the function can return the height.
    if (!this.left && !this.right) return currentHeight;

    // RECURSIVE CASE:
    // Otherwise, compute the new height.
    const newHeight = currentHeight + 1;

    // If there's no left child, recurse down the right subtree only,
    // passing down the height of the current node.
    if (!this.left) return this.right.getHeight(newHeight);

    // If there's no right child, recurse down the left subtree only,
    // passing down the height of the current node.
    if (!this.right) return this.left.getHeight(newHeight);

    // If both children exist, recurse down both subtrees,
    // passing down the height of the current node.
    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);

    // Return the greater of the left or right subtree heights.
    return Math.max(leftHeight, rightHeight);
  }

  //Must only have 2 children maximum per node
  //Must have distinct key
  //The left child key must be smaller than the parent node key
  //The right child key must be greater than the parent node key
  isBST() {
    const values = this.dfsInOrder();

    for (let i = 1; i < values.length; i++) {
      if (values[i] < values[i - 1]) {
        return false;
      }
    }

    return true;
  }

  findKthLargestValue(k) {
    // Use the existing `dfsInOrder()` method to traverse the tree.
    const values = this.dfsInOrder();
    const kthIndex = values.length - k;

    // Ensure that the index is within the bounds of the array.
    if (kthIndex >= 0) {
      return values[kthIndex];
    } else {
      console.error("k value exceeds the size of the BST.");
    }
  }

  countLeaves(count = 0) {
    //base case
    //if the current node doesn't have left or right child,
    //return the leaf count
    if (!this.left && !this.right) {
      return count + 1;
    }

    //recursive case
    if (this.left && this.right) {
      const leftCount = this.left.countLeaves(count);
      const rightCount = this.right.countLeaves(count);
      return leftCount + rightCount;
    }
    //go down the left subtree and check again with recursion
    //
    if (this.left) {
      return this.left.countLeaves(count);
    }
    //go down the right subtree and check again with recursion
    //return a count
    if (this.right) {
      return this.right.countLeaves(count);
    }
  }

  // countLeaves(count = 0) {
  //     if (!this.left && !this.right) return count + 1;

  //     if (!this.left) return this.right.countLeaves(count)
  //     if (!this.right) return this.left.countLeaves(count)

  //     const leftCount = this.left.countLeaves(count)
  //     const rightCount = this.right.countLeaves(count)

  //     return leftCount + rightCount
  //   }

  isBalancedBST(height = 0) {
    //base case
    //if the current node doesn't have left or right child,
    //return the last level count
    if (!this.left && !this.right) {
      return height;
    }

    //recursive case
    const newHeight = height + 1;

    if (!this.left) return this.right.getHeight(newHeight);

    if (!this.right) return this.left.getHeight(newHeight);

    const leftHeight = this.left.getHeight(newHeight);
    const rightHeight = this.right.getHeight(newHeight);

    const heightDiff =
      Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight);
    return heightDiff > 1 ? -1 : Math.max(leftHeight, rightHeight);
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
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
}

module.exports = BinarySearchTree;
