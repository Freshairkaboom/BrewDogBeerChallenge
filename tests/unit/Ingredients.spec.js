import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Ingredients from '@/components/Ingredients.vue'

//Error: TypeError: Cannot read properties of undefined (reading 'state');

describe('Ingredients.vue', () => {
    let wrapper;
    let store;
    let global;

    store = createStore({
        state() {
            return {
                selectedBeer: "",
            }
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
    })

    it('Renders button.', () => {

    wrapper = mount(Ingredients, () => {

    })

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
})
