import { shallowMount } from '@vue/test-utils'
import BeerList from '@/components/BeerList.vue'

describe('BeerList.vue', () => {
  it('Receives at least one instance of beer object from API', () => {
    const firstBeerObjectInAPI = {"id": 1}
    expect(wrapper.text()).toMatch(firstBeerObjectInAPI)
  })
})
