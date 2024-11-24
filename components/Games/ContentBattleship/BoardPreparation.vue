<template>
  <div class="battleship-setup">
    <h2>Battleship Setup</h2>
    <Board :board="playerBoard" :showShips="true" @handle-drop="handleDrop" />
    <div class="available-ships">
      <div v-for="ship in availablePlayerShips" :key="ship.id" class="ship">
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
    <button v-if="isSetupComplete" @click="startGame" class="start-btn-circle">
      <span class="icon">&#9658;</span>
    </button>
  </div>
</template>

<script>
import { useBattleshipStore } from "@/store/battleshipStore";
import Board from "./Board.vue";

export default {
  components: { Board },
  props: {
    playerBoard: Array,
    availablePlayerShips: Array,
    isSetupComplete: Boolean,
  },
  data() {
    return {
      currentShip: null,
    };
  },
  computed: {
    battleshipStore() {
      return useBattleshipStore();
    },
  },
  methods: {
    handleDragStart(ship) {
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
      this.battleshipStore.isGameStarted = true;
    },
  },
};
</script>
