import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Scourgers } from '.'

const scourgerRank = cultRank(Scourgers)

export const Dufu: Rank = scourgerRank('dufu', [], [], [])

export const Hondo: Rank = scourgerRank(
  'hondo',
  [
    atLeastSkill(Skills.brawl, 5),
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.stamina, 6),
    atLeastSkill(Skills.mobility, 4)
  ],
  [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.allies, 1)],
  [Dufu]
)

export const Damu: Rank = scourgerRank(
  'damu',
  [
    atLeastSkill(Skills.brawl, 5),
    atLeastSkill(Skills.leadership, 6),
    atLeastSkill(Skills.cunning, 5),
    atLeastSkill(Skills.perception, 5)
  ],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.allies, 1)],
  [Dufu]
)

export const Chaga: Rank = scourgerRank(
  'chaga',
  [
    either(atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.projectiles, 8)),
    atLeastSkill(Skills.leadership, 8),
    atLeastSkill(Skills.legends, 6)
  ],
  [atLeastOrigin(Origins.authority, 4)],
  [Hondo]
)

export const Simba: Rank = scourgerRank(
  'simba',
  [
    atLeastSkill(Skills.athletics, 8),
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.reaction, 6)
  ],
  [atLeastOrigin(Origins.renown, 5), atLeastOrigin(Origins.allies, 3)],
  [Damu]
)

export const Moyo: Rank = scourgerRank(
  'moyo',
  [atLeastSkill(Skills.empathy, 8), atLeastSkill(Skills.stamina, 8)],
  [atLeastOrigin(Origins.renown, 5)],
  [],
  false,
  0
)

export const Dumisai: Rank = scourgerRank(
  'dumisai',
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.melee, 10),
    atLeastSkill(Skills.projectiles, 10)
  ],
  [atLeastOrigin(Origins.renown, 5), atLeastOrigin(Origins.authority, 5)],
  [Chaga, Simba, Moyo]
)

export const Kifo: Rank = scourgerRank('kifo', [], [], [Moyo, Dumisai], true)

export const ScourgerRanks = [Dufu, Hondo, Damu, Chaga, Simba, Moyo, Dumisai, Kifo]
