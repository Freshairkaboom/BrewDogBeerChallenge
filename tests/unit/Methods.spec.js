import { mount, createLocalVue, config } from '@vue/test-utils'
import Vuex from 'vuex'
import { mapState, mapGetters } from 'vuex'
import Methods from '@/components/Methods.vue'

config.showDeprecationWarnings = false

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Methods", () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                selectedBeer: {
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
                }
            },
            getters: {
                getSelectedBeer: state => {return state.selectedBeer},
             },
            mutations: {
                setSelectedBeer(state, beer) {
                    state.selectedBeer = beer;
                }
            },
            actions: {
                mutateSelectedBeer({ commit }, beer) {
                    commit("setSelectedBeer", beer);
                }
            }
        })

        wrapper = mount(Methods, {
            computed: {
                ...mapState(["selectedBeer"]),
                ...mapGetters(["getSelectedBeer"]),
            },
            watch: {
                selectedBeer: function () {
                    clearInterval(wrapper.vm.startInterval);
                    wrapper.vm.currentMashIndex = 0;
                    wrapper.vm.isRunning = false;

                    wrapper.vm.mashCounter =
                        wrapper.vm.selectedBeer.method.mash_temp[wrapper.vm.currentMashIndex].duration * 60;

                    var buttonList = document.getElementsByClassName("idleButton");

                    for (var i = 0; i < buttonList.length; i++) {
                        buttonList[i].innerHTML = "Idle";
                    }
                },
            },
            store,
            localVue
        })
    })

    afterEach(()=>{
        jest.useRealTimers();
    })

    test('Renders method buttons', () => {

        const mash = wrapper.find({ ref: "buttonMash" }),
            ferment = wrapper.find({ ref: "buttonFerment" }),
            twist = wrapper.find({ ref: "buttonTwist" });

        expect(mash.exists()).toBe(true);
        expect(ferment.exists()).toBe(true);
        expect(twist.exists()).toBe(true);
    })

    test('Renders currentMashIndex and selectedBeer.method.mash_temp.length', () => {

        const mashList = wrapper.find("li");

        expect(mashList.text()).toContain(1)
        expect(mashList.text()).toContain(4)
    })

    test('Pressing mash button makes mashCounter count down once per second.', () => {

        const mash = wrapper.find({ ref: "buttonMash" });

        let beforeCount = wrapper.vm.mashCounter;

        jest.useFakeTimers();

        mash.trigger('click');

        jest.advanceTimersByTime(999);

        expect(beforeCount == wrapper.vm.mashCounter).toBe(true);

        jest.advanceTimersByTime(1);

        expect(beforeCount > wrapper.vm.mashCounter).toBe(true);
    })

    test('Finishing the duration of first mash session advances the currentMashIndex by one.', () => {
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

    test('Changing selectedBeer returns the value of currentMashIndex to 0.', async () => {
        wrapper.vm.currentMashIndex = 5;

        await wrapper.vm.$store.dispatch("mutateSelectedBeer", {
            "id": 4,
            "name": "Pilsen Lager",
            "tagline": "Unleash the Yeast Series.",
            "first_brewed": "09/2013",
            "description": "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
            "image_url": "https://images.punkapi.com/v2/4.png",
            "abv": 6.3,
            "ibu": 55,
            "target_fg": 1012,
            "target_og": 1060,
            "ebc": 30,
            "srm": 15,
            "ph": 4.4,
            "attenuation_level": 80,
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
                            "value": 65,
                            "unit": "celsius"
                        },
                        "duration": null
                    }
                ],
                "fermentation": {
                    "temp": {
                        "value": 9,
                        "unit": "celsius"
                    }
                },
                "twist": null
            },
            "ingredients": {
                "malt": [
                    {
                        "name": "Extra Pale",
                        "amount": {
                            "value": 4.58,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Caramalt",
                        "amount": {
                            "value": 0.25,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Dark Crystal",
                        "amount": {
                            "value": 0.06,
                            "unit": "kilograms"
                        }
                    },
                    {
                        "name": "Munich",
                        "amount": {
                            "value": 0.25,
                            "unit": "kilograms"
                        }
                    }
                ],
                "hops": [
                    {
                        "name": "Centennial",
                        "amount": {
                            "value": 5,
                            "unit": "grams"
                        },
                        "add": "start",
                        "attribute": "bitter"
                    },
                    {
                        "name": "Amarillo",
                        "amount": {
                            "value": 5,
                            "unit": "grams"
                        },
                        "add": "start",
                        "attribute": "bitter"
                    },
                    {
                        "name": "Centennial",
                        "amount": {
                            "value": 10,
                            "unit": "grams"
                        },
                        "add": "middle",
                        "attribute": "flavour"
                    },
                    {
                        "name": "Amarillo",
                        "amount": {
                            "value": 10,
                            "unit": "grams"
                        },
                        "add": "middle",
                        "attribute": "flavour"
                    },
                    {
                        "name": "Centennial",
                        "amount": {
                            "value": 17.5,
                            "unit": "grams"
                        },
                        "add": "end",
                        "attribute": "flavour"
                    },
                    {
                        "name": "Amarillo",
                        "amount": {
                            "value": 17.5,
                            "unit": "grams"
                        },
                        "add": "end",
                        "attribute": "flavour"
                    }
                ],
                "yeast": "Wyeast 2007 - Pilsen Lager™"
            },
            "food_pairing": [
                "Spicy crab cakes",
                "Spicy cucumber and carrot Thai salad",
                "Sweet filled dumplings"
            ],
            "brewers_tips": "Play around with the fermentation temperature to get the best flavour profile from the individual yeasts.",
            "contributed_by": "Ali Skinner <AliSkinner>"
        });

        expect(wrapper.vm.currentMashIndex == 0).toBe(true);
    })
})
