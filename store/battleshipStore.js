import { defineStore } from "pinia";

export const useBattleshipStore = defineStore({
  id: "battleship",
  state: () => ({
    playerBoard: null,
    computerBoard: null,
    isComputerSetupComplete: false,
    currentShipSize: 4,
    placedShips: [],
    gameOver: false,
    currentTurn: "player",
    availablePlayerShips: [],
    availableComputerShips: [],
    winner: null,
  }),
  actions: {
    initGame() {
      this.playerBoard = Array(10)
        .fill()
        .map(() => Array(10).fill(null));
      this.computerBoard = Array(10)
        .fill()
        .map(() => Array(10).fill(null));
      this.availablePlayerShips = [
        {
          id: 1,
          size: 4,
          color: "#ff4c4c",
          count: 1,
          orientation: "horizontal",
        },
        {
          id: 2,
          size: 3,
          color: "#6fa3ef",
          count: 2,
          orientation: "horizontal",
        },
        {
          id: 3,
          size: 2,
          color: "#d4a5a5",
          count: 3,
          orientation: "horizontal",
        },
        {
          id: 4,
          size: 1,
          color: "#9fc06f",
          count: 4,
          orientation: "horizontal",
        },
      ];
      this.availableComputerShips = [
        {
          id: 1,
          size: 4,
          color: "#ff4c4c",
          count: 1,
          orientation: "horizontal",
        },
        {
          id: 2,
          size: 3,
          color: "#6fa3ef",
          count: 2,
          orientation: "horizontal",
        },
        {
          id: 3,
          size: 2,
          color: "#d4a5a5",
          count: 3,
          orientation: "horizontal",
        },
        {
          id: 4,
          size: 1,
          color: "#9fc06f",
          count: 4,
          orientation: "horizontal",
        },
      ];
      this.isComputerSetupComplete = false;
      this.gameOver = false;
      this.currentTurn = "player";
      this.winner = null;
      this.currentShipSize = 4;
    },

    placeShip(board, availableShips, row, col, ship) {
      const size = ship.size;
      const orientation = ship.orientation;
      if (this.canPlaceShip(board, row, col, size, orientation)) {
        const placedShip = {
          id: ship.id,
          size,
          orientation,
          color: availableShips.find((s) => s.size === size).color,
        };
        if (orientation === "horizontal") {
          for (let i = 0; i < size; i++) {
            board[row][col + i] = placedShip;
          }
        } else {
          for (let i = 0; i < size; i++) {
            board[row + i][col] = placedShip;
          }
        }
        if (--this.currentShipSize === 0) {
          this.nextShipSize();
        }
        this.decrementShipCount(availableShips, ship);
      }
    },

    canPlaceShip(board, row, col, size, orientation) {
      if (orientation === "horizontal") {
        if (col + size > 10) return false;
        for (let i = 0; i < size; i++) {
          if (board[row][col + i] !== null) return false;
        }
      } else {
        if (row + size > 10) return false;
        for (let i = 0; i < size; i++) {
          if (board[row + i][col] !== null) return false;
        }
      }
      return true;
    },

    nextShipSize() {
      if (this.currentShipSize-- < 1) {
        this.completeSetup();
      }
    },

    completeSetup() {
      this.isComputerSetupComplete = true;
      this.currentShipSize = null;
    },

    placeComputerShips() {
      for (const ship of [...this.availableComputerShips]) {
        while (ship.count > 0) {
          let placed = false;
          while (!placed) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            ship.orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
            if (
              this.canPlaceShip(
                this.computerBoard,
                row,
                col,
                ship.size,
                ship.orientation
              )
            ) {
              this.placeShip(
                this.computerBoard,
                this.availableComputerShips,
                row,
                col,
                ship
              );
              placed = true; // Завершаем размещение корабля
            }
          }
        }
      }
      this.isComputerSetupComplete = true;
    },

    decrementShipCount(availableShips, ship) {
      if (ship && --ship.count === 0) {
          let tmp = availableShips.filter((s) => s.id !== ship.id);
          availableShips.length = 0;
          availableShips.push(...tmp);
      }
    },

    attackComputer(row, col) {
      let hit = false;
      if (this.currentTurn === "player" && !this.gameOver) {
        if (this.computerBoard[row][col]?.status) {
          return;
        } else if (this.computerBoard[row][col]) {
          this.computerBoard[row][col] = {
            ...this.computerBoard[row][col],
            status: "hit",
          };
          hit = true;
        } else {
          this.computerBoard[row][col] = { status: "miss" };
          hit = true;
        }
        this.computerBoard = [...this.computerBoard];
        this.currentTurn = "computer";
        this.attackPlayer();
      }
      if (hit) {
        this.checkForGameOver();
      }
    },

    attackPlayer() {
      if (this.currentTurn === "computer" && !this.gameOver) {
        const { row, col } = this.getRandomComputerAttack();
        if (this.playerBoard[row][col]) {
          this.playerBoard[row][col] = {
            ...this.playerBoard[row][col],
            status: "hit",
          };
        } else {
          this.playerBoard[row][col] = { status: "miss" };
        }
        this.playerBoard = [...this.playerBoard];
        this.currentTurn = "player";
      }
    },

    getRandomComputerAttack() {
      let row, col;
      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.playerBoard[row][col]?.status);
      return { row, col };
    },

    checkForGameOver() {
      const playerShipsSunk = this.playerBoard.every((row) =>
        row.every(
          (cell) =>
            cell === null ||
            cell.status === "miss" ||
            (cell.size && cell.status === "hit")
        )
      );
      const computerShipsSunk = this.computerBoard.every((row) =>
        row.every(
          (cell) =>
            cell === null ||
            cell.status === "miss" ||
            (cell.size && cell.status === "hit")
        )
      );
      if (playerShipsSunk || computerShipsSunk) {
        this.gameOver = true;
        this.winner = playerShipsSunk ? "computer" : "player";
        this.currentTurn = null;
      }
    },
  },
});

// TODO: надо переделать расставление караблей компютера (по возможности: не разрешать ставить корабли в радиусе одного блока от стоячега коробля)
//       разбить на компоненты ContentBattleship.vue
