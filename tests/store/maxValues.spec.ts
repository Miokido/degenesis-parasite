import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store/index'
import { expect, test, beforeEach } from 'vitest'
import config from '../../src/config'

import { Attributes, Origins, Skills } from '../../src/config/properties'
import { EditorMode } from '../../src/config/modes'

beforeEach(() => {
  setActivePinia(createPinia())
})

const NonTruncatingEditorModes = [EditorMode.Free, EditorMode.SoftLimits]

test('Maximum attribute value is default value in absence of bonuses from culture and concept', () => {
  const store = useCharacterStore()
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  expect(store.attributeMax(Attributes.body)).toEqual(config.pointLimits.attributes.max)
})

test('Maximum skill value is default value in absence of bonuses from culture and concept', () => {
  const store = useCharacterStore()
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  expect(store.skillMax(Skills.focus)).toEqual(config.pointLimits.skills.max)
})

test('Maximum origin value is default value', () => {
  const store = useCharacterStore()
  expect(store.originMax).toEqual(config.pointLimits.origins.max)
})

test('Maximum attribute value includes bonus from culture and concept', () => {
  const store = useCharacterStore()

  // Only bonus from culture
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Abomination)
  expect(store.attributeMax(Attributes.body)).toEqual(config.pointLimits.attributes.max + 1)

  // Only bonus from concept
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Abomination)
  expect(store.attributeMax(Attributes.psyche)).toEqual(config.pointLimits.attributes.max + 1)

  // Both bonus from culture and concept
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Conqueror)
  expect(store.attributeMax(Attributes.body)).toEqual(config.pointLimits.attributes.max + 2)
})

test('Maximum skill value includes bonus from culture, concept and cult', () => {
  const store = useCharacterStore()

  // Only bonus from culture
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Anabaptists)
  expect(store.skillMax(Skills.athletics)).toEqual(config.pointLimits.skills.max + 1)

  // Only bonus from concept
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Anabaptists)
  expect(store.skillMax(Skills.domination)).toEqual(config.pointLimits.skills.max + 1)

  // Only bonus from cult
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Anabaptists)
  expect(store.skillMax(Skills.faith)).toEqual(config.pointLimits.skills.max + 1)

  // Bonuses from culture, concept and cult
  store.setCulture(config.cultures.Africa)
  store.setConcept(config.concepts.Zealot)
  store.setCult(config.cults.Hellvetics)
  expect(store.skillMax(Skills.reaction)).toEqual(config.pointLimits.skills.max + 3)
})

test('Attribute can be set above maximum in editor mode SoftLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to SoftLimits
  store.setEditorMode(EditorMode.SoftLimits)

  // And an attribute would be raised above the maximum
  store.setAttribute(Attributes.agility, 6)

  // Then the attribute is set to this value
  expect(store.attributeValue(Attributes.agility)).toEqual(6)
})

test('Skill can be set above maximum in editor mode SoftLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to SoftLimits
  store.setEditorMode(EditorMode.SoftLimits)

  // And a skill would be raised above the maximum
  store.setSkill(Skills.reaction, 6)

  // Then the skill is set to this value
  expect(store.skillValue(Skills.reaction)).toEqual(6)
})

test('Origin can be set above maximum in editor mode SoftLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to SoftLimits
  store.setEditorMode(EditorMode.SoftLimits)

  // And an origin would be raised above the maximum
  store.setOrigin(Origins.renown, 6)

  // Then the origin is set to this value
  expect(store.originValue(Origins.renown)).toEqual(6)
})

test('Setting the culture truncates the attribute value to the new maximum in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // And an attribute has the maximum value bounded by the culture
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setAttribute(Attributes.agility, 4)
  expect(store.attributeValue(Attributes.agility)).toEqual(4)
  expect(store.attributeMax(Attributes.agility)).toEqual(4)

  // When the culture is changed, the attribute is truncated to the new maximum
  store.setCulture(config.cultures.Africa)
  expect(store.attributeValue(Attributes.agility)).toEqual(3)
  expect(store.attributeMax(Attributes.agility)).toEqual(3)
})

