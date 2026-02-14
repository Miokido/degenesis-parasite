import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store/index'
import { expect, test, beforeEach } from 'vitest'
import config from '../../src/config'
import { Attributes, Skills } from '../../src/config/properties'
import { EditorMode } from '../../src/config/modes'

beforeEach(() => {
  setActivePinia(createPinia())
})

const defaultCulture = config.cultures.Borca
const defaultConcept = config.concepts.Adventurer
const defaultCult = config.cults.Spitalians

test('Default values', () => {
  const store = useCharacterStore()
  expect(store.characterName).toEqual('')
  expect(store.culture).toEqual(defaultCulture)
  expect(store.concept).toEqual(defaultConcept)
  expect(store.cult).toEqual(defaultCult)
  expect(store.attributes).toEqual(new Map(config.attributes.map((x) => [x, 1])))
  expect(store.skills).toEqual(new Map(config.skills.map((x) => [x, 0])))
  expect(store.origins).toEqual(new Map(config.origins.map((x) => [x, 0])))
  expect(store.editorMode).toEqual(EditorMode.Default)
})

test('Getting and setting Attributes', () => {
  const store = useCharacterStore()
  expect(store.attributeValue(Attributes.agility)).toEqual(1)
  store.setAttribute(Attributes.agility, 2)
  expect(store.attributeValue(Attributes.agility)).toEqual(2)
  store.setAttribute(Attributes.agility, 1)
  expect(store.attributeValue(Attributes.agility)).toEqual(1)
})

test.each([EditorMode.SoftLimits, EditorMode.Free])(
  'Getting and setting Attributes honors lower and upper bounds in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Invalid low values are bounded to minimum value
    store.setAttribute(Attributes.agility, 2)
    store.setAttribute(Attributes.agility, 0)
    expect(store.attributeValue(Attributes.agility)).toEqual(1)

    // Invalid high values are bounded to maximum value
    store.setAttribute(Attributes.agility, 99)
    expect(store.attributeValue(Attributes.agility)).toEqual(6)
  }
)

test('Getting and setting Attributes honors lower and upper bounds in HardLimits mode', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Invalid low values are bounded to minimum value
  store.setAttribute(Attributes.agility, 2)
  store.setAttribute(Attributes.agility, 0)
  expect(store.attributeValue(Attributes.agility)).toEqual(1)

  // Invalid high values are bounded to maximum value
  store.setAttribute(Attributes.agility, 99)
  expect(store.attributeValue(Attributes.agility)).toEqual(4)
})

test('Getting and setting Skills', () => {
  const store = useCharacterStore()
  expect(store.skillValue(Skills.artifactLore)).toEqual(0)
  store.setSkill(Skills.artifactLore, 1)
  expect(store.skillValue(Skills.artifactLore)).toEqual(1)
  store.setSkill(Skills.artifactLore, 0)
  expect(store.skillValue(Skills.artifactLore)).toEqual(0)
})

test('Getting and setting Skills honors lower and upper bounds', () => {
  const store = useCharacterStore()

  // Invalid low values are bounded to minimum value
  store.setSkill(Skills.artifactLore, 1)
  store.setSkill(Skills.artifactLore, -1)
  expect(store.skillValue(Skills.artifactLore)).toEqual(0)

  // Invalid high values are bounded to maximum value
  store.setSkill(Skills.artifactLore, 99)
  expect(store.skillValue(Skills.artifactLore)).toEqual(6)
})

test('Getting and setting Origins', () => {
  const store = useCharacterStore()
  const origin = config.origins[0]
  expect(store.originValue(origin)).toEqual(0)
  store.setOrigin(origin, 1)
  expect(store.originValue(origin)).toEqual(1)
  store.setOrigin(origin, 0)
  expect(store.originValue(origin)).toEqual(0)
})

test('Getting and setting Culture', () => {
  const store = useCharacterStore()
  const newCulture = config.cultures.Africa
  expect(store.culture).toEqual(defaultCulture)
  expect(store.culture).not.toEqual(newCulture)
  store.setCulture(newCulture)
  expect(store.culture).toEqual(newCulture)
})

test('Getting and setting Concept', () => {
  const store = useCharacterStore()
  const newConcept = config.concepts.Abomination
  expect(store.concept).toEqual(defaultConcept)
  expect(store.concept).not.toEqual(newConcept)
  store.setConcept(newConcept)
  expect(store.concept).toEqual(newConcept)
})

test('Getting and setting Cult', () => {
  const store = useCharacterStore()
  const newCult = config.cults.Anabaptists
  expect(store.cult).toEqual(defaultCult)
  expect(store.cult).not.toEqual(newCult)
  store.setCult(newCult)
  expect(store.cult).toEqual(newCult)
})

test('Free mode', () => {
  const store = useCharacterStore()
  expect(store.editorMode).toEqual(EditorMode.Default)
  store.setEditorMode(EditorMode.Free)
  expect(store.editorMode).toEqual(EditorMode.Free)
  store.setEditorMode(EditorMode.HardLimits)
  expect(store.editorMode).toEqual(EditorMode.HardLimits)
})
