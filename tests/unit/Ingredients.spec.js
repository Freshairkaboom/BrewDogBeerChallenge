import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Ingredients from '@/components/Ingredients.vue'

//Error: TypeError: Cannot read properties of undefined (reading 'state');

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Ingredients", () => {
    let wrapper;
    let store;
    let beer;
    let mockSelectFnc;
    let state = {selectedBeer: jest.fn()}

    mockSelectFnc = jest.fn();
    store = new Vuex.Store({
        state,
        getters: {getSelectedBeer: ()=>{jest.fn()}},
        mutations: {select: mockSelectFnc },
    })

    test('Renders button when ingredientList contains malts.', () => {

    wrapper = mount(Ingredients, {
        store,
        localVue,
        propsData: {
          ingredientList: [
            {
            "name": "Maris Otter Extra Pale",
            "amount": {
            "value": 3.3,
            "unit": "kilograms"
            }
            },
            {
            "name": "Caramalt",
            "amount": {
            "value": 0.2,
            "unit": "kilograms"
            }
            },
            {
            "name": "Munich",
            "amount": {
            "value": 0.4,
            "unit": "kilograms"
            }
            }
            ]
        }
    })

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
    test('Renders button when ingredientList contains hops.', () => {

    wrapper = mount(Ingredients, {
        store,
        localVue,
        propsData: {
          ingredientList: [
            {
            "name": "Fuggles",
            "amount": {
            "value": 25,
            "unit": "grams"
            },
            "add": "start",
            "attribute": "bitter"
            },
            {
            "name": "First Gold",
            "amount": {
            "value": 25,
            "unit": "grams"
            },
            "add": "start",
            "attribute": "bitter"
            },
            {
            "name": "Fuggles",
            "amount": {
            "value": 37.5,
            "unit": "grams"
            },
            "add": "middle",
            "attribute": "flavour"
            },
            {
            "name": "First Gold",
            "amount": {
            "value": 37.5,
            "unit": "grams"
            },
            "add": "middle",
            "attribute": "flavour"
            },
            {
            "name": "Cascade",
            "amount": {
            "value": 37.5,
            "unit": "grams"
            },
            "add": "end",
            "attribute": "flavour"
            }
            ]
        }
    })

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
})
