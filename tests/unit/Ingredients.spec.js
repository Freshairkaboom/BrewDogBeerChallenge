import addIngredientImpl from '@/logic/IngredientsLogic.js'
import getHopsAddTotalsImpl from '@/logic/IngredientsLogic.js'

var dataObj;
var index;

describe("Ingredients", () => {

  beforeEach(()=>{
    dataObj = {
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
          "name": "Fuggles",
          "amount": {
          "value": 37.5,
          "unit": "grams"
          },
          "add": "middle",
          "attribute": "flavour"
          }
      ],
      hopCounter: {
        startHops: { added: 0, total: 0 },
        middleHops: { added: 0, total: 0 },
        endHops: { added: 0, total: 0 },
      },
      isHops: true,
      doneIngredients: [],
    }

    index = 0;

    getHopsAddTotalsImpl(dataObj);
  })

  it('addIngredients method pushes Index parameter into doneIngredients when run while ingredientList includes items.', () => {

    expect(dataObj.doneIngredients.includes(index)).toBe(false);

    addIngredientImpl(dataObj, index);

    expect(dataObj.doneIngredients.includes(index)).toBe(true);
  })
  it('addIngredients method does not push Index parameter into doneIngredients when run while ingredientList includes no items.', () => {

    dataObj.ingredientList = [];

    expect(dataObj.doneIngredients.includes(index)).toBe(false);

    addIngredientImpl(dataObj, index);

    expect(dataObj.doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method does not push Index parameter into doneIngredients when run while Index is from an item with later order add attribute.', () => {
    index = 1;

    expect(dataObj.doneIngredients.includes(index)).toBe(false);

    addIngredientImpl(dataObj, index);

    expect(dataObj.doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method does not push Index parameter into doneIngredients while Index does not exist in ingredientList.', () => {
    index = 3;

    expect(dataObj.doneIngredients.includes(index)).toBe(false);

    addIngredientImpl(dataObj, index);

    expect(dataObj.doneIngredients.includes(index)).toBe(false);
  })
  it('addIngredients method increments hopvalues when isHops is true and index is included in ingredientList.', () => {
    expect(dataObj.hopCounter.startHops.added).toBe(0);

    addIngredientImpl(dataObj, index);

    expect(dataObj.hopCounter.startHops.added).toBe(1);
  })
  it('addIngredients method does not increment hopvalues when ingredientList contains malts.', () => {
    dataObj.ingredientList = [
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

    dataObj.isHops = false;

    expect(dataObj.hopCounter.startHops.added).toBe(0);

    addIngredientImpl(dataObj, index);

    expect(dataObj.hopCounter.startHops.added).toBe(0);
  })
  it('addIngredients method does not increment hopvalues when ingredientList contains malts.', () => {
    dataObj.ingredientList = [
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

    dataObj.isHops = false;

    expect(dataObj.hopCounter.startHops.added).toBe(0);

    addIngredientImpl(dataObj, index);

    expect(dataObj.hopCounter.startHops.added).toBe(0);
  })
})
