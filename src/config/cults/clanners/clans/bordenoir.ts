import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'
import { Clan } from '@/config/model'

export const Bordenoir = new Clan('bordenoir', [
  Skills.athletics,
  Skills.navigation,
  Skills.projectiles,
  Skills.negotiation,
  Skills.survival
])

const bordenoirRank = clanRank(Bordenoir)

export const Mouton: Rank = bordenoirRank('mouton', [], [], [])

export const Capricorne: Rank = bordenoirRank(
  'capricorne',
  [atLeastSkill(Skills.athletics, 6), atLeastSkill(Skills.crafting, 6)],
  [atLeastOrigin(Origins.allies, 1)],
  [Mouton]
)

export const Faucon: Rank = bordenoirRank(
  'faucon',
  [
    atLeastSkill(Skills.toughness, 4),
    atLeastSkill(Skills.projectiles, 6),
    atLeastSkill(Skills.navigation, 6)
  ],
  [],
  [Mouton]
)

export const Mineur: Rank = bordenoirRank(
  'mineur',
  [
    atLeastSkill(Skills.crafting, 8),
    atLeastSkill(Skills.legends, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [atLeastOrigin(Origins.network, 2), atLeastOrigin(Origins.resources, 2)],
  [Capricorne, Faucon]
)

export const Moniteur: Rank = bordenoirRank(
  'moniteur',
  [
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.navigation, 8),
    atLeastSkill(Skills.reaction, 6)
  ],
  [atLeastOrigin(Origins.allies, 3), atLeastOrigin(Origins.authority, 1)],
  [Capricorne, Faucon]
)

export const Colonel: Rank = bordenoirRank(
  'colonel',
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.negotiation, 8),
    atLeastSkill(Skills.leadership, 8)
  ],
  [atLeastOrigin(Origins.allies, 4), atLeastOrigin(Origins.network, 3)],
  [Mineur, Moniteur]
)

export const Poing: Rank = bordenoirRank(
  'poing',
  [
    atLeastSkill(Skills.brawl, 10),
    atLeastSkill(Skills.force, 8),
    atLeastSkill(Skills.projectiles, 10),
    atLeastSkill(Skills.leadership, 10)
  ],
  [atLeastOrigin(Origins.allies, 5), atLeastOrigin(Origins.renown, 5)],
  [Colonel]
)

export const Crane: Rank = bordenoirRank(
  'crane',
  [atLeastSkill(Skills.negotiation, 10), atLeastSkill(Skills.leadership, 10)],
  [atLeastOrigin(Origins.allies, 5), atLeastOrigin(Origins.renown, 5)],
  [Colonel]
)

export const BordenoirRanks = [Mouton, Capricorne, Faucon, Mineur, Moniteur, Colonel, Poing, Crane]
