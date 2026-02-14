import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const Touloni = new Clan('touloni', [
  Skills.toughness,
  Skills.crafting,
  Skills.navigation,
  Skills.conduct,
  Skills.cunning
])

const touloniRank = clanRank(Touloni)

export const Chiot: Rank = touloniRank('chiot', [], [], [])

export const BeauMonde: Rank = touloniRank(
  'beauMonde',
  [
    atLeastSkill(Skills.conduct, 6),
    atLeastSkill(Skills.projectiles, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [atLeastOrigin(Origins.authority, 2)],
  [Chiot]
)

export const Marin: Rank = touloniRank(
  'marin',
  [
    atLeastSkill(Skills.toughness, 5),
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.navigation, 6),
    atLeastSkill(Skills.orienteering, 5)
  ],
  [],
  [Chiot]
)

export const Officier: Rank = touloniRank(
  'officier',
  [
    atLeastSkill(Skills.melee, 7),
    atLeastSkill(Skills.projectiles, 7),
    either(atLeastSkill(Skills.navigation, 7), atLeastSkill(Skills.conduct, 7)),
    atLeastSkill(Skills.leadership, 6)
  ],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.renown, 3)],
  [BeauMonde, Marin]
)

export const Artisan: Rank = touloniRank(
  'artisan',
  [atLeastSkill(Skills.crafting, 7), atLeastSkill(Skills.arts, 7), atLeastSkill(Skills.science, 6)],
  [],
  [BeauMonde, Marin]
)

export const Dignitaire: Rank = touloniRank(
  'dignitaire',
  [
    atLeastSkill(Skills.conduct, 7),
    atLeastSkill(Skills.negotiation, 7),
    atLeastSkill(Skills.cunning, 8)
  ],
  [atLeastOrigin(Origins.authority, 4), atLeastOrigin(Origins.secrets, 2)],
  [Officier, Artisan]
)

export const Ancien: Rank = touloniRank('ancien', [], [], [Dignitaire])

export const Patriarche: Rank = touloniRank('patriarche', [], [], [Dignitaire])

export const TouloniRanks = [
  Chiot,
  BeauMonde,
  Marin,
  Officier,
  Artisan,
  Dignitaire,
  Ancien,
  Patriarche
]
