class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(arr) {
    // to balance, sort ascending and remove duplicates before constructing the tree
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    // obtain the middle value and split the rest of the array into two halves
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle + 1);

    // construct subtrees from the two halves
    const node = new Node(arr[middle]);
    node.left = this.buildTree(left);
    node.right = this.buildTree(right);
    return node;
  }

  #insertRecursive(value, node) {
    if (!node) return new Node(value);

    if (value < node.value) {
      node.left = this.#insertRecursive(value, node.left);
    } else if (value > node.value) {
      node.right = this.#insertRecursive(value, node.right);
    }
    return node;
  }

  insert(value) {
    // updating root itself allows insertion on empty trees
    this.root = this.#insertRecursive(value, this.root);
  }

  delete(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else {
      // Case 1: one or no children, so replace node with the child or null
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 2: both children, so find the minimum value in the right subtree (successor node)
      let minimum = node.right;
      while (minimum.left) {
        minimum = minimum.left;
      }
      node.value = minimum.value; // copy the successor value to the original node
      node.right = this.delete(minimum.value, node.right); // delete the successor node
    }
    return node;
  }

  // returns the node with the given value, if present in the tree
  find(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      return this.find(value, node.left);
    }
    if (value > node.value) {
      return this.find(value, node.right);
    }
    return node;
  }

  // traverses the tree in the given order, and runs the given callback function for each node
  // absent a callback function, returns an array of nodes in the given order
  #traverse(order, callbackFn, node) {
    const result = [];
    if (!node) return result;

    if (typeof callbackFn !== 'function') {
      callbackFn = (currentNode) => result.push(currentNode.value);
    }

    // root -> depth 1 -> depth 2 ...
    if (order === 'levelOrder') {
      const queue = [node];
      while (queue.length > 0) {
        const current = queue.shift();
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
        callbackFn(current);
      }
      return result;
    }

    if (order === 'preorder') callbackFn(node); // node -> left -> right
    this.#traverse(order, callbackFn, node.left);
    if (order === 'inorder') callbackFn(node); // left -> node -> right
    this.#traverse(order, callbackFn, node.right);
    if (order === 'postorder') callbackFn(node); // left -> right -> node

    return result;
  }

  levelOrder(callbackFn) {
    return this.#traverse('levelOrder', callbackFn, this.root);
  }

  inorder(callbackFn) {
    return this.#traverse('inorder', callbackFn, this.root);
  }

  preorder(callbackFn) {
    return this.#traverse('preorder', callbackFn, this.root);
  }

  postorder(callbackFn) {
    return this.#traverse('postorder', callbackFn, this.root);
  }

  // returns the height of the given node, or the entire tree
  height(node = this.root) {
    if (!node) return -1;

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  // returns the depth of the given node, or the root
  depth(node = this.root, current = this.root, depth = 0) {
    if (!node) return -1;

    if (node.value < current.value) {
      return this.depth(node, current.left, ++depth);
    }
    if (node.value > current.value) {
      return this.depth(node, current.right, ++depth);
    }
    return depth;
  }

  isBalanced(node = this.root) {
    if (!node) return true; // empty nodes are inherently balanced

    // compare the height of the left and right subtrees, balanced values are -1, 0, and 1
    const validFactor = Math.abs(this.height(node.left) - this.height(node.right)) <= 1;
    return validFactor && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());
  }

  // convert the tree into a human readable format, using symbols to denote branches
  #prettify(node, prefix = '', isLeft = true, msg = '') {
    if (!node) return 'This tree is empty.';

    if (node.right) {
      msg += this.#prettify(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    msg += `${prefix}${isLeft ? '└── ' : '┌── '}${node.value}\n`;
    if (node.left) {
      msg += this.#prettify(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
    return msg;
  }

  toString() {
    return this.#prettify(this.root);
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomNumbers(amount = getRandomInteger(5, 10), min = 0, max = 100) {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(getRandomInteger(min, max));
  }
  return arr;
}

function test() {
  const myTree = new BinarySearchTree(generateRandomNumbers());
  console.log(myTree.toString());
  console.log('Balanced? ', myTree.isBalanced());
  console.log(`Level order: ${myTree.levelOrder().join(', ')}`);
  console.log(`Preorder: ${myTree.preorder().join(', ')}`);
  console.log(`Postorder: ${myTree.postorder().join(', ')}`);
  console.log(`Inorder: ${myTree.inorder().join(', ')}`);

  const newValues = generateRandomNumbers(3, 101, 200);
  newValues.forEach((value) => myTree.insert(value));
  console.log(`\n\n\nAttempting to unbalance tree, adding ${newValues.join(', ')}...\n`);
  console.log(myTree.toString());
  console.log('Balanced? ', myTree.isBalanced());

  myTree.rebalance();
  console.log('\n\n\nAttempting to rebalance...\n');
  console.log(myTree.toString());
  console.log('Balanced? ', myTree.isBalanced());
  console.log(`Level order: ${myTree.levelOrder().join(', ')}`);
  console.log(`Preorder: ${myTree.preorder().join(', ')}`);
  console.log(`Postorder: ${myTree.postorder().join(', ')}`);
  console.log(`Inorder: ${myTree.inorder().join(', ')}`);
}

test();
