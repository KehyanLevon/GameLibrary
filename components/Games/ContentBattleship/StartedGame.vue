<template>
  <div class="game-boards">
    <h2>Game Started!</h2>
    <div class="boards-container">
      <Board title="Your Board" :board="playerBoard" :showShips="true" />
      <Board
        title="Computer's Board"
        :board="computerBoard"
        :showShips="true"
        @handle-сell-сlick="handleAttack"
      />
    </div>
    <div v-if="gameOver" class="modal-overlay">
      <div class="modal-content">
        <h3 v-if="winner === 'computer'">Game Over</h3>
        <h3 v-else>You Win</h3>
        <button @click="restart">Restart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useBattleshipStore } from "@/store/battleshipStore";
import Board from "./Board.vue";

export default {
  components: { Board },
  props: {
    playerBoard: Array,
    computerBoard: Array,
    gameOver: Boolean,
    winner: String,
  },
  computed: {
    battleshipStore() {
      return useBattleshipStore();
    },
  },
  methods: {
    handleAttack(row, col) {
      this.battleshipStore.attackComputer(row, col);
    },
    restart() {
      this.battleshipStore.initGame();
      this.battleshipStore.isGameStarted = false;
    },
  },
};
</script>
