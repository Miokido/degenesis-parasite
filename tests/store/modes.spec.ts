import { beforeEach, expect, test } from 'vitest'

import { EditorMode } from '../../src/config/modes'
import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '../../src/store'
import { Attributes, Origins, Skills } from '../../src/config/properties'

beforeEach(() => {
    setActivePinia(createPinia())
  })

test('Default mode is SoftLimits', () => {
  expect(EditorMode.Default).toEqual(EditorMode.SoftLimits)
})

test.each([EditorMode.Free, EditorMode.SoftLimits])(
  'HardLimits mode cannot be entered from mode %s if attribute point limits are violated',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And the attribute point limit is exceeded (11/10)
    store.setAttribute(Attributes.body, 3)
    store.setAttribute(Attributes.agility, 3)
    store.setAttribute(Attributes.charisma, 3)
    store.setAttribute(Attributes.intellect, 3)
    store.setAttribute(Attributes.psyche, 3)
    store.setAttribute(Attributes.instinct, 2)
    expect(store.spentPoints.attributes).toEqual(11)

    // When the editor mode would be changed to HardLimits
    store.setEditorMode(EditorMode.HardLimits)

    // Then the editor mode is not changed
    expect(store.editorMode).toEqual(editorMode)

    // And the attribute point limit is still exceeded
    expect(store.spentPoints.attributes).toEqual(11)
  }
)

test.each([EditorMode.Free, EditorMode.SoftLimits])(
  'HardLimits mode cannot be entered from mode %s if skill point limits are violated',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And the skill point limit is exceeded (29/28)
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
    store.setSkill(Skills.expression, 2)
    store.setSkill(Skills.leadership, 1)

    // When the editor mode would be changed to HardLimits
    store.setEditorMode(EditorMode.HardLimits)

    // Then the editor mode is not changed
    expect(store.editorMode).toEqual(editorMode)

    // And the skill point limit is still exceeded
    expect(store.spentPoints.skills).toEqual(29)
  }
)

test.each([EditorMode.Free, EditorMode.SoftLimits])(
  'HardLimits mode cannot be entered from mode %s if origin point limits are violated',
  (editorMode) => {
    const store = useCharacterStore()

    // Given the editor mode is set to a mode which does not truncate
    store.setEditorMode(editorMode)

    // And the origin point limit is exceeded (5/4)
    store.setOrigin(Origins.renown, 3)
    store.setOrigin(Origins.resources, 2)

    // When the editor mode would be changed to HardLimits
    store.setEditorMode(EditorMode.HardLimits)

    // Then the editor mode is not changed
    expect(store.editorMode).toEqual(editorMode)

    // And the origin point limit is still exceeded
    expect(store.spentPoints.origins).toEqual(5)
  }
)