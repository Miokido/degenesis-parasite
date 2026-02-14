import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Palers } from '.'

const palerRank = cultRank(Palers)

export const Specter: Rank = palerRank('specter', [], [], [])

export const Solar: Rank = palerRank(
  'solar',
  [atLeastSkill(Skills.engineering, 5), atLeastSkill(Skills.crafting, 5)],
  [atLeastOrigin(Origins.resources, 1), atLeastOrigin(Origins.secrets, 2)],
  [Specter]
)

export const Aurora: Rank = palerRank(
  'aurora',
  [atLeastSkill(Skills.engineering, 8), atLeastSkill(Skills.crafting, 8)],
  [atLeastOrigin(Origins.resources, 3), atLeastOrigin(Origins.secrets, 4)],
  [Solar]
)

export const Reviver: Rank = palerRank(
  'reviver',
  [atLeastSkill(Skills.survival, 4), atLeastSkill(Skills.cunning, 6)],
  [atLeastOrigin(Origins.network, 3)],
  [Specter]
)

export const Redeemer: Rank = palerRank(
  'redeemer',
  [
    atLeastSkill(Skills.orienteering, 6),
    atLeastSkill(Skills.deception, 8),
    atLeastSkill(Skills.artifactLore, 6)
  ],
  [atLeastOrigin(Origins.allies, 3), atLeastOrigin(Origins.network, 4)],
  [Reviver]
)

export const Phantom: Rank = palerRank(
  'phantom',
  [
    atLeastSkill(Skills.perception, 4),
    atLeastSkill(Skills.projectiles, 6),
    atLeastSkill(Skills.stealth, 4)
  ],
  [],
  [Specter]
)

export const Cyclops: Rank = palerRank(
  'cyclops',
  [atLeastSkill(Skills.athletics, 6), atLeastSkill(Skills.projectiles, 8)],
  [atLeastOrigin(Origins.renown, 4)],
  [Phantom]
)

export const Aspirant: Rank = palerRank(
  'aspirant',
  [either(atLeastSkill(Skills.expression, 10), atLeastSkill(Skills.seduction, 10))],
  [either(atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.renown, 5))],
  [Aurora, Redeemer, Cyclops]
)

export const Demagogue: Rank = palerRank(
  'demagogue',
  [
    either(atLeastSkill(Skills.focus, 10), atLeastSkill(Skills.primal, 10)),
    atLeastSkill(Skills.leadership, 8)
  ],
  [either(atLeastOrigin(Origins.authority, 6), atLeastOrigin(Origins.renown, 6))],
  [Aspirant]
)

export const Halo: Rank = palerRank('halo', [], [], [Aurora, Redeemer, Cyclops])

export const PalerRanks = [
  Specter,
  Solar,
  Aurora,
  Reviver,
  Redeemer,
  Phantom,
  Cyclops,
  Aspirant,
  Demagogue,
  Halo
]
