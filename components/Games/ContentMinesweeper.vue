<template>
  <page-content-slot>
    <div class="minesweeper">
      <h2>Minesweeper</h2>
      <button @click="restart">Restart</button>
      <div class="board">
        <div
          v-for="(row, rowIndex) in minesweeperStore.board"
          :key="`row-${rowIndex}`"
          class="row"
        >
          <div
            v-for="(cell, colIndex) in row"
            :key="`cell-${colIndex}`"
            :class="[
              'cell',
              {
                revealed: cell.revealed,
                mine: cell.mine && minesweeperStore.gameOver,
                flagged: cell.flagged,
              },
            ]"
            @click="revealCell(rowIndex, colIndex)"
            @contextmenu.prevent="toggleFlag(rowIndex, colIndex)"
          >
            <span v-if="cell.revealed && !cell.mine && cell.adjacentMines">{{
              cell.adjacentMines
            }}</span>
          </div>
        </div>
      </div>
      <p v-if="minesweeperStore.gameOver">
        Game Over! Click Restart to play again.
      </p>
      <div v-if="gameOver" class="modal-overlay">
        <div class="modal-content">
          <h3>Game Over</h3>
          <button @click="restart">Restart</button>
        </div>
      </div>
    </div>
  </page-content-slot>
</template>

<script>
import { useMinesweeperStore } from "@/store/minesweeperStore";

export default {
  setup() {
    const minesweeperStore = useMinesweeperStore();
    minesweeperStore.initGame();
    return { minesweeperStore };
  },
  methods: {
    revealCell(row, col) {
      this.minesweeperStore.revealCell(row, col);
    },
    toggleFlag(row, col) {
      this.minesweeperStore.toggleFlag(row, col);
    },
    restart() {
      this.minesweeperStore.initGame();
    },
  },
  computed: {
    gameOver() {
      return this.minesweeperStore.gameOver;
    },
  },
};
</script>

<style scoped>
.minesweeper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.board {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-gap: 5px;
  margin-top: 20px;
}

.row {
  display: contents;
}

.cell {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  color: #fff;
  border: 1px solid #333;
  cursor: pointer;
  font-size: 1.2em;
}

.cell.revealed {
  background-color: #666;
}

.cell.mine {
  background-color: #f00;
}

.cell.flagged {
  background-color: #ff0;
}
</style>
