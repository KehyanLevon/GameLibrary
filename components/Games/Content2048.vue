<template>
  <page-content-slot>
    <div class="game-container">
      <h2>2048 Game</h2>

      <div class="game-board">
        <div
          class="game-row"
          v-for="(row, rowIndex) in board"
          :key="'row-' + rowIndex"
        >
          <div
            class="game-cell"
            v-for="(cell, colIndex) in row"
            :key="'cell-' + colIndex"
            :class="`cell-${cell}`"
          >
            {{ cell !== 0 ? cell : "" }}
          </div>
        </div>
      </div>

      <!-- Счет -->
      <div class="score">
        <h4>Score: {{ score }}</h4>
      </div>

      <!-- Управление -->
      <div class="controls">
        <button @click="move('up')">W</button>
        <div class="row-controls">
          <button @click="move('left')">A</button>
          <button @click="move('down')">S</button>
          <button @click="move('right')">D</button>
        </div>
      </div>

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
import { useGameStore } from "@/store/2048Store";

export default {
  data() {
    return {
      gameStore: useGameStore(),
    };
  },
  computed: {
    board() {
      return this.gameStore.board;
    },
    score() {
      return this.gameStore.score;
    },
    gameOver() {
      return this.gameStore.gameOver;
    },
  },
  methods: {
    move(direction) {
      this.gameStore.move(direction);
    },
    restart() {
      this.gameStore.initGame();
    },
    handleKeydown(event) {
      if (event.key === "w") this.move("up");
      if (event.key === "a") this.move("left");
      if (event.key === "s") this.move("down");
      if (event.key === "d") this.move("right");
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener("keydown", this.handleKeydown);
    }
    this.gameStore.initGame();
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("keydown", this.handleKeydown);
    }
  },
};
</script>

<style scoped>
button {
  width: 60px;
  height: 60px;
  margin: 5px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 15%;
}
.modal-content button {
  width: 80%;
  border-radius: 30%;
}
</style>
