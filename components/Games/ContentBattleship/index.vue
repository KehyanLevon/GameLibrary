<template>
  <page-content-slot>
    <BoardPreparation
      v-if="!isGameStarted"
      :playerBoard="playerBoard"
      :availablePlayerShips="availablePlayerShips"
      :isSetupComplete="isSetupComplete"
    />
    <StartedGame
      v-else
      :playerBoard="playerBoard"
      :computerBoard="computerBoard"
      :gameOver="gameOver"
      :winner="winner"
    />
  </page-content-slot>
</template>

<script>
import { useBattleshipStore } from "@/store/battleshipStore";
import BoardPreparation from "./BoardPreparation.vue";
import StartedGame from "./StartedGame.vue";

export default {
  components: { BoardPreparation, StartedGame },
  computed: {
    battleshipStore() {
      return useBattleshipStore();
    },
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
    isGameStarted() {
      return this.battleshipStore.isGameStarted;
    },
  },
  mounted() {
    this.battleshipStore.initGame();
  },
};
</script>

<style>
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

.battle-ship-board-row {
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
