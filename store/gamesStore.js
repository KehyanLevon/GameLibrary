import { defineStore } from 'pinia';
import gamesFixture from '@/fixtures/gamesFixture';

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: gamesFixture,
  }),

  getters: {
    getAllGames: (state) => state.games,
    
    getDownloadedGames: (state) => state.games.filter(game => game.currentlyDownloaded),
  },

  actions: {
    addGame(newGame) {
      this.games.push(newGame);
    },
    
    updateGame(updatedGame) {
      const index = this.games.findIndex(game => game.name === updatedGame.name);
      if (index !== -1) {
        this.games[index] = updatedGame;
      }
    },

    removeGame(gameName) {
      this.games = this.games.filter(game => game.name !== gameName);
    }
  }
});