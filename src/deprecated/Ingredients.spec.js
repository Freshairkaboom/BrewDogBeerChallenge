// import { mount, createLocalVue } from '@vue/test-utils'
// import Vuex from 'vuex'
// import Ingredients from '@/components/Ingredients.vue'
// import addIngredientImpl from "@/testlogic/ingredientsLogic.js"

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe("Ingredients", () => {
//   let wrapper;
//   let store;

//   beforeEach(()=>{
//     store = new Vuex.Store({
//       state: { selectedBeer: jest.fn() },
//       mutations: { select: jest.fn() },
//     })

//     wrapper = mount(Ingredients, {
//       store,
//       localVue,
//       isHops: true,
//       propsData: {
//       isHops: true,
//       ingredientList: [
//         {
//         "name": "Fuggles",
//         "amount": {
//         "value": 25,
//         "unit": "grams"
//         },
//         "add": "start",
//         "attribute": "bitter"
//         },
//         {
//         "name": "First Gold",
//         "amount": {
//         "value": 25,
//         "unit": "grams"
//         },
//         "add": "start",
//         "attribute": "bitter"
//         },
//         {
//         "name": "Fuggles",
//         "amount": {
//         "value": 37.5,
//         "unit": "grams"
//         },
//         "add": "middle",
//         "attribute": "flavour"
//         },
//         ]
//       }
//     })
//   })

//   test('',()=>{
//     expect(1).toBe(1);
//   })

//   // test('Renders all elements when ingredientList contains at least one item.', () => {

//   //   wrapper = mount(Ingredients, {
//   //     store,
//   //     localVue,
//   //     propsData: {
//   //       isHops: false,
//   //       ingredientList: [
//   //         {
//   //         "name": "Maris Otter Extra Pale",
//   //         "amount": {
//   //         "value": 3.3,
//   //         "unit": "kilograms"
//   //         }
//   //         },
//   //       ]
//   //     }
//   //   })

//   //   var div = wrapper.find('div');
//   //   var h2 = wrapper.find('h2');
//   //   var ul = wrapper.find('ul');
//   //   var li = wrapper.find('li');
//   //   var button = wrapper.find('button');

//   //   expect(div.exists()).toBe(true);
//   //   expect(h2.exists()).toBe(true);
//   //   expect(ul.exists()).toBe(true);
//   //   expect(li.exists()).toBe(true);
//   //   expect(button.exists()).toBe(true);

//   // })
//   // test('Does not render li and button when ingredientList contains no items, but renders everything else.', () => {

//   //   wrapper = mount(Ingredients, {
//   //     store,
//   //     localVue,
//   //     propsData: {
//   //       isHops: false,
//   //       ingredientList: [
//   //       ]
//   //     }
//   //   })

//   //   var div = wrapper.find('div');
//   //   var h2 = wrapper.find('h2');
//   //   var ul = wrapper.find('ul');
//   //   var li = wrapper.find('li');
//   //   var button = wrapper.find('button');

//   //   expect(div.exists()).toBe(true);
//   //   expect(h2.exists()).toBe(true);
//   //   expect(ul.exists()).toBe(true);
//   //   expect(li.exists()).toBe(false);
//   //   expect(button.exists()).toBe(false);

//   // })
//   // test('Renders button when ingredientList contains malts.', () => {

//   //   wrapper = mount(Ingredients, {
//   //     store,
//   //     localVue,
//   //     propsData: {
//   //     isHops: false,
//   //     ingredientList: [
//   //       {
//   //       "name": "Maris Otter Extra Pale",
//   //       "amount": {
//   //       "value": 3.3,
//   //       "unit": "kilograms"
//   //       }
//   //       },
//   //       {
//   //       "name": "Caramalt",
//   //       "amount": {
//   //       "value": 0.2,
//   //       "unit": "kilograms"
//   //       }
//   //       },
//   //       {
//   //       "name": "Munich",
//   //       "amount": {
//   //       "value": 0.4,
//   //       "unit": "kilograms"
//   //       }
//   //       }
//   //       ]
//   //     }
//   //   })

//   //   var button = wrapper.get("button");

//   //   expect(button).toBeTruthy;

//   // })
//   // test('Renders button when ingredientList contains hops.', () => {

//   //   wrapper = mount(Ingredients, {
//   //     store,
//   //     localVue,
//   //     isHops: true,
//   //     propsData: {
//   //     isHops: true,
//   //     ingredientList: [
//   //       {
//   //       "name": "Fuggles",
//   //       "amount": {
//   //       "value": 25,
//   //       "unit": "grams"
//   //       },
//   //       "add": "start",
//   //       "attribute": "bitter"
//   //       },
//   //       {
//   //       "name": "First Gold",
//   //       "amount": {
//   //       "value": 25,
//   //       "unit": "grams"
//   //       },
//   //       "add": "start",
//   //       "attribute": "bitter"
//   //       },
//   //       {
//   //       "name": "Fuggles",
//   //       "amount": {
//   //       "value": 37.5,
//   //       "unit": "grams"
//   //       },
//   //       "add": "middle",
//   //       "attribute": "flavour"
//   //       },
//   //       ]
//   //     }
//   //   })

//   //   var button = wrapper.get("button");

//   //   expect(button).toBeTruthy;

//   // })
//   // test('Rendered button switches from Idle to Done when clicked.', () => {

//   //   var button = wrapper.get("button");

//   //   expect(button.text()).toBe("Idle")

//   //   button.trigger("click");

//   //   expect(button.text()).toBe("Done");

//   // })
//   // test('Rendered button does not switch from Idle to Done if "add" attribute of ingredient is "middle" when there is a button present that has attribute of "start" and is not Done.', () => {

//   //   wrapper = mount(Ingredients, {
//   //     store,
//   //     localVue,
//   //     propsData: {
//   //     isHops: true,
//   //     ingredientList: [
//   //       {
//   //       "name": "Fuggles",
//   //       "amount": {
//   //       "value": 25,
//   //       "unit": "grams"
//   //       },
//   //       "add": "middle",
//   //       "attribute": "bitter"
//   //       },
//   //       {
//   //       "name": "First Gold",
//   //       "amount": {
//   //       "value": 25,
//   //       "unit": "grams"
//   //       },
//   //       "add": "start",
//   //       "attribute": "bitter"
//   //       },
//   //       ]
//   //     }
//   //   })

//   //   var button = wrapper.get("button");

//   //   expect(button.text()).toBe("Idle")

//   //   button.trigger("click");

//   //   expect(button.text()).toBe("Idle");

//   // })
// })
