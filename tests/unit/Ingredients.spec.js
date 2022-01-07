import { shallowMount } from '@vue/test-utils'
import Ingredients from '@/components/Ingredients.vue'

//Error: TypeError: Cannot read properties of undefined (reading 'state');
// Has something to do with the selectedBeer watcher I think.

describe('Ingredients.vue', () => {
  it('Button changes button innerHTML to Done.', () => {
    let wrapper;

    wrapper = shallowMount(Ingredients, () => {

    })

    wrapper.find("button").trigger("click");

    expect(wrapper.find("button").innerHTML).toBe("Done");

  })
})
