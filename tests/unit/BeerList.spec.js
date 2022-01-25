import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BeerList from '@/components/BeerList.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BeerList", () => {
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
