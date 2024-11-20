<template>
  <div>
    <Header></Header>
    <content-2048></content-2048>
    <Footer></Footer>
  </div>
</template>

<script>
import Content2048 from "../components/Games/Content2048.vue";
export default {
  components: {
    Content2048,
  },
};
</script>
