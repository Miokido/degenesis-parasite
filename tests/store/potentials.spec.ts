import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import config from '../../src/config'
import { EditorMode } from '../../src/config/modes'
import { AllPotentials } from '../../src/config/potentials'
import {
  DemiurgesBane,
  ParadiseLost,
  RealmOfEmanations,
  Torchbearer,
  Zealot
} from '../../src/config/cults/anabaptists/potentials'
import { Traffic } from '../../src/config/cults/apocalyptics/potentials'
import { Marathon, MovingMountains, NumberCruncher } from '../../src/config/potentials/common'
import { Attributes, Origins, Skills } from '../../src/config/properties'
import { Elysian, Touched } from '../../src/config/cults/anabaptists/ranks'
import { useCharacterStore } from '../../src/store/index'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('Potentials: mental power/resistance requirements contain correct skills', () => {
  // FIXME: It would be much better to enforce this with the type system

  // Iterate within test so as to not pollute test outputs with redundant lines
  AllPotentials.forEach((potential) => {
    // mental power
    expect(
      [Skills.focus.name, Skills.primal.name, ''],
      `Potential "${potential.name}" has invalid mental power skill`
    ).toContain(potential.mentalPowerSkill?.name || '')

    // mental resistance
    expect(
      [Skills.faith.name, Skills.willpower.name, ''],
      `Potential "${potential.name}" has invalid mental resistance skill`
    ).toContain(potential.mentalResistanceSkill?.name || '')
  })
})

test('Characters have no potentials by default', () => {
  const store = useCharacterStore()
  expect(store.potentials).toEqual(new Map())
  expect(store.potentialValue(Marathon)).toEqual(0)
})

test('Potential can be set if it is attainable (if it has no requirements)', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfills all prerequisites of the Zealot potential (of which there are none)
  store.setCult(config.cults.Anabaptists)

  // When the Zealot potential is set
  store.setPotential(Zealot, 1)

  // Then the Zealot potential is actually set
  expect(store.potentialValue(Zealot)).toEqual(1)
})

test('Potential cannot be set if it is not attainable due to a cult conflict', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and does not fulfil the prerequisites of the RealmOfEmanations potential
  store.setCult(config.cults.Anabaptists)

  // When the RealmOfEmanations potential is set
  store.setPotential(RealmOfEmanations, 1)

  // Then the RealmOfEmanations potential cannot be set
  expect(store.potentialValue(RealmOfEmanations)).toEqual(0)
})

test('Common potential can be set if it is attainable', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfills all prerequisites of the MovingMountains potential (of which there are none)
  store.setCult(config.cults.Anabaptists)

  // When the MovingMountains potential is set
  store.setPotential(MovingMountains, 2)

  // Then the MovingMountains potential is actually set
  expect(store.potentialValue(MovingMountains)).toEqual(2)
})

test('Potential can be set if it fulfills the attribute requirements', () => {
  const store = useCharacterStore()

  // If the character fulfills the prerequisites of the NumberCruncher potential
  store.setAttribute(Attributes.intellect, 4)

  // When the NumberCruncher potential is set
  store.setPotential(NumberCruncher, 2)

  // Then the NumberCruncher potential is actually set
  expect(store.potentialValue(NumberCruncher)).toEqual(2)
})

test('Potential cannot be set if it it does not fulfill the attribute requirements', () => {
  const store = useCharacterStore()

  // If the character does not fulfill the prerequisites of the NumberCruncher potential
  store.setAttribute(Attributes.intellect, 3)

  // When the NumberCruncher potential is set
  store.setPotential(NumberCruncher, 2)

  // Then the NumberCruncher potential is not set
  expect(store.potentialValue(NumberCruncher)).toEqual(0)
})

test('Potential is removed if it does no longer fulfill the attribute requirements', () => {
  const store = useCharacterStore()

  // If the character fulfills the prerequisites of the NumberCruncher potential
  store.setAttribute(Attributes.intellect, 4)

  // And the NumberCruncher potential is set
  store.setPotential(NumberCruncher, 2)
  expect(store.potentialValue(NumberCruncher)).toEqual(2)

  // When the character no longer meets the requirements
  store.setAttribute(Attributes.intellect, 3)

  // Then the NumberCruncher potential is removed
  expect(store.potentialValue(NumberCruncher)).toEqual(0)
})

test('Potential is removed if rank is dropped', () => {
  const store = useCharacterStore()

  // If the character fulfills the prerequisites of the Torchbearer potential
  store.setEditorMode(EditorMode.Free)
  store.setCult(config.cults.Anabaptists)
  store.setAttribute(Attributes.body, 6)
  store.setAttribute(Attributes.charisma, 6)
  store.setAttribute(Attributes.psyche, 6)
  store.setAttribute(Attributes.intellect, 6)
  store.setSkill(Skills.medicine, 6)
  store.setOrigin(Origins.renown, 6)
  store.setOrigin(Origins.secrets, 6)
  store.setRank(Elysian)
  expect(store.rank.name).toEqual(Elysian.name)

  // When the Torchbearer potential is set
  store.setPotential(Torchbearer, 2)

  // Then the Torchbearer potential is actually set
  expect(store.potentialValue(Torchbearer)).toEqual(2)

  // When the character rank is dropped
  store.setRank(Touched)

  // And the Torchbearer potential is removed
  expect(store.potentialValue(Torchbearer)).toEqual(0)
})

