const BinarySearchTree = require("./44-3-BinarySearchTree");

const bst = new BinarySearchTree(5);
// console.log(bst);

bst.insert(2);
bst.insert(19);
bst.insert(15);
bst.insert(28);
bst.insert(18);

// console.log(bst.right);

// console.log(bst.right.left.right);

console.log(bst.find(18));
