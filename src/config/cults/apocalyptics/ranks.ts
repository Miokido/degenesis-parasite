import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Apocalyptics } from '.'

const apocalypticRank = cultRank(Apocalyptics)

export const Finch: Rank = apocalypticRank('finch', [], [], [])

export const BattleCrow: Rank = apocalypticRank(
  'battleCrow',

  [
    atLeastSkill(Skills.brawl, 6),
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.athletics, 4)
  ],
  [atLeastOrigin(Origins.authority, 2)],
  [Finch]
)

export const Magpie: Rank = apocalypticRank(
  'magpie',

  [
    atLeastSkill(Skills.dexterity, 6),
    atLeastSkill(Skills.seduction, 6),
    atLeastSkill(Skills.cunning, 4)
  ],
  [atLeastOrigin(Origins.renown, 2)],
  [Finch]
)

export const Vulture: Rank = apocalypticRank(
  'vulture',

  [
    atLeastSkill(Skills.stealth, 4),
    atLeastSkill(Skills.cunning, 6),
    atLeastSkill(Skills.survival, 6)
  ],
  [atLeastOrigin(Origins.network, 2)],
  [Finch]
)

export const Cuckoo: Rank = apocalypticRank(
  'cuckoo',

  [
    atLeastSkill(Skills.deception, 6),
    atLeastSkill(Skills.expression, 6),
    atLeastSkill(Skills.empathy, 4)
  ],
  [atLeastOrigin(Origins.secrets, 2)],
  [Finch]
)

export const Owl: Rank = apocalypticRank(
  'owl',

  [
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.stealth, 6),
    atLeastSkill(Skills.reaction, 6)
  ],
  [],
  [Finch]
)

export const Woodpecker: Rank = apocalypticRank(
  'woodpecker',

  [
    atLeastSkill(Skills.arts, 4),
    atLeastSkill(Skills.leadership, 6),
    atLeastSkill(Skills.deception, 8)
  ],
  [atLeastOrigin(Origins.network, 3), atLeastOrigin(Origins.resources, 3)],
  [Finch]
)

export const Stork: Rank = apocalypticRank(
  'stork',

  [
    atLeastSkill(Skills.seduction, 8),
    atLeastSkill(Skills.cunning, 6),
    atLeastSkill(Skills.arts, 4)
  ],
  [atLeastOrigin(Origins.network, 2)],
  [Finch]
)

export const Raven: Rank = apocalypticRank(
  'raven',

  [
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10)),
    atLeastSkill(Skills.survival, 6)
  ],
  [
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.renown, 3),
    atLeastOrigin(Origins.allies, 3),
    atLeastOrigin(Origins.secrets, 5)
  ],
  [BattleCrow, Cuckoo, Stork, Magpie, Owl, Woodpecker, Vulture]
)

export const Tern: Rank = apocalypticRank('tern', [], [], [])

export const Seagull: Rank = apocalypticRank(
  'seagull',
  [
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.mobility, 6),
    atLeastSkill(Skills.projectiles, 4)
  ],
  [],
  [Tern]
)

export const Pelican: Rank = apocalypticRank(
  'pelican',
  [atLeastSkill(Skills.navigation, 10), atLeastSkill(Skills.orienteering, 8)],
  [atLeastOrigin(Origins.authority, 3)],
  [Tern]
)

export const Albatross: Rank = apocalypticRank(
  'albatross',
  [either(atLeastSkill(Skills.domination, 10), atLeastSkill(Skills.leadership, 10))],
  [atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.resources, 3)],
  [Pelican, Seagull]
)

export const Hummingbird: Rank = apocalypticRank('hummingbird', [], [], [])

export const Marabou: Rank = apocalypticRank(
  'marabou',
  [
    atLeastSkill(Skills.toughness, 4),
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.stealth, 6)
  ],
  [atLeastOrigin(Origins.network, 3)],
  [Hummingbird]
)

export const Ibis: Rank = apocalypticRank(
  'ibis',
  [atLeastSkill(Skills.legends, 8)],
  [
    atLeastOrigin(Origins.allies, 3),
    atLeastOrigin(Origins.authority, 3),
    atLeastOrigin(Origins.network, 3),
    atLeastOrigin(Origins.secrets, 3)
  ],
  [Hummingbird]
)

export const Toco: Rank = apocalypticRank(
  'toco',
  [atLeastSkill(Skills.conduct, 8)],
  [atLeastOrigin(Origins.resources, 4), atLeastOrigin(Origins.network, 3)],
  [Hummingbird]
)

export const Buzzard: Rank = apocalypticRank(
  'buzzard',
  [atLeastSkill(Skills.legends, 10)],
  [atLeastOrigin(Origins.allies, 4), atLeastOrigin(Origins.authority, 5)],
  [Marabou, Ibis, Toco]
)

export const Phoenix: Rank = apocalypticRank(
  'phoenix',
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.survival, 10),
    atLeastSkill(Skills.cunning, 8),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [Raven, Albatross, Buzzard],
  true
)

export const ApocalypticsRanks = [
  Finch,
  BattleCrow,
  Magpie,
  Vulture,
  Cuckoo,
  Stork,
  Raven,
  Tern,
  Seagull,
  Pelican,
  Hummingbird,
  Ibis,
  Toco,
  Buzzard,
  Phoenix
]