test.each(NonTruncatingEditorModes)(
  'Setting the culture does not truncate the attribute value in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And an attribute has the maximum value bounded by the culture
    store.setCulture(config.cultures.Borca)
    store.setConcept(config.concepts.Abomination)
    store.setAttribute(Attributes.agility, 4)
    expect(store.attributeValue(Attributes.agility)).toEqual(4)

    // When the culture is changed
    store.setCulture(config.cultures.Africa)
    
    // Then the attribute remains the same, despite the maximum decreasing
    expect(store.attributeValue(Attributes.agility)).toEqual(4)
  }
)

test('Setting the culture truncates the skill value to the new maximum in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // And a skill has the maximum value bounded by the culture
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Spitalians)
  store.setSkill(Skills.artifactLore, 3)
  expect(store.skillValue(Skills.artifactLore)).toEqual(3)
  expect(store.skillMax(Skills.artifactLore)).toEqual(3)

  // When the culture is changed, the skill is truncated to the new maximum
  store.setCulture(config.cultures.Africa)
  expect(store.skillValue(Skills.artifactLore)).toEqual(2)
  expect(store.skillMax(Skills.artifactLore)).toEqual(2)
})

test.each(NonTruncatingEditorModes)(
  'Setting the culture does not truncate the skill value in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And a skill has the maximum value bounded by the culture
    store.setCulture(config.cultures.Borca)
    store.setConcept(config.concepts.Abomination)
    store.setCult(config.cults.Spitalians)
    store.setSkill(Skills.artifactLore, 3)
    expect(store.skillValue(Skills.artifactLore)).toEqual(3)

    // When the culture is changed, the skill remains the same, despite the maximum decreasing
    store.setCulture(config.cultures.Africa)
    expect(store.skillValue(Skills.artifactLore)).toEqual(3)
  }
)

test('Setting the concept truncates the attribute value to the new maximum in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // And an attribute has the maximum value bounded by the concept
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setAttribute(Attributes.psyche, 4)
  expect(store.attributeValue(Attributes.psyche)).toEqual(4)
  expect(store.attributeMax(Attributes.psyche)).toEqual(4)

  // When the concept is changed, the attribute is truncated to the new maximum
  store.setConcept(config.concepts.Zealot)
  expect(store.attributeValue(Attributes.psyche)).toEqual(3)
  expect(store.attributeMax(Attributes.psyche)).toEqual(3)
})

test.each(NonTruncatingEditorModes)(
  'Setting the concept does not truncate the attribute value in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And an attribute has the maximum value bounded by the concept
    store.setCulture(config.cultures.Borca)
    store.setConcept(config.concepts.Abomination)
    store.setAttribute(Attributes.psyche, 4)
    expect(store.attributeValue(Attributes.psyche)).toEqual(4)

    // When the concept is changed, the attribute remains the same, despite the maximum decreasing
    store.setConcept(config.concepts.Zealot)
    expect(store.attributeValue(Attributes.psyche)).toEqual(4)
  }
)

test('Setting the concept truncates the skill value to the new maximum in mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given a skill has the maximum value bounded by the concept
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Spitalians)
  store.setSkill(Skills.domination, 3)
  expect(store.skillValue(Skills.domination)).toEqual(3)
  expect(store.skillMax(Skills.domination)).toEqual(3)

  // When the concept is changed, the skill is truncated to the new maximum
  store.setConcept(config.concepts.Healer)
  expect(store.skillValue(Skills.domination)).toEqual(2)
  expect(store.skillMax(Skills.domination)).toEqual(2)
})

test.each(NonTruncatingEditorModes)(
  'Setting the concept does not truncate the skill value in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given a skill has the maximum value bounded by the concept
    store.setCulture(config.cultures.Borca)
    store.setConcept(config.concepts.Abomination)
    store.setCult(config.cults.Spitalians)
    store.setSkill(Skills.domination, 3)
    expect(store.skillValue(Skills.domination)).toEqual(3)

    // When the concept is changed, the skill remains the same, despite the maximum decreasing
    store.setConcept(config.concepts.Healer)
    expect(store.skillValue(Skills.domination)).toEqual(3)
  }
)

