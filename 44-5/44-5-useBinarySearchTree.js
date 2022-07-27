const BinarySearchTree = require("./44-5-breadth-first-search");
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

console.log(bst.bfs());
// [null, 2, 20, 1, 4, 15, 21, 10, 17, 25];
