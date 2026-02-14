import { expect, test } from 'vitest'
import { Attributes, Origins, Skills } from '../../src/config/properties'
import { Hagari } from '../../src/config/cults/jehammedans/ranks'
import { atLeastRank, eitherRank } from '../../src/config/ranks/ranks'
import { Orderly, Preservist, Surgeon } from '../../src/config/cults/spitalians/ranks'
import {
  atLeastAttribute,
  atLeastOrigin,
  atLeastSkill,
  either
} from '../../src/config/requirements'

test('atLeastOrigin is correctly calculated for a single origin', () => {
  // Given an origin with value
  const value = 2
  const origin = Origins.renown.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(atLeastOrigin(Origins.renown, value - 1).check([origin])).toBeTruthy()

  // When the requirement is equal to the value, then the requirement is fulfilled
  expect(atLeastOrigin(Origins.renown, value).check([origin])).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(atLeastOrigin(Origins.renown, value + 1).check([origin])).toBeFalsy()
})

test('atLeastOrigin is correctly calculated for multiple origins', () => {
  // Given an origin with value
  const value = 2
  const origin = Origins.renown.withValue(value)
  const anotherOrigin = Origins.resources.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(atLeastOrigin(Origins.renown, value).check([origin, anotherOrigin])).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(atLeastOrigin(Origins.renown, value + 1).check([origin, anotherOrigin])).toBeFalsy()

  // When the required origin is not present, then the requirement is not fulfilled
  expect(atLeastOrigin(Origins.renown, value).check([anotherOrigin])).toBeFalsy()

  // When the required origin is present multiple times, and at least one instance fulfills the check, then the requirement is fulfilled
  expect(
    atLeastOrigin(Origins.renown, value).check([origin, Origins.renown.withValue(value + 1)])
  ).toBeTruthy()
  // (This case shouldn't happen, but it is not enforced by the type system)
})

test('atLeastSkill is correctly calculated for a single skill', () => {
  // Given a skill with value
  const value = 2
  const skill = Skills.athletics.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(atLeastSkill(Skills.athletics, value - 1).check([skill])).toBeTruthy()

  // When the requirement is equal to the value, then the requirement is fulfilled
  expect(atLeastSkill(Skills.athletics, value).check([skill])).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(atLeastSkill(Skills.athletics, value + 1).check([skill])).toBeFalsy()
})

test('atLeastSkill is correctly calculated for multiple skills', () => {
  // Given a skill with value
  const value = 2
  const skill = Skills.athletics.withValue(value)
  const anotherSkill = Skills.toughness.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(atLeastSkill(Skills.athletics, value - 1).check([skill, anotherSkill])).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(atLeastSkill(Skills.athletics, value + 1).check([skill, anotherSkill])).toBeFalsy()

  // When the required origin is not present, then the requirement is not fulfilled
  expect(atLeastSkill(Skills.athletics, value).check([anotherSkill])).toBeFalsy()

  // When the required skill is present multiple times, and at least one instance fulfills the check, then the requirement is fulfilled
  expect(
    atLeastSkill(Skills.athletics, value).check([skill, Skills.athletics.withValue(value + 1)])
  ).toBeTruthy()
  // (This case shouldn't happen, but it is not enforced by the type system)
})

test('atLeastAttribute is correctly calculated for a single attribute', () => {
  // Given an attribute with value
  const value = 2
  const attribute = Attributes.agility.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(atLeastAttribute(Attributes.agility, value - 1).check([attribute])).toBeTruthy()

  // When the requirement is equal to the value, then the requirement is fulfilled
  expect(atLeastAttribute(Attributes.agility, value).check([attribute])).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(atLeastAttribute(Attributes.agility, value + 1).check([attribute])).toBeFalsy()
})

test('atLeastAttribute is correctly calculated for multiple attributes', () => {
  // Given an attribute with value
  const value = 2
  const attribute = Attributes.agility.withValue(value)
  const anotherAttribute = Attributes.body.withValue(value)

  // When the requirement is lower than the value, then the requirement is fulfilled
  expect(
    atLeastAttribute(Attributes.agility, value - 1).check([attribute, anotherAttribute])
  ).toBeTruthy()

  // When the requirement is higher than the value, then the requirement is not fulfilled
  expect(
    atLeastAttribute(Attributes.agility, value + 1).check([attribute, anotherAttribute])
  ).toBeFalsy()

  // When the required attribute is not present, then the requirement is not fulfilled
  expect(atLeastAttribute(Attributes.agility, value).check([anotherAttribute])).toBeFalsy()

  // When the required attribute is present multiple times, and at least one instance fulfills the check, then the requirement is fulfilled
  expect(
    atLeastAttribute(Attributes.agility, value).check([
      attribute,
      Attributes.agility.withValue(value + 1)
    ])
  ).toBeTruthy()
  // (This case shouldn't happen, but it is not enforced by the type system)
})

test('Either is correctly calculated', () => {
  // Given two requirements for the same property type
  const requirement = atLeastAttribute(Attributes.agility, 2)
  const requirement2 = atLeastAttribute(Attributes.body, 2)

  // When both requirements are fulfilled, then the requirement is fulfilled
  expect(
    either(requirement, requirement2).check([
      Attributes.agility.withValue(2),
      Attributes.body.withValue(2)
    ])
  ).toBeTruthy()

  // When one of the requirements is fulfilled, then the requirement is still fulfilled
  expect(
    either(requirement, requirement2).check([
      Attributes.agility.withValue(2),
      Attributes.body.withValue(1)
    ])
  ).toBeTruthy()

  // When neither requirement is fulfilled, then the requirement is not fulfilled
  expect(
    either(requirement, requirement2).check([
      Attributes.agility.withValue(1),
      Attributes.body.withValue(1)
    ])
  ).toBeFalsy()
})

test('atLeastRank is correctly calculated', () => {
  // When the rank itself is required, then the requirement is fulfilled
  expect(atLeastRank(Orderly).check([Orderly])).toBeTruthy()

  // When a rank from another cult is required, then the requirement is not fulfilled
  expect(atLeastRank(Hagari).check([Orderly])).toBeFalsy()

  // When a rank higher up the hierarchy is required, then the requirement is not fulfilled
  expect(atLeastRank(Preservist).check([Orderly])).toBeFalsy()

  // When the required rank is among the rank's ancestors, then the requirement is fulfilled
  expect(atLeastRank(Orderly).check([Preservist])).toBeTruthy()
})

test('eitherRank is correctly calculated', () => {
  // When the rank itself is required, then the requirement is fulfilled
  expect(eitherRank(atLeastRank(Preservist), atLeastRank(Surgeon)).check([Preservist])).toBeTruthy()

  // When at least one requirement is fulfilled, then the requirement is fulfilled
  expect(eitherRank(atLeastRank(Preservist), atLeastRank(Orderly)).check([Surgeon])).toBeTruthy()

  // When neither requirement is fulfilled, then the requirement is not fulfilled
  expect(eitherRank(atLeastRank(Preservist), atLeastRank(Surgeon)).check([Orderly])).toBeFalsy()
})
