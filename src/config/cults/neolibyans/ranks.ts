import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Neolibyans } from '.'

const neolibyanRank = cultRank(Neolibyans)

export const Apprentice: Rank = neolibyanRank('apprentice', [], [], [])

export const Scribe: Rank = neolibyanRank(
  'scribe',
  [atLeastSkill(Skills.science, 4), atLeastSkill(Skills.expression, 4)],
  [atLeastOrigin(Origins.authority, 1)],
  [Apprentice]
)

export const Merchant: Rank = neolibyanRank(
  'merchant',
  [atLeastSkill(Skills.negotiation, 6), atLeastSkill(Skills.cunning, 4)],
  [atLeastOrigin(Origins.resources, 2), atLeastOrigin(Origins.network, 2)],
  [Scribe]
)

export const Seafarer: Rank = neolibyanRank(
  'seafarer',
  [
    atLeastSkill(Skills.navigation, 6),
    atLeastSkill(Skills.legends, 6),
    atLeastSkill(Skills.orienteering, 8)
  ],
  [
    atLeastOrigin(Origins.resources, 3),
    atLeastOrigin(Origins.authority, 2),
    atLeastOrigin(Origins.renown, 2)
  ],
  [Merchant]
)

export const Cartographer: Rank = neolibyanRank(
  'cartographer',
  [
    atLeastSkill(Skills.orienteering, 10),
    atLeastSkill(Skills.arts, 8),
    atLeastSkill(Skills.legends, 8)
  ],
  [atLeastOrigin(Origins.renown, 5)],
  [Seafarer]
)

export const GreatHunter: Rank = neolibyanRank(
  'greatHunter',
  [
    atLeastSkill(Skills.projectiles, 10),
    either(atLeastSkill(Skills.focus, 8), atLeastSkill(Skills.primal, 8)),
    atLeastSkill(Skills.survival, 8)
  ],
  [atLeastOrigin(Origins.renown, 5)],
  [Seafarer]
)

export const Magnate: Rank = neolibyanRank(
  'magnate',
  [
    atLeastSkill(Skills.conduct, 8),
    atLeastSkill(Skills.negotiation, 10),
    either(atLeastSkill(Skills.focus, 6), atLeastSkill(Skills.primal, 6))
  ],
  [
    atLeastOrigin(Origins.allies, 4),
    atLeastOrigin(Origins.authority, 3),
    atLeastOrigin(Origins.resources, 4)
  ],
  [Merchant]
)

export const Sheikh: Rank = neolibyanRank(
  'sheikh',
  [
    atLeastSkill(Skills.expression, 10),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [
    atLeastOrigin(Origins.allies, 3),
    atLeastOrigin(Origins.authority, 4),
    atLeastOrigin(Origins.resources, 6),
    atLeastOrigin(Origins.secrets, 4),
    atLeastOrigin(Origins.renown, 6)
  ],
  [Magnate]
)

export const Raider: Rank = neolibyanRank(
  'raider',
  [atLeastSkill(Skills.navigation, 10), atLeastSkill(Skills.domination, 8)],
  [atLeastOrigin(Origins.authority, 6), atLeastOrigin(Origins.resources, 5)],
  [Magnate]
)

export const Ambassador: Rank = neolibyanRank(
  'ambassador',
  [
    atLeastSkill(Skills.negotiation, 8),
    atLeastSkill(Skills.conduct, 10),
    atLeastSkill(Skills.empathy, 8)
  ],
  [
    atLeastOrigin(Origins.allies, 4),
    atLeastOrigin(Origins.renown, 4),
    atLeastOrigin(Origins.network, 3)
  ],
  [Merchant]
)

export const Waziri: Rank = neolibyanRank(
  'waziri',
  [
    atLeastSkill(Skills.seduction, 8),
    atLeastSkill(Skills.cunning, 8),
    atLeastSkill(Skills.empathy, 10)
  ],
  [
    atLeastOrigin(Origins.allies, 5),
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.authority, 4)
  ],
  [Ambassador]
)

export const Consul: Rank = neolibyanRank(
  'consul',
  [
    either(atLeastSkill(Skills.leadership, 10), atLeastSkill(Skills.domination, 10)),
    atLeastSkill(Skills.expression, 8)
  ],
  [atLeastOrigin(Origins.allies, 4), atLeastOrigin(Origins.authority, 5)],
  [Ambassador]
)

export const NeolibyanRanks = [
  Apprentice,
  Scribe,
  Merchant,
  Seafarer,
  Cartographer,
  GreatHunter,
  Magnate,
  Sheikh,
  Raider,
  Ambassador,
  Waziri,
  Consul
]
