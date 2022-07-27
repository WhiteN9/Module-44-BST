const BinarySearchTree = require("./44-6-BST");

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

// console.log(bst.getHeight());

/**
 *            5
 *     2                20
 *  1     4         15      21
 *               10    17       25
 *
 */

const bst2 = new BinarySearchTree(5, 5);

bst2.insert(2, 2);
bst2.insert(19, 19);
bst2.insert(15, 15);
bst2.insert(10, 10);
bst2.insert(18, 18);

// Resulting tree:
//     5
//   /   \
//  2     19
//        / 
//       15  
//      /  \
//     10  18

console.log(bst2.countLeaves()) //expect 3

const bst3 = new BinarySearchTree(5, 5);
bst3.insert(2, 2);
bst3.insert(19, 19);
bst3.insert(15, 15);
bst3.insert(28, 28);
bst3.insert(30, 30);
bst3.insert(10, 10);
bst3.insert(18, 18);

// Resulting tree:
//     5
//   /   \
// 2      19
//       /  \
//      15  28
//     /  \   \
//    10  18  30

console.log(bst3.countLeaves()) //expect 4

const bst4 = new BinarySearchTree(5, 5);
bst4.insert(2, 2);
bst4.insert(19, 19);

// Resulting tree:
//     5
//   /   \
//  2     19

console.log(bst4.countLeaves()) //expect 2