test('Setting the cult truncates the skill value to the new maximum in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given a skill has the maximum value bounded by the cult
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Spitalians)
  store.setSkill(Skills.medicine, 3)
  expect(store.skillValue(Skills.medicine)).toEqual(3)
  expect(store.skillMax(Skills.medicine)).toEqual(3)

  // When the cult is changed, the skill is truncated to the new maximum
  store.setCult(config.cults.Judges)
  expect(store.skillValue(Skills.medicine)).toEqual(2)
  expect(store.skillMax(Skills.medicine)).toEqual(2)
})

test.each(NonTruncatingEditorModes)(
  'Setting the cult does not truncate the skill value in mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given a skill has the maximum value bounded by the cult
    store.setCulture(config.cultures.Borca)
    store.setConcept(config.concepts.Abomination)
    store.setCult(config.cults.Spitalians)
    store.setSkill(Skills.medicine, 3)
    expect(store.skillValue(Skills.medicine)).toEqual(3)

    // When the cult is changed, the skill remains the same, despite the maximum decreasing
    store.setCult(config.cults.Judges)
    expect(store.skillValue(Skills.medicine)).toEqual(3)
  }
)

test('Truncating an attribute reduces the spent points', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given an attribute has the maximum value bounded by the concept
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setAttribute(Attributes.psyche, 4)
  expect(store.attributeValue(Attributes.psyche)).toEqual(4)
  expect(store.attributeMax(Attributes.psyche)).toEqual(4)

  // And the spent points reflect this
  expect(store.spentPoints.attributes).toEqual(3)

  // When the concept is changed, and the attribute is truncated to the new maximum
  store.setConcept(config.concepts.Zealot)
  expect(store.attributeValue(Attributes.psyche)).toEqual(3)
  expect(store.attributeMax(Attributes.psyche)).toEqual(3)

  // Then the spent points should be reduced
  expect(store.spentPoints.attributes).toEqual(2)
})

test('Truncating a skill reduces the spent points', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given a skill has the maximum value bounded by the cult
  store.setCulture(config.cultures.Borca)
  store.setConcept(config.concepts.Abomination)
  store.setCult(config.cults.Spitalians)
  store.setSkill(Skills.medicine, 3)
  expect(store.skillValue(Skills.medicine)).toEqual(3)
  expect(store.skillMax(Skills.medicine)).toEqual(3)

  // And the spent points reflect this
  expect(store.spentPoints.skills).toEqual(3)

  // When the cult is changed, and the skill is truncated to the new maximum
  store.setCult(config.cults.Judges)
  expect(store.skillValue(Skills.medicine)).toEqual(2)
  expect(store.skillMax(Skills.medicine)).toEqual(2)

  // Then the spent points should be reduced
  expect(store.spentPoints.skills).toEqual(2)
})

test('Choosing HardLimits mode reduces attributes, skills and origins to their maximum value', () => {
  const store = useCharacterStore()

  // Given free mode is on
  store.setEditorMode(EditorMode.Free)

  // And attribute skill and origin values are above their natural maximum
  store.setAttribute(Attributes.body, 6)
  store.setSkill(Skills.medicine, 6)
  store.setOrigin(Origins.renown, 4)

  // When the character is set to HardLimits mode
  store.setEditorMode(EditorMode.HardLimits)

  // Then attribute skill and origin values are reduced to their maximum
  expect(store.attributeValue(Attributes.body)).toEqual(4)
  expect(store.attributeMax(Attributes.body)).toEqual(4)
  expect(store.skillValue(Skills.medicine)).toEqual(3)
  expect(store.skillMax(Skills.medicine)).toEqual(3)
  expect(store.originValue(Origins.renown)).toEqual(3)
  expect(store.originMax).toEqual(3)
})
