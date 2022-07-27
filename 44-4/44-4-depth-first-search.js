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
    //If the key is null, there is no node and the tree is empty.
    //We insert a node into the tree as root node.
    if (this.key == null) {
      this.key = key;
      this.value = value;
      //Else if the tree exists, and the key we want to insert is less than the existing current node's key, we insert to the left.
    } else if (key < this.key) {
      //If the left node is empty, we insert a left tree.
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this); // `this` refers to the current node
      }
      //Else, there is an existing left child, then
      //We recursively call the insert() method so the node is added further down
      else {
        this.left.insert(key, value);
      }
    }
    //We do the same thing for the right side, if the key we want to insert is more than the existing current node's key.
    else {
      //If the right node is empty, we insert a right tree.
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this); // `this` refers to the current node
      }
      //Else, there is an existing right child, then
      //We cursively call the insert() method so the node is added further down
      else {
        this.right.insert(key, value);
      }
    }
  }

  // Time complexity O(log n), worse case O(n)
  // Space complexity: O(1)
  find(key) {
    // If the key is found at the root, the return that value.
    if (this.key == key) {
      //   console.log(this);
      return this.value; // return null if we did not set any value, we can console.log(this) to print out the node
    } else if (key < this.key && this.left) {
      /* If the item that you are looking for is less than the root, then follow the left child.
      If there is an existing left child,
      then recursively check its left and/or right child until you find the item. 
      */
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      /* If the item that you are looking for is more than the root, then the follow right child.
      If there is an existing right child,
      then recursively check its left and/or right child until you find the item.
      */
      return this.right.find(key);
    }
    // You have searched the tree and the item isn't in the tree
    else {
      throw new Error("Key Not Found");
    }
  }

  //Time complexity worst case O(n);
  remove(key) {
    // If we found the node's key to be removed.
    // Remove nodes based on how many children the parent has
    if (this.key == key) {
      //If the node has 2 children
      if (this.left && this.right) {
        // Replace the key and value of the node to be removed.
        // Search for the successor node.
        // MAXIMUM on the left subtree or MINIMUM on the right subtree.

        // _findMin() is a helper to find the smallest node but still greater than the targeted node.
        // We go to the right one time, and find the ABSOLUTE minimum node by recursively going left after.
        const successor = this.right._findMin();
        // We can use a _findMax() when we try to replace a node with a lesser value.
        // const successor = this.left._findMax();

        // Replace the key and value of the node to be removed.
        this.key = successor.key;
        this.value = successor.value;

        // Remove the old (duplicate) node from the BST
        successor.remove(successor.key); // Successor is a leaf node, so it will get instantly removed.
      }
      // Else if, the node only has a left child, then you replace the node with its left child.
      else if (this.left) {
        // Replace current node with its left child
        this._replaceWith(this.left);
      }
      // Else if, the node only has a right child, then you place it with its right child.
      else if (this.right) {
        // Replace current node with its right child
        this._replaceWith(this.right);
      }
      // Else if, node has no children
      else {
        this.replaceWith(null);
      }
    }
    // Else if, we have not found the node with that key., we keep traversing down left/right recursively to find it
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    // Else if, the node with that key does not exist, throw an Error.
    else {
      throw new Error("Key Not Found");
    }
  }

  // Replace the current node with the node that is passed in
  _replaceWith(node) {
    // Check if the node we are placing has a parent
    // Connect the references from the parent to the replacement node
    if (this.parent) {
      // If the current node to-be-replaced is on the left of parent node
      if (this == this.parent.left) {
        // We point the parent node's left to the passed in replacement node.
        //Cutting ties with the current node
        this.parent.left = node;
      }
      // If the current node to-be-replaced is on the right of parent node
      else if (this == this.parent.right) {
        // We point the parent node's right to the passed in replacement node.
        this.parent.right = node;
      }

      //Then, we replace the replacement node's parent reference
      if (node) {
        node.parent = this.parent;
      }
    }
    // Else if, the current node is a root node, we copy over the properties of the replacement node.
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      // If "null" was passed in.
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    //If the current node has no left child node, it is the ABSOLUTE smallest
    if (!this.left) {
      return this;
    }
    // recursively traverse to the left

    return this.left._findMin();
  }

  _findMax() {
    //If the current node has no right child node, it is the ABSOLUTE largest
    if (!this.right) {
      return this;
    }
    // recursively traverse to the right
    return this.right.findMax();
  }

  dfsPreOrder(values = []) {
    //process
    values.push(this.value);

    //step left
    if (this.left) {
      this.left.dfsPreOrder(values);
    }

    //step right
    if (this.right) {
      this.right.dfsPreOrder(values);
    }

    return values;
  }

  dfsInOrder(values = []) {
    //step left - process left recursively
    if (this.left) {
      this.left.dfsInOrder(values);
    }
    //if there is no more left node,
    //process the node
    values.push(this.value);

    //step right - process right recursively
    if (this.right) {
      this.right.dfsInOrder(values);
    }

    return values;
  }

  dfsPostOrder(values = []) {
    //step left - process left recursively
    if (this.left) {
      this.left.dfsPostOrder(values);
    }

    //step right - process right recursively
    if (this.right) {
      this.right.dfsPostOrder(values);
    }

    //if there is no more left node,
    //process the node
    values.push(this.value);

    return values;
  }
}

module.exports = BinarySearchTree;
