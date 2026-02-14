import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import config from '../../src/config'
import { EditorMode } from '../../src/config/modes'
import { Attributes, Skills } from '../../src/config/properties'
import { Albatross, Finch, Pelican, Seagull, Tern } from '../../src/config/cults/apocalyptics/ranks'
import { Hagari } from '../../src/config/cults/jehammedans/ranks'
import { Dufu } from '../../src/config/cults/scourgers/ranks'
import { Scout } from '../../src/config/cults/clanners/clans/hunterGatherers'
import { Chiot } from '../../src/config/cults/clanners/clans/touloni'
import { Orderly, Recruit, Famulancer } from '../../src/config/cults/spitalians/ranks'
import { useCharacterStore } from '../../src/store/index'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Ranks contain all their ancestors', () => {
  expect(
    Array.from(Recruit.ancestors)
      .map((r) => r.name)
      .sort()
  ).toEqual([])

  expect(
    Array.from(Orderly.ancestors)
      .map((r) => r.name)
      .sort()
  ).toEqual([Recruit.name].sort())

  expect(
    Array.from(Famulancer.ancestors)
      .map((r) => r.name)
      .sort()
  ).toEqual([Recruit.name, Orderly.name].sort())

  expect(
    Array.from(Albatross.ancestors)
      .map((r) => r.name)
      .sort()
  ).toEqual([Tern.name, Seagull.name, Pelican.name].sort())
})

test('Characters always have at least the minimum rank of their cult', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian
  store.setCult(config.cults.Spitalians)

  // Then they are Recruit
  expect(store.rank).toEqual(Recruit)

  // And if the character is an Apocalyptics character
  store.setCult(config.cults.Apocalyptics)

  // Then they are Finch
  expect(store.rank.name).toEqual(Finch.name)
})

test('Characters always have at least the minimum rank of their cult, alphabetically ordered', () => {
  const store = useCharacterStore()

  // If the character is a Jehammedan
  store.setCult(config.cults.Jehammedans)

  // Then they are Hagari (as opposed to Ismaeli, Isaaki, Saraeli)
  expect(store.rank.name).toEqual(Hagari.name)
})

test('Characters always have at least the minimum _regular_ rank of their cult', () => {
  const store = useCharacterStore()

  // If the character is a Jehammedan
  store.setCult(config.cults.Scourgers)

  // Then they are Dufu (as opposed to Kifu, which is rank 0)
  expect(store.rank.name).toEqual(Dufu.name)
})

test('Rank can be set if it is attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and fulfills all prerequisites of the Orderly rank
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 2)
  store.setAttribute(Attributes.intellect, 2)
  store.setSkill(Skills.medicine, 2)
  store.setSkill(Skills.stamina, 2)

  // Then the Orderly rank can be set
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Orderly.name)
})

test('Rank cannot be set if it is not attainable', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and does not fulfil the prerequisites of the Orderly
  store.setCult(config.cults.Spitalians)

  // Then the Orderly rank cannot be set
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Recruit.name)
})

test('Rank can be set if it is not attainable even if free mode is on', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian and does not fulfil the prerequisites of the Orderly
  store.setCult(config.cults.Spitalians)

  // And free mode is on
  store.setEditorMode(EditorMode.Free)

  // Then the Orderly rank cannot be set
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Recruit.name)
})

test('Rank cannot be set if the cult does not match even if free mode is on', () => {
  const store = useCharacterStore()

  // If the character is an Apocalyptic
  store.setCult(config.cults.Apocalyptics)

  // And free mode is on
  store.setEditorMode(EditorMode.Free)

  // Then the Recruit rank cannot be set
  store.setRank(Recruit)
  expect(store.rank.name).toEqual(Finch.name)
})

test('Rank is reduced to the minimum if cult is changed', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian Orderly
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 2)
  store.setAttribute(Attributes.intellect, 2)
  store.setSkill(Skills.medicine, 2)
  store.setSkill(Skills.stamina, 2)
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Orderly.name)

  // And the cult is changed to Apocalyptics
  store.setCult(config.cults.Apocalyptics)

  // Then the rank is reduced to the Finch
  expect(store.rank.name).toEqual(Finch.name)
})

test('Rank is reduced to the new minimum if clan is changed', () => {
  const store = useCharacterStore()

  // If the character is a hunter gatherer Scout
  store.setCult(config.cults.Clanners)
  store.setClan(config.clans.HunterGatherers)
  expect(store.rank.name).toEqual(Scout.name)

  // When the clan is changed to Touloni
  store.setClan(config.clans.Touloni)

  // Then the rank is set to the lowest Touloni rank
  expect(store.rank.name).toEqual(Chiot.name)
})

test('Rank is reduced to the minimum if prerequisites no longer met', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian Orderly
  store.setCult(config.cults.Spitalians)
  store.setAttribute(Attributes.body, 2)
  store.setAttribute(Attributes.intellect, 2)
  store.setSkill(Skills.medicine, 2)
  store.setSkill(Skills.stamina, 2)
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Orderly.name)

  // When the character no longer meets the requirements
  store.setAttribute(Attributes.body, 1)

  // Then the rank is reduced to Recruit
  expect(store.rank.name).toEqual(Recruit.name)
})

test('Rank is reduced to the minimum if free mode is exited and prerequisites no longer met', () => {
  const store = useCharacterStore()

  // If the character is a Spitalian Orderly created with free mode
  store.setCult(config.cults.Spitalians)
  store.setEditorMode(EditorMode.Free)
  store.setAttribute(Attributes.body, 6)
  store.setAttribute(Attributes.intellect, 6)
  store.setRank(Orderly)
  expect(store.rank.name).toEqual(Orderly.name)

  // When the character is set to HardLimits mode mode (which reduces the atributes, causing the character to lose eligibility)
  store.setEditorMode(EditorMode.HardLimits)

  // Then the rank is reduced to Recruit
  expect(store.rank.name).toEqual(Recruit.name)
})
