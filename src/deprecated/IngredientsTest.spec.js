// import {shallowMount, createLocalVue} from '@vue/test-utils'
// import Vuex from 'vuex'
// import Ingredients from '@/components/Ingredients.vue'

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe('Ingredients', () => {
//     var wrapper;
//     var store;

//     beforeEach(()=>{
//         wrapper = shallowMount(Ingredients, () => {

//         })
//     })

//     test('addIngredient adds the index of an existing button to doneIngredients.', () => {

//         var ingredientList = [
//             {
//                 "name": "Fuggles",
//                 "amount": {
//                     "value": 25,
//                     "unit": "grams"
//                 },
//                 "add": "start",
//                 "attribute": "bitter"
//             },
//             {
//                 "name": "Fuggles",
//                 "amount": {
//                     "value": 37.5,
//                     "unit": "grams"
//                 },
//                 "add": "middle",
//                 "attribute": "flavour"
//             },
//         ];

//         var doneIngredients = [];
//         var hopCounter = {
//             startHops: { added: 0, total: 0 },
//             middleHops: { added: 0, total: 0 },
//             endHops: { added: 0, total: 0 },
//             }
//         var index = 1;
//         var isHops = true;

//         wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops);

//         expect(doneIngredients.includes(1)).toBe(true);
//     })
//     test('addIngredient does not add the index of a nonexistant button to doneIngredients.', () => {

//         var ingredientList = [
//             {
//                 "name": "Fuggles",
//                 "amount": {
//                     "value": 25,
//                     "unit": "grams"
//                 },
//                 "add": "start",
//                 "attribute": "bitter"
//             },
//             {
//                 "name": "First Gold",
//                 "amount": {
//                     "value": 25,
//                     "unit": "grams"
//                 },
//                 "add": "start",
//                 "attribute": "bitter"
//             },
//             {
//                 "name": "Fuggles",
//                 "amount": {
//                     "value": 37.5,
//                     "unit": "grams"
//                 },
//                 "add": "middle",
//                 "attribute": "flavour"
//             },
//             {
//                 "name": "First Gold",
//                 "amount": {
//                     "value": 37.5,
//                     "unit": "grams"
//                 },
//                 "add": "middle",
//                 "attribute": "flavour"
//             },
//             {
//                 "name": "Cascade",
//                 "amount": {
//                     "value": 37.5,
//                     "unit": "grams"
//                 },
//                 "add": "end",
//                 "attribute": "flavour"
//             }
//         ];

//         var doneIngredients = [];
//         var hopCounter = {
//             startHops: { added: 0, total: 0 },
//             middleHops: { added: 0, total: 0 },
//             endHops: { added: 0, total: 0 },
//             }
//         var index = 8;
//         var isHops = true;

//         wrapper.vm.addIngredient(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops);

//         expect(doneIngredients.includes(8)).toBe(false);
//     })
// })
