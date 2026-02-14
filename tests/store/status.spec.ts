import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import { Attributes, Skills } from '../../src/config/properties'
import { useCharacterStore } from '../../src/store/index'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Ego is correctly calculated', () => {
    const store = useCharacterStore()

    // Given that focus is the mental power skill
    store.setAttribute(Attributes.intellect, 3) 
    store.setSkill(Skills.focus, 2)
    expect(store.mentalPowerSkill.name).toEqual(Skills.focus.name)

    // Then the Ego pool should be 2xINT+focus
    expect(store.maxEgo).toEqual(10)

    // Given that primal is the mental power skill
    store.setAttribute(Attributes.instinct, 1) 
    store.setSkill(Skills.primal, 6)
    expect(store.mentalPowerSkill.name).toEqual(Skills.primal.name)

    // Then the Ego pool should be 2xINS+primal
    expect(store.maxEgo).toEqual(14)
})

test('Spore infestation is correctly calculated', () => {
    const store = useCharacterStore()

    // Given that willpower is the mental resistance skill
    store.setAttribute(Attributes.psyche, 2) 
    store.setSkill(Skills.willpower, 3)
    expect(store.mentalResistanceSkill.name).toEqual(Skills.willpower.name)

    // Then the maximum spore infestations should be 2xPSY+willpower
    expect(store.maxSporeInfestations).toEqual(10)

    // Given that faith is the mental resistance skill
    store.setAttribute(Attributes.psyche, 4) 
    store.setSkill(Skills.faith, 3)
    expect(store.mentalResistanceSkill.name).toEqual(Skills.faith.name)

    // Then the maximum spore infestations should be 2xPSY+faith
    expect(store.maxSporeInfestations).toEqual(14)
})

test('Maximum fleshwounds are correctly calculated', () => {
    const store = useCharacterStore()

    store.setAttribute(Attributes.body, 5)
    store.setSkill(Skills.toughness, 1)

    expect(store.maxFleshwounds).toEqual(12)
})

test('Maximum trauma is correctly calculated', () => {
    const store = useCharacterStore()

    store.setAttribute(Attributes.body, 5) 
    store.setAttribute(Attributes.psyche, 2)

    expect(store.maxTrauma).toEqual(7)
})
