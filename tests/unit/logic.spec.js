import addIngredientImpl from '@/logic.js';

test('addIngredientsImpl changes Idle to Done', () => {

    var ingredientList = [
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
    ];

    var doneIngredients = [];
    var hopCounter = {
        startHops: { added: 0, total: 0 },
        middleHops: { added: 0, total: 0 },
        endHops: { added: 0, total: 0 },
        }
    var index = 1;

    addIngredientImpl(ingredientList, hopCounter, index, doneIngredients);

    expect(doneIngredients.includes(1)).toBe(true);
})
