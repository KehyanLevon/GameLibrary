<template>
  <div class="board">
    <h3>{{ title }}</h3>
    <div
      class="battle-ship-board-row"
      v-for="(row, rowIndex) in board"
      :key="'row-' + rowIndex"
    >
      <div
        class="cell"
        v-for="(cell, colIndex) in row"
        :key="'cell-' + colIndex"
        :style="{
          backgroundColor:
            cell && cell.status != 'miss' && showShips ? cell.color : '#1e1e1e',
        }"
        @dragover.prevent
        @click="$emit('handle-сell-сlick', rowIndex, colIndex)"
        @drop="$emit('handle-drop', rowIndex, colIndex)"
      >
        <span v-if="cell?.status === 'hit'" class="hit-icon">✕</span>
        <span v-if="cell?.status === 'miss'" class="miss-icon">○</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    board: Array,
    showShips: Boolean,
  },
};
</script>
