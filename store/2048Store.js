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
      let gameOver = true;

      for (let i = 0; i < 4 && !gameOver; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board[i][j] === 0) {
            gameOver = false;
            break;
          }
        }
      }

      if (gameOver) {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            const tile = this.board[i][j];
            if (i < 3 && tile === this.board[i + 1][j]) gameOver = false;
            if (j < 3 && tile === this.board[i][j + 1]) gameOver = false;
          }
        }
      }
      this.gameOver = gameOver;
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

    moveUp() {
      let moved = false;
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(this.board[row][col]);
        }
        const result = this.slideAndMerge(column);
        if (result) moved = true;
        for (let row = 0; row < 4; row++) {
          this.board[row][col] = column[row];
        }
      }
      return moved;
    },

    moveDown() {
      let moved = false;
      for (let col = 0; col < 4; col++) {
        const column = [];
        for (let row = 0; row < 4; row++) {
          column.push(this.board[row][col]);
        }

        column.reverse();
        const result = this.slideAndMerge(column);
        if (result) moved = true;

        column.reverse();
        for (let row = 0; row < 4; row++) {
          this.board[row][col] = column[row];
        }
      }
      return moved;
    },

    moveLeft() {
      let moved = false;
      for (let row = 0; row < 4; row++) {
        const rowData = this.board[row];
        const result = this.slideAndMerge(rowData);
        if (result) moved = true;

        this.board[row] = rowData;
      }
      return moved;
    },

    moveRight() {
      let moved = false;
      for (let row = 0; row < 4; row++) {
        const rowData = this.board[row];
        rowData.reverse();
        const result = this.slideAndMerge(rowData);
        if (result) moved = true;

        rowData.reverse();
        this.board[row] = rowData;
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
