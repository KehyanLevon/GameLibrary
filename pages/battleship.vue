<template>
  <div>
    <Header></Header>
    <content-battleship></content-battleship>
    <Footer></Footer>
  </div>
</template>

<script>
import ContentBattleship from "~/components/Games/ContentBattleship/index.vue";
export default {
  components: {
    ContentBattleship,
  },
};
</script>
