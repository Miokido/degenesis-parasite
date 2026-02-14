import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Anubians } from '.'

const anubianRank = cultRank(Anubians)

export const Initiate: Rank = anubianRank('initiate', [], [], [])

export const Enchanter: Rank = anubianRank(
  'enchanter',
  [
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6)),
    atLeastSkill(Skills.legends, 6)
  ],
  [atLeastOrigin(Origins.renown, 1)],
  [Initiate]
)

export const Embalmer: Rank = anubianRank(
  'embalmer',
  [
    atLeastSkill(Skills.expression, 6),
    atLeastSkill(Skills.legends, 7),
    atLeastSkill(Skills.empathy, 7)
  ],
  [atLeastOrigin(Origins.renown, 2)],
  [Enchanter]
)

export const SoulSeer: Rank = anubianRank(
  'soulSeer',
  [atLeastSkill(Skills.expression, 10), atLeastSkill(Skills.science, 7)],
  [atLeastOrigin(Origins.secrets, 3), atLeastOrigin(Origins.renown, 3)],
  [Embalmer]
)

export const Healer: Rank = anubianRank(
  'healer',
  [
    atLeastSkill(Skills.toughness, 8),
    atLeastSkill(Skills.medicine, 6),
    either(atLeastSkill(Skills.focus, 6), atLeastSkill(Skills.primal, 6))
  ],
  [atLeastOrigin(Origins.authority, 2)],
  [Enchanter]
)

export const Hecatean: Rank = anubianRank(
  'hecatean',
  [
    atLeastSkill(Skills.toughness, 10),
    either(atLeastSkill(Skills.focus, 8), atLeastSkill(Skills.primal, 8)),
    atLeastSkill(Skills.science, 6)
  ],
  [atLeastOrigin(Origins.authority, 3)],
  [Healer]
)

export const Sickle: Rank = anubianRank(
  'sickle',
  [atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.reaction, 6)],
  [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.network, 2)],
  [Enchanter]
)

export const Ammit: Rank = anubianRank(
  'ammit',
  [
    atLeastSkill(Skills.athletics, 6),
    atLeastSkill(Skills.melee, 10),
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6))
  ],
  [atLeastOrigin(Origins.renown, 5), atLeastOrigin(Origins.network, 3)],
  [Sickle]
)

export const Hogon: Rank = anubianRank(
  'hogon',
  [
    atLeastSkill(Skills.medicine, 10),
    atLeastSkill(Skills.science, 8),
    atLeastSkill(Skills.empathy, 8)
  ],
  [atLeastOrigin(Origins.secrets, 5)],
  [SoulSeer, Hecatean, Ammit]
)

export const AnubianRanks = [
  Initiate,
  Enchanter,
  Embalmer,
  SoulSeer,
  Healer,
  Hecatean,
  Sickle,
  Ammit,
  Hogon
]
