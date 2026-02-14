import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store/index'
import { expect, test, beforeEach } from 'vitest'

import { Skills } from '../../src/config/properties'
import config from '../../src/config'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Mental resistance skill defaults to faith', () => {
  const store = useCharacterStore()
  expect(store.mentalResistanceSkill).toEqual(Skills.faith)
})

test('Mental resistance skill can be toggled from faith to willpower', () => {
  const store = useCharacterStore()

  // Given the mental resistance skill is faith
  store.setSkill(Skills.faith, 1)
  expect(store.mentalResistanceSkill).toEqual(Skills.faith)

  // When willpower is raised
  store.setSkill(Skills.willpower, 1)
  expect(store.skillValue(Skills.willpower)).toEqual(1)

  // Then faith is dropped to the minimum value
  expect(store.skillValue(Skills.faith)).toEqual(0)

  // And willpower is chosen as mental resistance skill
  expect(store.mentalResistanceSkill).toEqual(Skills.willpower)
})

test('Mental resistance skill can be toggled from willpower to faith', () => {
  const store = useCharacterStore()

  // Given the mental resistance skill is willpower
  store.setSkill(Skills.willpower, 1)
  expect(store.mentalResistanceSkill).toEqual(Skills.willpower)

  // When faith is raised
  store.setSkill(Skills.faith, 1)
  expect(store.skillValue(Skills.faith)).toEqual(1)

  // Then willpower is dropped to the minimum value
  expect(store.skillValue(Skills.willpower)).toEqual(0)

  // And faith is chosen as mental resistance skill
  expect(store.mentalResistanceSkill).toEqual(Skills.faith)
})

test('Mental power skill defaults to focus', () => {
  const store = useCharacterStore()
  expect(store.mentalPowerSkill).toEqual(Skills.focus)
})

test('Mental power skill can be toggled from focus to primal', () => {
  const store = useCharacterStore()

  // Given the mental power skill is focus
  store.setSkill(Skills.focus, 1)
  expect(store.mentalPowerSkill).toEqual(Skills.focus)

  // When primal is raised
  store.setSkill(Skills.primal, 1)
  expect(store.skillValue(Skills.primal)).toEqual(1)

  // Then focus is dropped to the minimum value
  expect(store.skillValue(Skills.focus)).toEqual(0)

  // And primal is chosen as mental power skill
  expect(store.mentalPowerSkill).toEqual(Skills.primal)
})

test('Mental power skill can be toggled from primal to focus', () => {
  const store = useCharacterStore()

  // Given the mental power skill is primal
  store.setSkill(Skills.primal, 1)
  expect(store.mentalPowerSkill).toEqual(Skills.primal)

  // When focus is raised
  store.setSkill(Skills.focus, 1)
  expect(store.skillValue(Skills.focus)).toEqual(1)

  // Then primal is dropped to the minimum value
  expect(store.skillValue(Skills.primal)).toEqual(0)

  // And focus is chosen as mental power skill
  expect(store.mentalPowerSkill).toEqual(Skills.focus)
})

test('isActiveSkill always returns true for skills other than focus, primal, willpower and faith', () => {
  const store = useCharacterStore()

  expect(store.isActiveSkill(Skills.athletics)).toBeTruthy()
  config.skills
    .filter(
      (skill) =>
        skill !== Skills.focus &&
        skill !== Skills.primal &&
        skill !== Skills.willpower &&
        skill !== Skills.faith
    )
    .forEach((skill) => {
      expect(store.isActiveSkill(skill)).toBeTruthy()
    })
})

test('isActiveSkill returns true for current mental resistance skill and false for opposite', () => {
  const store = useCharacterStore()

  // Given the mental resistance skill is faith
  expect(store.mentalResistanceSkill).toEqual(Skills.faith)

  // Then faith should be an active skill
  expect(store.isActiveSkill(Skills.faith)).toBeTruthy()
  // And willpower should not be an active skill
  expect(store.isActiveSkill(Skills.willpower)).toBeFalsy()

  // Given the mental resistance skill is willpower
  store.setSkill(Skills.willpower, 1)
  expect(store.mentalResistanceSkill).toEqual(Skills.willpower)

  // Then willpower should be an active skill
  expect(store.isActiveSkill(Skills.willpower)).toBeTruthy()
  // And faith should not be an active skill
  expect(store.isActiveSkill(Skills.faith)).toBeFalsy()
})

test('isActiveSkill returns true for current mental power skill and false for opposite', () => {
  const store = useCharacterStore()

  // Given the mental power skill is focus
  expect(store.mentalPowerSkill).toEqual(Skills.focus)

  // Then focus should be an active skill
  expect(store.isActiveSkill(Skills.focus)).toBeTruthy()
  // And primal should not be an active skill
  expect(store.isActiveSkill(Skills.primal)).toBeFalsy()

  // Given the mental power skill is primal
  store.setSkill(Skills.primal, 1)
  expect(store.mentalPowerSkill).toEqual(Skills.primal)

  // Then primal should be an active skill
  expect(store.isActiveSkill(Skills.primal)).toBeTruthy()
  // And focus should not be an active skill
  expect(store.isActiveSkill(Skills.focus)).toBeFalsy()
})