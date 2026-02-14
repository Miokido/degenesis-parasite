import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import config from '../../src/config'
import { Attributes, Origins, Skills } from '../../src/config/properties'
import { Finch, Hummingbird, Tern } from '../../src/config/cults/apocalyptics/ranks'
import { Chiot } from '../../src/config/cults/clanners/clans/touloni'
import { Scout } from '../../src/config/cults/clanners/clans/hunterGatherers'
import {
  FieldMedic,
  Orderly,
  Preservist,
  Recruit,
  Registrar
} from '../../src/config/cults/spitalians/ranks'
import { useCharacterStore } from '../../src/store/index'
import { EditorMode } from '../../src/config/modes'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Attainable ranks are filtered by cult', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian
  store.setCult(config.cults.Spitalians)

  // Then only the Spitalian ranks are eligible
  expect(store.eligibleRanks).toEqual(new Set([Recruit]))

  // And when the cult is changed to Apocalyptics
  store.setCult(config.cults.Apocalyptics)

  // Then only the Apocalyptics ranks are eligible
  expect(store.eligibleRanks).toEqual(new Set([Finch, Tern, Hummingbird]))
})

test('A rank is attainable if the skills are sufficient and any parent is attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfills all skill prerequisites of the Orderly rank
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 2)
  store.setSkill(Skills.stamina, 2)
  store.setAttribute(Attributes.intellect, 2)
  store.setSkill(Skills.medicine, 2)

  // Then the Orderly rank is attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).toContainEqual(Orderly.name)
})

test('A rank is not attainable if the skills are not sufficient', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and does not fulfill all skill prerequisites of the Orderly rank
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 2)
  store.setSkill(Skills.stamina, 2)
  store.setAttribute(Attributes.intellect, 2)
  store.setSkill(Skills.medicine, 1)

  // Then the Orderly rank is not attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).not.toContainEqual(Orderly.name)
})

test('A rank is attainable if the skills and origins are sufficient and any parent is attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfills all skill prerequisites of the Preservist rank
  createPreservist(store)

  // Then the Preservist rank is attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).toContainEqual(Preservist.name)
})

test('A rank is not attainable if the origins are not sufficient', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfills all skill prerequisites of the Preservist rank, but not the Origin prerequisite
  createPreservist(store)
  store.setOrigin(Origins.renown, 3) // required: 4

  // Then the Preservist rank is not attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).not.toContainEqual(Preservist.name)
})

test('A rank is not attainable if any transitive parent is not attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfils the prerequisites of the rank Preservist, but does not fulfill the prerequisites of the rank Orderly
  createPreservist(store)
  store.setAttribute(Attributes.body, 3)
  store.setSkill(Skills.stamina, 0) // required: 1

  // Then the Preservist rank is not attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).not.toContainEqual(Preservist.name)
})

test('A rank is attainable if any of its parents are attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfils the prerequisites of the rank Surgeon, but not Field Medic
  createSurgeon(store)

  // And the character fulfils the prerequisites of the rank Registrar
  store.setOrigin(Origins.allies, 5)
  store.setOrigin(Origins.renown, 4)
  store.setOrigin(Origins.secrets, 4)

  // Then the Registrar rank is attainable, even though Field Medic is not
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).toContainEqual(Registrar.name)
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).not.toContainEqual(FieldMedic.name)
})

test('A clan-specific rank is only attainable if the required clan is set', () => {
  const store = useCharacterStore()

  // Given the character is a Touloni clanner
  createTouloni(store)
  expect(store.clan.name).toEqual(config.clans.Touloni.name)

  // Then the first Touloni rank is attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).toContainEqual(Chiot.name)

  // And the first hunter gatherer rank is not attainable
  expect(Array.from(store.eligibleRanks).map((r) => r.name)).not.toContainEqual(Scout.name)
})

function createPreservist(store) {
  store.setEditorMode(EditorMode.Free)
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 6)
  store.setAttribute(Attributes.intellect, 6)
  store.setAttribute(Attributes.agility, 6)
  store.setSkill(Skills.melee, 6)
  store.setSkill(Skills.toughness, 6)
  store.setOrigin(Origins.renown, 6)
  store.setSkill(Skills.stamina, 6)
}

function createSurgeon(store) {
  store.setEditorMode(EditorMode.Free)
  store.setCult(config.cults.Spitalians)
  Object.values(Attributes).forEach((attr) => store.setAttribute(attr, 6))
  Object.values(Skills).forEach((skill) => store.setSkill(skill, 6))
  store.setOrigin(Origins.renown, 4)
}

function createTouloni(store) {
  store.setEditorMode(EditorMode.Free)
  store.setCult(config.cults.Clanners)
  store.setClan(config.clans.Touloni)
}
