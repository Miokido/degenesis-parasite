import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store/index'
import { expect, test, beforeEach } from 'vitest'

import { Attributes, Origins, Skills } from '../../src/config/properties'
import { Asceticism, MovingMountains } from '../../src/config/potentials/common'
import { EditorMode } from '../../src/config/modes'

beforeEach(() => {
  setActivePinia(createPinia())
})

const NonTruncatingEditorModes = [EditorMode.Free, EditorMode.SoftLimits]

test('An unmodified character has zero spent points', () => {
  const store = useCharacterStore()
  expect(store.spentPoints.attributes).toEqual(0)
  expect(store.spentPoints.skills).toEqual(0)
  expect(store.spentPoints.origins).toEqual(0)
})

test('Spent attribute points are calculated', () => {
  const store = useCharacterStore()

  expect(store.spentPoints.attributes).toEqual(0)
  store.setAttribute(Attributes.body, 2)
  expect(store.spentPoints.attributes).toEqual(1)
  store.setAttribute(Attributes.psyche, 3)
  expect(store.spentPoints.attributes).toEqual(3)

  // Reducing attributes reduces spent points
  store.setAttribute(Attributes.body, 1)
})

test('Spent skill points are calculated', () => {
  const store = useCharacterStore()

  expect(store.spentPoints.skills).toEqual(0)
  store.setSkill(Skills.focus, 1)
  expect(store.spentPoints.skills).toEqual(1)
  store.setSkill(Skills.athletics, 3)
  expect(store.spentPoints.skills).toEqual(4)

  // Reducing skills reduces spent points
  store.setSkill(Skills.focus, 0)
  expect(store.spentPoints.skills).toEqual(3)
})

test('Spent origin points are calculated', () => {
  const store = useCharacterStore()

  expect(store.spentPoints.origins).toEqual(0)
  store.setOrigin(Origins.renown, 1)
  expect(store.spentPoints.origins).toEqual(1)
  store.setOrigin(Origins.resources, 3)
  expect(store.spentPoints.origins).toEqual(4)

  // Reducing origins reduces spent points
  store.setOrigin(Origins.renown, 0)
  expect(store.spentPoints.origins).toEqual(3)
})

test('Spent potential points are calculated', () => {
  const store = useCharacterStore()

  expect(store.spentPoints.potentials).toEqual(0)
  store.setPotential(Asceticism, 1)
  expect(store.spentPoints.potentials).toEqual(1)
  store.setPotential(MovingMountains, 3)
  expect(store.spentPoints.potentials).toEqual(4)

  // Reducing potentials reduces spent points
  store.setPotential(Asceticism, 0)
  expect(store.spentPoints.potentials).toEqual(3)
})

test('Attribute point spend is capped in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given the attribute point limit is almost reached (9 points spent)
  store.setAttribute(Attributes.body, 3)
  store.setAttribute(Attributes.agility, 3)
  store.setAttribute(Attributes.charisma, 3)
  store.setAttribute(Attributes.intellect, 3)
  store.setAttribute(Attributes.psyche, 2)

  // When the attribute point limit would be exceeded (11/10 points)
  store.setAttribute(Attributes.instinct, 3)

  // Then the attribute point limit is not exceeded
  expect(store.spentPoints.attributes).toEqual(10)

  // Then the increase is capped
  expect(store.attributeValue(Attributes.instinct)).toEqual(2)
})

test.each(NonTruncatingEditorModes)(
  'Attribute point spend is not capped in editor mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given the attribute point limit is almost reached (9 points spent)
    store.setAttribute(Attributes.body, 3)
    store.setAttribute(Attributes.agility, 3)
    store.setAttribute(Attributes.charisma, 3)
    store.setAttribute(Attributes.intellect, 3)
    store.setAttribute(Attributes.psyche, 2)

    // When the attribute point limit would be exceeded (11/10 points)
    store.setAttribute(Attributes.instinct, 3)

    // Then the attribute point limit is exceeded
    expect(store.spentPoints.attributes).toEqual(11)

    // And the increase is fully applied
    expect(store.attributeValue(Attributes.instinct)).toEqual(3)
  }
)

