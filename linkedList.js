class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  initialise(node) {
    this.head = node;
    this.tail = node;
    this.size = 1;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.initialise(node);
      return;
    }

    this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.initialise(node);
      return;
    }

    node.next = this.head;
    this.head = node;
    this.size++;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index >= this.size) {
      this.append(value);
      return;
    }

    const node = new Node(value);
    const before = this.at(index - 1); // find the node at index - 1
    node.next = before.next; // point to the current node at index
    before.next = node; // update the node at index - 1
    this.size++;
  }

  removeAt(index) {
    if (index > this.size - 1) return; // invalid index provided

    // same as removing the last element
    if (index === this.size - 1) {
      this.pop();
      return;
    }

    // same as removing the first element
    if (index === 0) {
      if (this.size === 1) {
        this.clear(); // list only has a single node, so reset both head and tail
      } else {
        this.shift();
      }
      return;
    }

    // find the node to delete, and point the node before it to the node after it
    const before = this.at(index - 1);
    const current = before.next;
    before.next = current.next;
    this.size--;
  }

  at(index) {
    let current = this.head;
    let currentIndex = 0;
    while (current && currentIndex < index) {
      current = current.next;
      currentIndex++;
    }
    return current;
  }

  shift() {
    if (this.isEmpty()) return;

    if (this.size === 1) {
      this.clear(); // list will be empty so reset head and tail
      return;
    }

    this.head = this.head.next;
    this.size--;
  }

  pop() {
    if (this.isEmpty()) return;

    if (this.size === 1) {
      this.clear(); // list will be empty so reset head and tail
      return;
    }

    // find the penultimate element, point it to null, and point the tail to it
    const before = this.at(this.size - 2);
    before.next = null;
    this.tail = before;
    this.size--;
  }

  contains(value) {
    return this.find(value) !== null;
  }

  find(value) {
    let current = this.head;
    let currentIndex = 0;
    while (current) {
      if (current.value === value) {
        return currentIndex;
      }
      current = current.next;
      currentIndex++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let output = '';
    while (current) {
      output += `( ${current.value} ) -> `;
      current = current.next;
    }
    output += '( null )';
    return output;
  }
}

// testing purposes
const myList = new LinkedList();
[1, 2, 3, 4].forEach((i) => myList.append(i));
myList.prepend(0);
myList.insertAt(999, 1);
myList.removeAt(2);
myList.pop();
myList.shift();

console.log(myList.toString());
console.table({
  size: myList.size,
  head: myList.head?.value,
  tail: myList.tail?.value,
  'contains 1': myList.contains(1),
  'contains 2': myList.contains(2),
  'index of 3': myList.find(3),
});
