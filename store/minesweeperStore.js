import { defineStore } from 'pinia';

export const useMinesweeperStore = defineStore('minesweeper', {
  state: () => ({
    board: [],
    rows: 10,
    cols: 10,
    minesCount: 10,
    gameOver: false,
    flaggedCells: 0,
    firstClick: true,
  }),
  actions: {
    initGame() {
      this.gameOver = false;
      this.flaggedCells = 0;
      this.firstClick = true;
      this.board = Array.from({ length: this.rows }, () =>
        Array.from({ length: this.cols }, () => ({
          mine: false,
          revealed: false,
          flagged: false,
          adjacentMines: 0,
        }))
      );
    },
    generateBoard(rows, cols, minesCount, excludeRow, excludeCol) {
      const board = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          mine: false,
          revealed: false,
          flagged: false,
          adjacentMines: 0,
        }))
      );
      let minesPlaced = 0;
      while (minesPlaced < minesCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (
          Math.abs(row - excludeRow) <= 1 &&
          Math.abs(col - excludeCol) <= 1
        ) {
          continue;
        }

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
          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newCol >= 0 &&
            newCol < this.cols &&
            !board[newRow][newCol].mine
          ) {
            board[newRow][newCol].adjacentMines++;
          }
        }
      }
    },
    revealCell(row, col) {
      if (this.gameOver) return;
      if (this.firstClick) {
        this.board = this.generateBoard(
          this.rows,
          this.cols,
          this.minesCount,
          row,
          col
        );
        this.firstClick = false;
        this.revealAdjacentCells(row, col);
        return;
      }

      const cell = this.board[row][col];
      if (cell.revealed || cell.flagged) return;

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
          if (
            newRow >= 0 &&
            newRow < this.rows &&
            newCol >= 0 &&
            newCol < this.cols
          ) {
            const cell = this.board[newRow][newCol];
            if (!cell.revealed && !cell.mine) {
              this.revealCell(newRow, newCol);
            }
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