test('Potential is removed if it no longer fulfills the rank requirements', () => {
  const store = useCharacterStore()

  // If the character fulfills the prerequisites of the Torchbearer potential
  store.setEditorMode(EditorMode.Free)
  store.setCult(config.cults.Anabaptists)
  store.setAttribute(Attributes.body, 6)
  store.setAttribute(Attributes.charisma, 6)
  store.setAttribute(Attributes.psyche, 6)
  store.setAttribute(Attributes.intellect, 6)
  store.setSkill(Skills.medicine, 6)
  store.setOrigin(Origins.renown, 6)
  store.setOrigin(Origins.secrets, 6)
  store.setRank(Elysian)
  expect(store.rank.name).toEqual(Elysian.name)

  // When the Torchbearer potential is set
  store.setPotential(Torchbearer, 2)

  // Then the Torchbearer potential is actually set
  expect(store.potentialValue(Torchbearer)).toEqual(2)

  // When the character no longer meets the requirements of the rank
  store.setSkill(Skills.medicine, 0)

  // Then the rank is dropped
  expect(store.rank.name).toEqual(Touched.name)

  // And the Torchbearer potential is removed
  expect(store.potentialValue(Torchbearer)).toEqual(0)
})

test('Potential is removed if skill prerequisites no longer met', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfils the prerequisites of the RealmOfEmanations potential
  store.setCult(config.cults.Anabaptists)
  store.setEditorMode(EditorMode.Free)
  store.setAttribute(Attributes.psyche, 6)
  store.setSkill(Skills.faith, 2)

  // And the RealmOfEmanations potential is set
  store.setPotential(RealmOfEmanations, 3)
  expect(store.potentialValue(RealmOfEmanations)).toEqual(3)

  // When the character no longer meets the requirements
  store.setAttribute(Attributes.psyche, 5)

  // Then the RealmOfEmanations potential is removed
  expect(store.potentialValue(RealmOfEmanations)).toEqual(0)
})

test('Potential is removed if mental resistance prerequisite no longer met', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfils the prerequisites of the ParadiseLost potential
  store.setCult(config.cults.Anabaptists)
  store.setEditorMode(EditorMode.Free)
  store.setSkill(Skills.faith, 1)
  expect(store.mentalResistanceSkill.name).toEqual(Skills.faith.name)

  // And the ParadiseLost potential is set
  store.setPotential(ParadiseLost, 3)
  expect(store.potentialValue(ParadiseLost)).toEqual(3)

  // When the character no longer meets the requirement
  store.setSkill(Skills.willpower, 1)

  // Then the ParadiseLost potential is removed
  expect(store.potentialValue(ParadiseLost)).toEqual(0)
})

test('Potential is removed if mental power prerequisite no longer met', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfils the prerequisites of the DemiurgesBane potential
  store.setCult(config.cults.Anabaptists)
  store.setEditorMode(EditorMode.Free)
  store.setSkill(Skills.focus, 1)
  expect(store.mentalPowerSkill.name).toEqual(Skills.focus.name)

  // And the DemiurgesBane potential is set
  store.setPotential(DemiurgesBane, 3)
  expect(store.potentialValue(DemiurgesBane)).toEqual(3)

  // When the character no longer meets the requirement
  store.setSkill(Skills.primal, 1)

  // Then the DemiurgesBane potential is removed
  expect(store.potentialValue(DemiurgesBane)).toEqual(0)
})

test('Potential is removed if origin prerequisite no longer met', () => {
  const store = useCharacterStore()

  // If the character is an Apocalyptic and fulfils the prerequisites of the Traffic potential
  store.setCult(config.cults.Apocalyptics)
  store.setEditorMode(EditorMode.Free)
  store.setOrigin(Origins.network, 4)

  // And the Traffic potential is set
  store.setPotential(Traffic, 3)
  expect(store.potentialValue(Traffic)).toEqual(3)

  // When the character no longer meets the requirement
  store.setOrigin(Origins.network, 3)

  // Then the Traffic potential is removed
  expect(store.potentialValue(Traffic)).toEqual(0)
})

test('Potential is removed if cult is changed and it is no longer attainable', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfills all prerequisites of the Anabaptist Zealot potential (of which there are none)Anabaptist
  store.setCult(config.cults.Anabaptists)

  // And the MovingMountains potential is set
  store.setPotential(Zealot, 2)
  expect(store.potentialValue(Zealot)).toEqual(2)

  // When the cult is changed to Spitalians
  store.setCult(config.cults.Spitalians)

  // Then the Zealot potential is removed
  expect(store.potentialValue(Zealot)).toEqual(0)
})

test('Potential is not removed if cult is changed and it is still attainable', () => {
  const store = useCharacterStore()

  // If the character is an Anabaptist and fulfills all prerequisites of the common MovingMountains potential (of which there are none)Anabaptist
  store.setCult(config.cults.Anabaptists)

  // And the MovingMountains potential is set
  store.setPotential(MovingMountains, 2)
  expect(store.potentialValue(MovingMountains)).toEqual(2)

  // When the cult is changed to Spitalians
  store.setCult(config.cults.Spitalians)

  // Then the MovingMountains potential is still present
  expect(store.potentialValue(MovingMountains)).toEqual(2)
})
