import { Clan } from '@/config/model'
import { Origins, Skills } from '@/config/properties'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Rank } from '../../../ranks/ranks'
import { clanRank } from './util'

export const Resistance = new Clan('resistance', [
    Skills.stamina,
    Skills.projectiles,
    Skills.expression,
    Skills.legends,
    Skills.survival
  ]) 

const resistanceRank = clanRank(Resistance)

export const Cadet: Rank = resistanceRank('cadet', [], [], [])

export const Chasseur: Rank = resistanceRank(
  'chasseur',
  [atLeastSkill(Skills.projectiles, 6), atLeastSkill(Skills.survival, 6)],
  [],
  [Cadet]
)

export const Gendarme: Rank = resistanceRank(
  'gendarme',
  [atLeastSkill(Skills.projectiles, 6)],
  [atLeastOrigin(Origins.authority, 2)],
  [Cadet]
)

export const Commandant: Rank = resistanceRank(
  'commandant',
  [
    atLeastSkill(Skills.projectiles, 7),
    atLeastSkill(Skills.leadership, 7),
    atLeastSkill(Skills.survival, 7)
  ],
  [atLeastOrigin(Origins.renown, 3)],
  [Chasseur, Gendarme]
)

export const Savant: Rank = resistanceRank(
  'savant',
  [atLeastSkill(Skills.legends, 8), atLeastSkill(Skills.expression, 8)],
  [atLeastOrigin(Origins.authority, 3)],
  [Chasseur, Gendarme]
)

export const Général: Rank = resistanceRank(
  'général',
  [
    atLeastSkill(Skills.melee, 7),
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.leadership, 9),
    atLeastSkill(Skills.legends, 7)
  ],
  [atLeastOrigin(Origins.authority, 4), atLeastOrigin(Origins.renown, 4)],
  [Commandant, Savant]
)

export const Maréchal: Rank = resistanceRank(
  'maréchal',
  [
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.leadership, 10),
    atLeastSkill(Skills.negotiation, 9),
    atLeastSkill(Skills.legends, 10)
  ],
  [atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.renown, 6)],
  [Général]
)

export const GrandSavant: Rank = resistanceRank(
  'grandSavant',
  [
    atLeastSkill(Skills.legends, 12),
    atLeastSkill(Skills.conduct, 10),
    atLeastSkill(Skills.expression, 10),
    atLeastSkill(Skills.negotiation, 10)
  ],
  [atLeastOrigin(Origins.renown, 6)],
  [Général]
)

export const ResistanceRanks = [
  Cadet,
  Chasseur,
  Gendarme,
  Commandant,
  Savant,
  Général,
  Maréchal,
  GrandSavant
]
