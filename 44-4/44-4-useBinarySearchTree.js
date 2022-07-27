const BinarySearchTree = require("./44-4-depth-first-search");
const bst = new BinarySearchTree(5);

bst.insert(2, 2);
bst.insert(20, 20);
bst.insert(1, 1);
bst.insert(4, 4);
bst.insert(15, 15);
bst.insert(21, 21);
bst.insert(10, 10);
bst.insert(17, 17);
bst.insert(25, 25);

console.log(bst.dfsPreOrder()); //process in the order they were added
console.log(bst.dfsInOrder()); //process in the order of their key
console.log(bst.dfsPostOrder()); //process in the order of from-children-to-parent
