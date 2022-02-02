import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Ingredients from '@/components/Ingredients.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

var ingredientList;
var hopCounter;
var index;
var doneIngredients;
var checkIfCorrectOrder;
var incrementHopValues;
var isHops;

describe("Ingredients", () => {
  let wrapper;
  let store;

  beforeEach(()=>{
    store = new Vuex.Store({
      state: { selectedBeer: jest.fn() },
      mutations: { select: jest.fn() },
    })

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

    ingredientList = wrapper.vm.ingredientList;
    hopCounter = wrapper.vm.hopCounter;
    index = 0;
    doneIngredients = wrapper.vm.doneIngredients;
    checkIfCorrectOrder = wrapper.vm.checkIfCorrectOrder;
    incrementHopValues = wrapper.vm.incrementHopValues;
    isHops = wrapper.vm.isHops;

  })

  it('addIngredients method pushes Index parameter into doneIngredients when run while ingredientList includes items.', () => {

    expect(doneIngredients.includes(index)).toBe(false);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(doneIngredients.includes(index)).toBe(true);
  })
  it('addIngredients method does not push Index parameter into doneIngredients when run while ingredientList includes no items.', () => {

    ingredientList = [];

    expect(doneIngredients.includes(index)).toBe(false);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method does not push Index parameter into doneIngredients when run while Index is from an item with later order add attribute.', () => {
    index = 2;

    expect(doneIngredients.includes(index)).toBe(false);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method does not push Index parameter into doneIngredients while Index does not exist in ingredientList.', () => {
    index = 3;

    expect(doneIngredients.includes(index)).toBe(false);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method increments hopvalues when isHops is true and index is included in ingredientList.', () => {
    isHops = true;

    expect(hopCounter.startHops.added).toBe(0);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(hopCounter.startHops.added).toBe(1);
  })
  it('addIngredients method does not increment hopvalues when ingredientList contains malts.', () => {
    ingredientList = [
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

    isHops = false;

    expect(hopCounter.startHops.added).toBe(0);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(hopCounter.startHops.added).toBe(0);
  })
  it('addIngredients method does not increment hopvalues when ingredientList contains malts.', () => {
    ingredientList = [
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

    isHops = false;

    expect(hopCounter.startHops.added).toBe(0);

    wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops)

    expect(hopCounter.startHops.added).toBe(0);
  })
})
