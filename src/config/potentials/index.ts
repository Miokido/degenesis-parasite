import type { Clan, Cult } from '../model'
import type { Attribute, Origin, Skill, SkillWithAttribute, Value } from '../properties'
import type { Rank } from '../ranks/ranks'

import { PotentialsByCults } from '../cults/cults'
import { CommonPotentials } from './common'
import type { Potential } from './potential'

export const AllPotentials: Potential[] = Array.from(PotentialsByCults.values())
  .flatMap((a) => a)
  .concat(...CommonPotentials)

export function potentialsByCult(cult: Cult, clan: Clan | undefined): Potential[] {
  return [...(PotentialsByCults.get(cult.name) || []), ...CommonPotentials].filter(
    (p) => !p.clan || p.clan?.name == clan?.name
  )
}

export const PotentialsByName = new Map(
  AllPotentials.map((potential) => [potential.name, potential])
)

export function eligiblePotentials(
  cult: Cult,
  attributes: Array<Value<Attribute>>,
  skills: Array<Value<SkillWithAttribute>>,
  origins: Array<Value<Origin>>,
  rank: Rank,
  mentalPowerSkill: Skill,
  mentalResistanceSkill: Skill,
  clan: Clan | undefined
): Set<Potential> {
  return new Set(
    potentialsByCult(cult, clan).filter((potential) =>
      potential.isAttainable(
        cult,
        attributes,
        skills,
        origins,
        rank,
        mentalPowerSkill,
        mentalResistanceSkill,
        clan
      )
    )
  )
}
