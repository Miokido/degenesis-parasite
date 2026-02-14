import { expect, test, beforeEach } from 'vitest'
import { Attributes, Skills, SkillsByAttribute } from '../../src/config/properties'

test('SkillsByAttribute is correctly sorted', () => {
    expect(SkillsByAttribute.get(Attributes.body)?.map((s) => s.name)).toEqual([
        Skills.athletics.name,
        Skills.brawl.name,
        Skills.force.name,
        Skills.melee.name,
        Skills.stamina.name,
        Skills.toughness.name
    ])
})