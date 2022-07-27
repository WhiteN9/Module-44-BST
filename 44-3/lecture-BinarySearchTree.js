class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if the tree is empty or missing the root node,
    // the key is inserted as the root
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      // if the tree exists we want to compare the key
      // if it's smaller than current node's key, insert left
      if (this.left == null) {
        // insert a left tree if node is empty
        this.left = new BinarySearchTree(key, value, this); // this refers to current node
      } else {
        // there is an existing left child
        // recursively call the insert() method so node is added farther down
        this.left.insert(key, value);
      }
    } else {
      // do the same thing but for the right side
      if (this.right == null) {
        // insert a right tree if node is empty
        this.right = new BinarySearchTree(key, value, this); // this refers to current node
      } else {
        // there is an existing right child
        // recursively call the insert() method so node is added farther down
        this.right.insert(key, value);
      }
    }
  }

  // time complexity: O(log(n))
  // space complexity: O(1)
  find(key) {
    if (this.key == key) {
      return this; // if the node is found, return it
    } else if (key < this.key && this.left) {
      return this.left.find(key); // traverse to the left and recusively call find()
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      // searched entire tree and did not find the key
      throw new Error("Key Not Found");
      //   or return null
    }
  }

  remove(key) {
    // remove nodes based on how many children the parent has
    if (this.key == key) {
      if (this.left && this.right) {
        // replace the key and value of the node to be removed
        // search for the successor node
        // MAXIMUM on the left subtree or MINIMUM on the right subtree

        const successor = this.right._findMin(); // _findMin() is a helper to find the smallest node
        // const successor = this.left._findMax();

        // replace the key and value of the node to be removed
        this.key = successor.key;
        this.value = successor.value;

        // remove the duplicate node from the BST
        successor.remove(successor.key); // successor is a leaf node
      } else if (this.left) {
        // the node ONLY has a left child
        this._replaceWith(this.left); // replace current node with its left child _replaceWith() is a helper to do this
      } else if (this.right) {
        // the node ONLY has a right child
        this._replaceWith(this.right);
      } else {
        // if node has no children
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key); // recursively call the remove() function
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      // key does not exist in our tree
      throw new Error("Key Not Found");
    }
  }

  // replace the current node with the node that is passed in
  _replaceWith(node) {
    // check if the node we are replacing has a parent
    // connect references from parent to the replacement node
    if (this.parent) {
      if (this.parent.left == this) {
        // curent node to-be-replaced is on left of parent node
        this.parent.left = node;
      } else if (this.parent.right == this) {
        this.parent.right = node;
      }

      // replace the replacement node's parent reference
      if (node) {
        node.parent = this.parent;
      }
    } else {
      // the node is a root node, we copy over the properties of the replacement node
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        // if "null" was passed in
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    // if the current node has no LEFT child, it is the ABSOLUTE smallest
    if (!this.left) {
      return this;
    }

    // recursively traverse to the left
    return this.left._findMin();
  }

  //   _findMax() {
  //     // if the current node has no RIGHT child, it is the ABSOLUTE largest
  //     if (!this.right) {
  //       return this;
  //     }

  //     // recursively traverse to the right
  //     return this.right._findMin();
  //   }
}

module.exports = BinarySearchTree;
