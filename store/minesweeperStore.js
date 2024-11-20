// store/minesweeperStore.js
import { defineStore } from 'pinia';

export const useMinesweeperStore = defineStore('minesweeper', {
  state: () => ({
    board: [],
    rows: 10,
    cols: 10,
    minesCount: 10,
    gameOver: false,
    flaggedCells: 0,
  }),
  actions: {
    initGame() {
      this.gameOver = false;
      this.flaggedCells = 0;
      this.board = this.generateBoard(this.rows, this.cols, this.minesCount);
    },
    generateBoard(rows, cols, minesCount) {
      const board = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => ({ mine: false, revealed: false, flagged: false, adjacentMines: 0 }))
      );

      let minesPlaced = 0;
      while (minesPlaced < minesCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].mine) {
          board[row][col].mine = true;
          minesPlaced++;
          this.updateAdjacentCells(board, row, col);
        }
      }
      return board;
    },
    updateAdjacentCells(board, row, col) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && !board[newRow][newCol].mine) {
            board[newRow][newCol].adjacentMines++;
          }
        }
      }
    },
    revealCell(row, col) {
      const cell = this.board[row][col];
      if (cell.revealed || cell.flagged || this.gameOver) return;

      cell.revealed = true;
      if (cell.mine) {
        this.gameOver = true;
      } else if (cell.adjacentMines === 0) {
        this.revealAdjacentCells(row, col);
      }
    },
    revealAdjacentCells(row, col) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
            this.revealCell(newRow, newCol);
          }
        }
      }
    },
    toggleFlag(row, col) {
      const cell = this.board[row][col];
      if (!cell.revealed) {
        cell.flagged = !cell.flagged;
        this.flaggedCells += cell.flagged ? 1 : -1;
      }
    },
  },
});
