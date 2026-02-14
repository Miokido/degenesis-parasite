import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Scrappers } from '.'

const scrapperRank = cultRank(Scrappers)

export const Mouse: Rank = scrapperRank('mouse', [], [], [])

export const Badger: Rank = scrapperRank(
  'badger',
  [atLeastSkill(Skills.perception, 4), atLeastSkill(Skills.survival, 6)],
  [],
  [Mouse]
)

export const Fox: Rank = scrapperRank(
  'fox',
  [
    atLeastSkill(Skills.cunning, 6),
    atLeastSkill(Skills.survival, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [],
  [Badger]
)

export const LoneWolf: Rank = scrapperRank(
  'loneWolf',
  [
    atLeastSkill(Skills.artifactLore, 6),
    atLeastSkill(Skills.crafting, 6),
    atLeastSkill(Skills.perception, 6)
  ],
  [atLeastOrigin(Origins.renown, 4)],
  [Fox]
)

export const CaveBear: Rank = scrapperRank(
  'caveBear',
  [atLeastSkill(Skills.toughness, 8), atLeastSkill(Skills.survival, 10)],
  [atLeastOrigin(Origins.renown, 5)],
  [LoneWolf]
)

export const Mechanist: Rank = scrapperRank(
  'mechanist',
  [atLeastSkill(Skills.engineering, 6), atLeastSkill(Skills.crafting, 7)],
  [atLeastOrigin(Origins.resources, 2)],
  [Badger]
)

export const Manufacturer: Rank = scrapperRank(
  'manufacturer',
  [atLeastSkill(Skills.engineering, 10)],
  [atLeastOrigin(Origins.renown, 5), atLeastOrigin(Origins.resources, 4)],
  [Mechanist]
)

export const Scavenger: Rank = scrapperRank(
  'scavenger',
  [],
  [
    atLeastOrigin(Origins.authority, 2),
    atLeastOrigin(Origins.allies, 2),
    atLeastOrigin(Origins.network, 2)
  ],
  [Badger]
)

export const AlphaWolf: Rank = scrapperRank(
  'alphaWolf',
  [],
  [
    atLeastOrigin(Origins.authority, 2),
    atLeastOrigin(Origins.allies, 2),
    atLeastOrigin(Origins.network, 2)
  ],
  [Scavenger]
)

export const Legend: Rank = scrapperRank(
  'legend',
  [],
  [atLeastOrigin(Origins.resources, 4), atLeastOrigin(Origins.renown, 6)],
  [LoneWolf, Manufacturer, AlphaWolf]
)

export const CartelThug: Rank = scrapperRank('cartelThug', [], [], [Badger])

export const Appraiser: Rank = scrapperRank(
  'appraiser',
  [
    either(atLeastSkill(Skills.negotiation, 7), atLeastSkill(Skills.domination, 7)),
    atLeastSkill(Skills.artifactLore, 6)
  ],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.allies, 2)],
  [CartelThug]
)

export const Officer: Rank = scrapperRank(
  'officer',
  [
    either(atLeastSkill(Skills.negotiation, 9), atLeastSkill(Skills.domination, 9)),
    atLeastSkill(Skills.cunning, 6)
  ],
  [atLeastOrigin(Origins.authority, 5)],
  [Appraiser]
)

export const ScrapperRanks = [
  Mouse,
  Badger,
  Fox,
  LoneWolf,
  CaveBear,
  Mechanist,
  Manufacturer,
  Legend,
  Scavenger,
  AlphaWolf,
  CartelThug,
  Appraiser,
  Officer
]
