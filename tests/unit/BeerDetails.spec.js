import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BeerDetails from '@/components/BeerDetails.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BeerDetails", () => {
    let wrapper;
    let store;

    beforeEach(()=> {
        // store = new Vuex.Store({
        //     state: { selectedBeer: jest.fn() },
        //     mutations: { select: jest.fn() },
        // })

        // wrapper = mount(Methods, {
        //     store,
        //     localVue
        // })
    })

    test('', ()=>{
        expect(1).toBeTruthy;
    })
})
