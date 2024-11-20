<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="page-content">
          <banner></banner>
          <coming-soon></coming-soon>
          <gaming-library></gaming-library>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "./Banner.vue";
import ComingSoon from "./ComingSoon.vue";
import GamingLibrary from "./GamingLibrary.vue";

export default {
  components: {
    Banner,
    ComingSoon,
    GamingLibrary,
  },
};
</script>
