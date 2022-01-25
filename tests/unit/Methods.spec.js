import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuex from 'vuex'
import {mapState, mapGetters} from 'vuex'
import Methods from '@/components/Methods.vue'

config.showDeprecationWarnings = false

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Methods", () => {
    let wrapper;
    let store;

    beforeEach(()=> {
        store = new Vuex.Store({
            state: { selectedBeer: {
                "id": 3,
                "name": "Berliner Weisse With Yuzu - B-Sides",
                "tagline": "Japanese Citrus Berliner Weisse.",
                "first_brewed": "11/2015",
                "description": "Japanese citrus fruit intensifies the sour nature of this German classic.",
                "image_url": "https://images.punkapi.com/v2/keg.png",
                "abv": 4.2,
                "ibu": 8,
                "target_fg": 1007,
                "target_og": 1040,
                "ebc": 8,
                "srm": 4,
                "ph": 3.2,
                "attenuation_level": 83,
                "volume": {
                "value": 20,
                "unit": "litres"
                },
                "boil_volume": {
                "value": 25,
                "unit": "litres"
                },
                "method": {
                "mash_temp": [
                {
                "temp": {
                "value": 60,
                "unit": "celsius"
                },
                "duration": 10
                },
                {
                "temp": {
                "value": 65,
                "unit": "celsius"
                },
                "duration": 30
                },
                {
                "temp": {
                "value": 72,
                "unit": "celsius"
                },
                "duration": 10
                },
                {
                "temp": {
                "value": 78,
                "unit": "celsius"
                },
                "duration": 5
                }
                ],
                "fermentation": {
                "temp": {
                "value": 21,
                "unit": "celsius"
                }
                },
                "twist": "Soured naturally using the kettle souring technique, Yuzu fruit: 50g at middle, Yuzu juice: 200ml at FV"
                },
                "ingredients": {
                "malt": [
                {
                "name": "Propino Pale Malt",
                "amount": {
                "value": 1.63,
                "unit": "kilograms"
                }
                },
                {
                "name": "Wheat Malt",
                "amount": {
                "value": 1.63,
                "unit": "kilograms"
                }
                },
                {
                "name": "Propino Pale Malt for kettle souring",
                "amount": {
                "value": 0.03,
                "unit": "kilograms"
                }
                },
                {
                "name": "Acidulated Malt for kettle souring",
                "amount": {
                "value": 0.03,
                "unit": "kilograms"
                }
                }
                ],
                "hops": [
                {
                "name": "Bramling Cross",
                "amount": {
                "value": 10,
                "unit": "grams"
                },
                "add": "middle",
                "attribute": "bitter"
                }
                ],
                "yeast": "Wyeast 1056 - American Ale™"
                },
                "food_pairing": [
                "Smoked chicken wings",
                "Miso ramen",
                "Yuzu cheesecake"
                ],
                "brewers_tips": "Clean everything twice. All you want is the clean sourness of lactobacillus.",
                "contributed_by": "Sam Mason <samjbmason>"
                }},
            mutations: { select: jest.fn() },
        })

        wrapper = mount(Methods, {
            computed: {
                ...mapState(["selectedBeer"]),
                ...mapGetters(["getSelectedBeer"]),
            },
            store,
            localVue
        })
    })

    test('Renders method buttons', ()=>{

        const mash = wrapper.find({ ref: "buttonMash" }),
        ferment = wrapper.find({ ref: "buttonMash" }),
        twist = wrapper.find({ ref: "buttonMash" });

        expect(mash.exists()).toBe(true);
        expect(ferment.exists()).toBe(true);
        expect(twist.exists()).toBe(true);
    })

    test('Pressing mash button makes mashCounter count down once per second.', ()=>{

        const mash = wrapper.find({ ref: "buttonMash" });

        let beforeCount = wrapper.vm.mashCounter;

        jest.useFakeTimers();

        mash.trigger('click');

        jest.advanceTimersByTime(999);

        expect(beforeCount == wrapper.vm.mashCounter).toBe(true);

        jest.advanceTimersByTime(1);

        expect(beforeCount > wrapper.vm.mashCounter).toBe(true);

        jest.useRealTimers();
    })

    test('Finishing the duration of first mash session advances the currentMashIndex by one.', ()=>{
        expect(wrapper.vm.currentMashIndex == 0).toBe(true);

        const mash = wrapper.find({ ref: "buttonMash" });

        jest.useFakeTimers();

        mash.trigger('click');

        jest.advanceTimersByTime(600000) //600000 milliseconds = 10 minutes, duration of the first mash session of test's selectedBeer.

        expect(wrapper.vm.currentMashIndex == 0).toBe(true);

        jest.advanceTimersByTime(1000);

        expect(wrapper.vm.currentMashIndex > 0).toBe(true);

        jest.useRealTimers();
    })

    test('Changing selectedBeer returns the value of currentMashIndex to 0.', ()=>{
        wrapper.vm.currentMashIndex = 5;

        expect(wrapper.vm.currentMashIndex == 0).toBe(true);
    })
})
