import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Ingredients from '@/components/Ingredients.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Ingredients", () => {
  let wrapper;
  let store;
  let mockSelectFnc;

  beforeEach(()=>{
    mockSelectFnc = jest.fn();
    store = new Vuex.Store({
      state: { selectedBeer: jest.fn() },
      mutations: { select: jest.fn() },
    }),

    wrapper = mount(Ingredients, {
      store,
      localVue,
      propsData: {
      isHops: true,
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

  test('Rendered button switches from Idle to Done when clicked.', () => {

    var button = wrapper.get("button");

    expect(button.text()).toBe("Idle")

    button.trigger("click");

    expect(button.text()).toBe("Done");

  })
  test('Renders button when ingredientList contains malts.', () => {

    wrapper = mount(Ingredients, {
      store,
      localVue,
      propsData: {
      isHops: false,
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
      isHops: true,
      propsData: {
      isHops: true,
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
        ]
      }
    })

    var button = wrapper.get("button");

    expect(button).toBeTruthy;

  })
  test('Rendered button does not switch from Idle to Done if "add" attribute of ingredient is "middle" when there is a button present that has attribute of "start" and is not Done.', () => {

    wrapper = mount(Ingredients, {
      store,
      localVue,
      propsData: {
      isHops: true,
      ingredientList: [
        {
        "name": "Fuggles",
        "amount": {
        "value": 25,
        "unit": "grams"
        },
        "add": "middle",
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
        ]
      }
    })

    var button = wrapper.get("button");

    expect(button.text()).toBe("Idle")

    button.trigger("click");

    expect(button.text()).toBe("Idle");

  })
})
