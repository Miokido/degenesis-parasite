import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const Pneumancers = new Clan('pneumancers', [
  Skills.force,
  Skills.toughness,
  Skills.crafting,
  Skills.projectiles,
  Skills.engineering
])

const pneumancersRank = clanRank(Pneumancers)

export const Picker: Rank = pneumancersRank('picker', [], [], [])

export const Smogger: Rank = pneumancersRank(
  'smogger',
  [atLeastSkill(Skills.force, 6), atLeastSkill(Skills.athletics, 4)],
  [],
  [Picker]
)

export const Boiler: Rank = pneumancersRank(
  'boiler',
  [atLeastSkill(Skills.projectiles, 7), atLeastSkill(Skills.toughness, 6)],
  [],
  [Picker]
)

export const Assembler: Rank = pneumancersRank(
  'assembler',
  [
    atLeastSkill(Skills.crafting, 8),
    atLeastSkill(Skills.engineering, 7),
    atLeastSkill(Skills.legends, 7)
  ],
  [],
  [Smogger, Boiler]
)

export const Rigger: Rank = pneumancersRank(
  'rigger',
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.navigation, 6),
    atLeastSkill(Skills.engineering, 5)
  ],
  [atLeastOrigin(Origins.authority, 2)],
  [Smogger, Boiler]
)

export const Herald: Rank = pneumancersRank(
  'herald',
  [
    atLeastSkill(Skills.expression, 8),
    atLeastSkill(Skills.negotiation, 6),
    atLeastSkill(Skills.legends, 9)
  ],
  [atLeastOrigin(Origins.network, 3)],
  [Assembler, Rigger]
)

export const Warcrafter: Rank = pneumancersRank(
  'warcrafter',
  [
    atLeastSkill(Skills.engineering, 10),
    atLeastSkill(Skills.science, 9)
  ],
  [],
  [Herald]
)

export const Engine: Rank = pneumancersRank(
  'engine',
  [
    atLeastSkill(Skills.leadership, 11),
    atLeastSkill(Skills.domination, 10)
  ],
  [],
  [Herald]
)

export const PneumancersRanks = [
  Picker,
  Smogger,
  Boiler,
  Assembler,
  Rigger,
  Herald,
  Warcrafter,
  Engine
]
