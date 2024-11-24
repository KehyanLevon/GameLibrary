import { defineStore } from "pinia";

export const useGameStore = defineStore("game2048", {
  state: () => ({
    board: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    score: 0,
    gameOver: false,
  }),

  actions: {
    initGame() {
      this.board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      this.score = 0;
      this.gameOver = false;
      this.addRandomTile();
      this.addRandomTile();
    },

    addRandomTile() {
      const emptyCells = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board[i][j] === 0) {
            emptyCells.push({ row: i, col: j });
          }
        }
      }

      if (emptyCells.length === 0) return;

      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4;
      this.board[randomCell.row][randomCell.col] = newValue;
    },

    checkGameOver() {
      let tmpBoard = JSON.parse(JSON.stringify(this.board));
      let hasZero = tmpBoard.some(row => row.some(cell => cell === 0));
      if(!hasZero && !this.moveDown(tmpBoard) && !this.moveLeft(tmpBoard)) {
        this.gameOver = true;
        return;
      }
      this.gameOver = false;
    },

    move(direction) {
      let moved = false;

      switch (direction) {
        case "up":
          moved = this.moveUp();
          break;
        case "down":
          moved = this.moveDown();
          break;
        case "left":
          moved = this.moveLeft();
          break;
        case "right":
          moved = this.moveRight();
          break;
      }

      if (moved) {
        this.addRandomTile();
        this.checkGameOver();
        this.board = [...this.board];
      }
    },

    moveUp(board = this.board) {
      let moved = false;
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(board[row][col]);
        }
        const result = this.slideAndMerge(column);
        if (result) moved = true;
        for (let row = 0; row < 4; row++) {
          board[row][col] = column[row];
        }
      }
      return moved;
    },

    moveDown(board = this.board) {
      let moved = false;
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(board[row][col]);
        }

        column.reverse();
        const result = this.slideAndMerge(column);
        if (result) moved = true;

        column.reverse();
        for (let row = 0; row < 4; row++) {
          board[row][col] = column[row];
        }
      }
      return moved;
    },

    moveLeft(board = this.board) {
      let moved = false;
      for (let row = 0; row < 4; row++) {
        const rowData = board[row];
        const result = this.slideAndMerge(rowData);
        if (result) moved = true;

        board[row] = rowData;
      }
      return moved;
    },

    moveRight(board = this.board) {
      let moved = false;
      for (let row = 0; row < 4; row++) {
        const rowData = board[row];
        rowData.reverse();
        const result = this.slideAndMerge(rowData);
        if (result) moved = true;

        rowData.reverse();
        board[row] = rowData;
      }
      return moved;
    },

    slideAndMerge(arr) {
      //Note: this function is working from right to left direction
      //merge
      let original = [...arr];
      for (let i = 0; i < 4; ++i) {
        if (arr[i]) {
          for (let j = i + 1; j < 4; ++j) {
            if (arr[j] == 0) {
              continue;
            } else if (arr[i] != arr[j]) {
              break;
            } else {
              arr[j] = 0;
              arr[i] *= 2;
              this.score += arr[i];
              i = j;
              break;
            }
          }
        }
      }
      //slide
      for (let i = 0; i < 4; ++i) {
        if (!arr[i]) {
          for (let j = i + 1; j < 4; ++j) {
            if (arr[j]) {
              arr[i] = arr[j];
              arr[j] = 0;
              break;
            }
          }
        }
      }
      if (original.toString() == arr.toString()) {
        return false;
      }
      return true;
    },
  },
});
