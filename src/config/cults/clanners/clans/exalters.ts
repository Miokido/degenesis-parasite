import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const Exalters = new Clan('exalters', [
  Skills.force,
  Skills.toughness,
  Skills.crafting,
  Skills.projectiles,
  Skills.engineering
])

const pneumancersRank = clanRank(Exalters)

export const Imperfect: Rank = pneumancersRank('imperfect', [], [], [])

export const Solemn: Rank = pneumancersRank(
  'solemn',
  [atLeastSkill(Skills.legends, 8), atLeastSkill(Skills.empathy, 7)],
  [atLeastOrigin(Origins.secrets, 3)],
  [Imperfect]
)

export const Benign: Rank = pneumancersRank(
  'benign',
  [atLeastSkill(Skills.medicine, 6), atLeastSkill(Skills.engineering, 6)],
  [],
  [Imperfect]
)

export const Vigil: Rank = pneumancersRank(
  'vigil',
  [
    atLeastSkill(Skills.expression, 6),
    either(
      atLeastSkill(Skills.brawl, 6),
      atLeastSkill(Skills.melee, 6),
      atLeastSkill(Skills.projectiles, 6)
    )
  ],
  [],
  [Solemn, Benign]
)

export const Ariadne: Rank = pneumancersRank(
  'ariadne',
  [atLeastSkill(Skills.force, 6), atLeastSkill(Skills.athletics, 4)],
  [],
  [Solemn, Benign]
)

export const Imperative: Rank = pneumancersRank(
  'imperative',
  [atLeastSkill(Skills.leadership, 8), atLeastSkill(Skills.cunning, 8)],
  [],
  [Vigil, Ariadne]
)

export const Zodiac: Rank = pneumancersRank(
  'zodiac',
  [atLeastSkill(Skills.empathy, 10), atLeastSkill(Skills.cunning, 9)],
  [atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.secrets, 5)],
  [Imperative]
)

export const Concordant: Rank = pneumancersRank('concordant', [], [], [Imperative])

export const ExaltersRanks = [
  Imperfect,
  Solemn,
  Benign,
  Vigil,
  Ariadne,
  Imperative,
  Zodiac,
  Concordant
]
