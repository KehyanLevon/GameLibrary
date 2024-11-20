<template>
  <div class="gaming-library">
    <div class="col-lg-12">
      <div class="heading-section">
        <h4><em>Your Gaming</em> Library</h4>
      </div>
      <div class="item" v-for="(game, index) in games" :key="game.name">
        <ul>
          <li>
            <NuxtLink :to="'/' + game.name.replace(/\s+/g, '')" class="logo">
              <img
                :src="require(`@/assets/images/game-0${index}.jpg`)"
                alt="game img"
                class="templatemo-item"
              />
            </NuxtLink>
          </li>
          <li>
            <h4>{{ game.name }}</h4>
            <span>Sandbox</span>
          </li>
          <li>
            <h4>Date Added</h4>
            <span>{{ game.dateAdded }}</span>
          </li>
          <li>
            <h4>Hours Played</h4>
            <span>{{ game.hoursPlayed }} H</span>
          </li>
          <li>
            <h4>Currently</h4>
            <span>{{
              game.currentlyDownloaded ? "Downloaded" : "Not Downloaded"
            }}</span>
          </li>
          <li>
            <div
              class="main-border-button"
              :class="{ 'border-no-active': game.currentlyDownloaded }"
            >
              <a href="#">{{
                game.currentlyDownloaded ? "Downloaded" : "Download"
              }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useGamesStore } from "@/store/gamesStore";

export default {
  setup() {
    const gamesStore = useGamesStore();
    const games = gamesStore.getAllGames;

    return { games };
  },
};
</script>
