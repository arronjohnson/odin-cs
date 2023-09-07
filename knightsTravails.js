class Knight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `[${this.x}, ${this.y}]`;
  }
}

class Board {
  constructor(size) {
    this.size = size;
    this.graph = this.createGraph();
  }

  // generate a two-dimensional array containing each position on the board, and all
  // legal moves that can be made from each position
  createGraph() {
    const graph = new Array(this.size).fill(null).map(() => new Array(this.size).fill([]));
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        graph[i][j] = this.getLegalMoves(i, j);
      }
    }
    return graph;
  }

  // returns all possible moves that can be made from the given position,
  // taking into account the dimensions of the board
  getLegalMoves(x, y) {
    return [
      new Knight(x + 2, y + 1),
      new Knight(x + 2, y - 1),
      new Knight(x - 2, y + 1),
      new Knight(x - 2, y - 1),
      new Knight(x + 1, y + 2),
      new Knight(x - 1, y + 2),
      new Knight(x - 1, y - 2),
      new Knight(x + 1, y - 2),
    ].filter((move) => move.x >= 0 && move.x < this.size && move.y >= 0 && move.y < this.size);
  }

  // accepts two arrays of coordinate pairs, and using BFS, finds the shortest possible set
  // of moves required to move a knight from the starting position to the end position
  knightMoves([startX, startY], [endX, endY]) {
    const visited = new Set();
    const start = new Knight(startX, startY);
    const queue = [{ current: start, path: [start.toString()] }];

    while (queue.length > 0) {
      const { current, path } = queue.shift();

      // halt execution because we reached the destination
      if (current.x === endX && current.y === endY) {
        Board.printPath(path);
        return;
      }

      // queue all potential moves available from the current position
      const moves = this.graph[current.x][current.y];
      moves.forEach((move) => {
        const moveStr = move.toString();

        // skip already visited positions, to avoid redundant computations
        if (!visited.has(moveStr)) {
          visited.add(moveStr);
          queue.push({ current: move, path: [...path, moveStr] });
        }
      });
    }

    // user specified out of bounds co-ordinates
    console.log(`Couldn't find a path from ${start.toString()} to [${endX}, ${endY}]`);
  }

  static printPath(path) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach((coords) => console.log(`  ${coords}`));
  }
}

// testing purposes
const myGraph = new Board(8);
myGraph.knightMoves([0, 0], [3, 3]);
myGraph.knightMoves([3, 3], [4, 3]);
myGraph.knightMoves([0, 0], [7, 7]);
myGraph.knightMoves([0, 0], [8, 8]);
