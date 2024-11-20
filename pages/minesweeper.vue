<template>
  <div>
    <Header></Header>
    <content-minesweeper></content-minesweeper>
    <Footer></Footer>
  </div>
</template>

<script>
import ContentMinesweeper from "~/components/Games/ContentMinesweeper.vue";
export default {
  components: {
    ContentMinesweeper,
  },
};
</script>