test('Skill point spend is capped in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given the skill point limit is almost reached (27 points spent)
  store.setSkill(Skills.athletics, 2)
  store.setSkill(Skills.brawl, 2)
  store.setSkill(Skills.force, 2)
  store.setSkill(Skills.melee, 2)
  store.setSkill(Skills.stamina, 2)
  store.setSkill(Skills.crafting, 2)
  store.setSkill(Skills.dexterity, 2)
  store.setSkill(Skills.navigation, 2)
  store.setSkill(Skills.mobility, 2)
  store.setSkill(Skills.projectiles, 2)
  store.setSkill(Skills.stealth, 2)
  store.setSkill(Skills.arts, 2)
  store.setSkill(Skills.conduct, 2)
  store.setSkill(Skills.expression, 1)

  // When the skill point limit would be exceeded (29/28 points)
  store.setSkill(Skills.leadership, 2)

  // Then the skill point limit is not exceeded
  expect(store.spentPoints.skills).toEqual(28)

  // Then the increase is capped
  expect(store.skillValue(Skills.leadership)).toEqual(1)
})

test.each(NonTruncatingEditorModes)(
  'Skill point spend is not capped in editor mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given the skill point limit is almost reached (27 points spent)
    store.setSkill(Skills.athletics, 2)
    store.setSkill(Skills.brawl, 2)
    store.setSkill(Skills.force, 2)
    store.setSkill(Skills.melee, 2)
    store.setSkill(Skills.stamina, 2)
    store.setSkill(Skills.crafting, 2)
    store.setSkill(Skills.dexterity, 2)
    store.setSkill(Skills.navigation, 2)
    store.setSkill(Skills.mobility, 2)
    store.setSkill(Skills.projectiles, 2)
    store.setSkill(Skills.stealth, 2)
    store.setSkill(Skills.arts, 2)
    store.setSkill(Skills.conduct, 2)
    store.setSkill(Skills.expression, 1)

    // When the skill point limit would be exceeded (29/28 points)
    store.setSkill(Skills.leadership, 2)

    // Then the skill point limit is exceeded
    expect(store.spentPoints.skills).toEqual(29)

    // Then the increase is fully applied
    expect(store.skillValue(Skills.leadership)).toEqual(2)
  }
)

test('Origin point spend is capped in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given the origin point limit is almost reached (3 points spent)
  store.setOrigin(Origins.renown, 3)

  // When the origin point limit would be exceeded (5/4 points)
  store.setOrigin(Origins.authority, 2)

  // Then the origin point limit is not exceeded
  expect(store.spentPoints.origins).toEqual(4)

  // Then the increase is capped
  expect(store.originValue(Origins.authority)).toEqual(1)
})

test.each(NonTruncatingEditorModes)(
  'Origin point spend is not capped in editor mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given the origin point limit is almost reached (3 points spent)
    store.setOrigin(Origins.renown, 3)

    // When the origin point limit would be exceeded (5/4 points)
    store.setOrigin(Origins.authority, 2)

    // Then the origin point limit is exceeded
    expect(store.spentPoints.origins).toEqual(5)

    // Then the increase is fully applied
    expect(store.originValue(Origins.authority)).toEqual(2)
  }
)

test('Potential point spend is capped in editor mode HardLimits', () => {
  const store = useCharacterStore()

  // Given the editor mode is set to HardLimits
  store.setEditorMode(EditorMode.HardLimits)

  // Given the potential point limit is reached (1 point spent)
  store.setPotential(Asceticism, 1)

  // When the potential point limit would be exceeded (2/1 points)
  store.setPotential(MovingMountains, 1)

  // Then the potential point limit is not exceeded
  expect(store.spentPoints.potentials).toEqual(1)

  // And the increase is capped
  expect(store.potentialValue(MovingMountains)).toEqual(0)
})

test.each(NonTruncatingEditorModes)(
  'Potential point spend is not capped in editor mode %s',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // Given the potential point limit is reached (1 point spent)
    store.setPotential(Asceticism, 1)

    // When the potential point limit would be exceeded (2/1 points)
    store.setPotential(MovingMountains, 1)

    // Then the origin point limit is exceeded
    expect(store.spentPoints.potentials).toEqual(2)

    // Then the increase is fully applied
    expect(store.potentialValue(MovingMountains)).toEqual(1)
  }
)
