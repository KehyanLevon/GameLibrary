<template>
  <page-content-slot>
    <div v-if="!isGameStarted" class="battleship-setup">
      <h2>Battleship Setup</h2>

      <button
        v-if="isSetupComplete"
        @click="startGame"
        class="start-btn-circle"
      >
        <span class="icon">&#9658;</span>
      </button>

      <div class="board">
        <div
          class="row"
          v-for="(row, rowIndex) in playerBoard"
          :key="'player-row-' + rowIndex"
        >
          <div
            class="cell"
            v-for="(cell, colIndex) in row"
            :key="'player-cell-' + colIndex"
            @dragover.prevent
            @drop="handleDrop(rowIndex, colIndex)"
          >
            <div
              v-if="cell"
              :style="{ backgroundColor: cell.color }"
              class="ship-in-cell"
              draggable="true"
              @dragstart="handleShipDragStart(cell, rowIndex, colIndex)"
            ></div>
          </div>
        </div>
      </div>

      <div class="available-ships">
        <div
          v-for="(ship, index) in availablePlayerShips"
          :key="ship.id"
          class="ship"
        >
          <div
            draggable="true"
            @dragstart="handleDragStart(ship)"
            :style="{
              display: ship.orientation === 'horizontal' ? 'flex' : 'block',
            }"
          >
            <div
              v-for="i in ship.size"
              :key="i"
              :style="{ backgroundColor: ship.color }"
              class="ship-part"
            ></div>
          </div>
          <span class="ship-count">{{ ship.count }}</span>
          <button
            v-if="ship.size > 1"
            class="reverse-btn"
            @click="reverseOrientation(ship)"
          >
            <span>&#8635;</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="game-boards">
      <h2>Game Started!</h2>
      <div class="boards-container">
        <div class="board player-board">
          <h3>Your Board</h3>
          <div
            class="row"
            v-for="(row, rowIndex) in playerBoard"
            :key="'player-game-row-' + rowIndex"
          >
            <div
              class="cell"
              v-for="(cell, colIndex) in row"
              :key="'player-game-cell-' + colIndex"
              :style="{
                backgroundColor:
                  cell && cell.status != 'miss' ? cell.color : '#1e1e1e',
              }"
            >
              <span v-if="cell?.status === 'hit'" class="hit-icon">✕</span>
              <span v-if="cell?.status === 'miss'" class="miss-icon">○</span>
            </div>
          </div>
        </div>

        <div class="board computer-board">
          <h3>Computer's Board</h3>
          <div
            class="row"
            v-for="(row, rowIndex) in computerBoard"
            :key="'computer-row-' + rowIndex"
          >
            <div
              class="cell"
              v-for="(cell, colIndex) in row"
              :key="'computer-cell-' + colIndex"
              :style="{
                backgroundColor:
                  cell && cell.status != 'miss' ? cell.color : '#1e1e1e',
              }"
              @click="handleAttack(rowIndex, colIndex)"
            >
              <span v-if="cell?.status === 'hit'" class="hit-icon">✕</span>
              <span v-if="cell?.status === 'miss'" class="miss-icon">○</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="gameOver" class="modal-overlay">
        <div class="modal-content">
          <h3 v-if="winner === 'computer'">Game Over</h3>
          <h3 v-else>You Win</h3>
          <button @click="restart">Restart</button>
        </div>
      </div>
    </div>
  </page-content-slot>
</template>

<script>
import { useBattleshipStore } from "@/store/battleshipStore";

export default {
  data() {
    return {
      currentShip: null,
      currentShipOrientation: "horizontal",
      originalPosition: null,
      isGameStarted: false,
      currentTurn: "player",
    };
  },
  computed: {
    playerBoard() {
      return this.battleshipStore.playerBoard;
    },
    computerBoard() {
      return this.battleshipStore.computerBoard;
    },
    availablePlayerShips() {
      return this.battleshipStore.availablePlayerShips;
    },
    isSetupComplete() {
      return !this.battleshipStore.availablePlayerShips.length;
    },
    gameOver() {
      return this.battleshipStore.gameOver;
    },
    winner() {
      return this.battleshipStore.winner;
    },
  },
  methods: {
    handleDragStart(ship) {
      this.currentShip = ship;
      this.currentShipOrientation = ship.orientation;
    },

    handleShipDragStart(ship, row, col) {
      this.originalPosition = { row, col };
      this.currentShip = ship;
    },

    handleDrop(row, col) {
      if (this.currentShip && this.currentShip.count > 0) {
        this.battleshipStore.placeShip(
          this.battleshipStore.playerBoard,
          this.battleshipStore.availablePlayerShips,
          row,
          col,
          this.currentShip
        );
      }
    },

    reverseOrientation(ship) {
      ship.orientation =
        ship.orientation === "horizontal" ? "vertical" : "horizontal";
      this.currentShipOrientation = ship.orientation;
    },

    startGame() {
      this.battleshipStore.placeComputerShips();
      this.isGameStarted = true;
    },
    handleAttack(row, col) {
      if (this.currentTurn !== "player" || this.battleshipStore.gameOver)
        return;
      this.battleshipStore.attackComputer(row, col);
    },
    restart() {
      this.battleshipStore.initGame();
      this.isGameStarted = false;
    },
  },
  mounted() {
    this.battleshipStore.initGame();
  },
  setup() {
    const battleshipStore = useBattleshipStore();
    return { battleshipStore };
  },
};
</script>

<style scoped>
.battleship-setup {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.board {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.row {
  display: flex;
}

.cell {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  background-color: #1e1e1e;
  font-size: 1.2em;
  color: #fff;
}

.cell.ship {
  background-color: #6fa3ef;
}

.ship-in-cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.available-ships {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.ship {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
}

.ship-part {
  width: 40px;
  height: 40px;
  border: 1px solid #fff;
}

.ship-count {
  margin-top: 5px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
}

.reverse-btn {
  margin-top: 5px;
  background-color: #56595f;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reverse-btn:hover {
  background-color: #5c92d1;
}
.start-btn-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4caf50;
  color: #fff;
  font-size: 24px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.start-btn-circle:hover {
  background-color: #45a049;
}

.boards-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.player-board,
.computer-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
