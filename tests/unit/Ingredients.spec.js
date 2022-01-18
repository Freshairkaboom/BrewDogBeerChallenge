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

    beforeEach(()=>{
      mockSelectFnc = jest.fn();
    store = new Vuex.Store({
        state,
        getters: {getSelectedBeer: ()=>{jest.fn()}},
        mutations: {select: mockSelectFnc },
    })

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
          ]
      }
    })

  })

  test('Renders button when ingredientList contains malts.', () => {

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
  test('Renders button when ingredientList contains hops.', () => {

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
  test('Rendered button switches from Idle to Done when clicked.', () => {

    var button = wrapper.get("button");

    expect(button.text()).toBe("Idle")

    button.trigger("click");

    expect(button.text()).toBe("Done");

  })
  // test('Rendered button does not switch from Idle to Done if "add" attribute of ingredient is "middle" when there is a button present that has attribute of "start" and is not Done.', () => {

  //   wrapper = mount(Ingredients, {
  //     store,
  //     localVue,
  //     propsData: {
  //       ingredientList: [
  //         {
  //           "name": "First Gold",
  //           "amount": {
  //           "value": 37.5,
  //           "unit": "grams"
  //           },
  //           "add": "middle",
  //           "attribute": "flavour"
  //         },
  //         {
  //         "name": "Fuggles",
  //         "amount": {
  //         "value": 25,
  //         "unit": "grams"
  //         },
  //         "add": "start",
  //         "attribute": "bitter"
  //         },
  //         ]
  //     }
  //   })

  //   var button = wrapper.get("button");

  //   expect(button.text()).toBe("Idle")

  //   button.trigger("click");

  //   expect(button.text()).toBe("Idle");

  // })
})
