// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
     selectedBeer: "",
 },
 getters: {
    getSelectedBeer: state => {return state.selectedBeer},
 },
 mutations: {
    setSelectedBeer(state, beer) {
        state.selectedBeer = beer;
    }
 },
 actions: {
    mutateSelectedBeer({commit}, beer) {
        commit("setSelectedBeer", beer);
    }
 }
});
