import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Hellvetics } from '.'

const hellveticRank = cultRank(Hellvetics)

export const Soldier: Rank = hellveticRank('soldier', [], [], [])

export const Corporal: Rank = hellveticRank(
  'corporal',
  [
    atLeastSkill(Skills.force, 4),
    atLeastSkill(Skills.projectiles, 5),
    atLeastSkill(Skills.survival, 4)
  ],
  [atLeastOrigin(Origins.authority, 2)],
  [Soldier]
)

export const Sapper: Rank = hellveticRank(
  'sapper',
  [
    atLeastSkill(Skills.force, 6),
    atLeastSkill(Skills.stamina, 6),
    atLeastSkill(Skills.dexterity, 4),
    atLeastSkill(Skills.science, 4)
  ],
  [atLeastOrigin(Origins.authority, 3)],
  [Corporal]
)

export const Grenadier: Rank = hellveticRank(
  'grenadier',
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.reaction, 6),
    atLeastSkill(Skills.survival, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [atLeastOrigin(Origins.authority, 3)],
  [Corporal]
)

export const SpecialDetachement: Rank = hellveticRank(
  'specialDetachement',
  [
    atLeastSkill(Skills.brawl, 6),
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.projectiles, 10),
    atLeastSkill(Skills.stealth, 6),
    atLeastSkill(Skills.reaction, 7)
  ],
  [atLeastOrigin(Origins.renown, 3)],
  [Grenadier, Sapper]
)

export const Sentinel: Rank = hellveticRank(
  'sentinel',
  [
    atLeastSkill(Skills.force, 8),
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.navigation, 6),
    atLeastSkill(Skills.negotiation, 6)
  ],
  [atLeastOrigin(Origins.authority, 4), atLeastOrigin(Origins.resources, 3)],
  [Corporal]
)

export const RadioBeamUnit: Rank = hellveticRank(
  'radioBeamUnit',
  [
    atLeastSkill(Skills.stamina, 6),
    atLeastSkill(Skills.crafting, 6),
    atLeastSkill(Skills.engineering, 8)
  ],
  [atLeastOrigin(Origins.resources, 3)],
  [Corporal]
)

export const Spotter: Rank = hellveticRank(
  'spotter',
  [
    atLeastSkill(Skills.athletics, 6),
    atLeastSkill(Skills.stealth, 7),
    atLeastSkill(Skills.perception, 6),
    atLeastSkill(Skills.orienteering, 6)
  ],
  [atLeastOrigin(Origins.network, 3)],
  [Corporal]
)

export const Infiltrator: Rank = hellveticRank(
  'infiltrator',
  [
    atLeastSkill(Skills.deception, 8),
    atLeastSkill(Skills.cunning, 8),
    atLeastSkill(Skills.reaction, 6)
  ],
  [atLeastOrigin(Origins.network, 4)],
  [Spotter]
)

export const P26Squad: Rank = hellveticRank(
  'p26Squad',
  [
    atLeastSkill(Skills.conduct, 6),
    atLeastSkill(Skills.expression, 6),
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.cunning, 10)
  ],
  [atLeastOrigin(Origins.network, 5)],
  [Infiltrator]
)

export const Medic: Rank = hellveticRank(
  'medic',
  [atLeastSkill(Skills.medicine, 7), atLeastSkill(Skills.empathy, 4)],
  [atLeastOrigin(Origins.authority, 2)],
  [Corporal]
)

export const Genie: Rank = hellveticRank(
  'genie',
  [
    atLeastSkill(Skills.force, 6),
    atLeastSkill(Skills.navigation, 4),
    atLeastSkill(Skills.crafting, 6),
    atLeastSkill(Skills.engineering, 6),
    atLeastSkill(Skills.science, 6)
  ],
  [atLeastOrigin(Origins.resources, 2)],
  [Corporal]
)

export const Forager: Rank = hellveticRank(
  'forager',
  [
    atLeastSkill(Skills.artifactLore, 6),
    atLeastSkill(Skills.negotiation, 6),
    atLeastSkill(Skills.conduct, 4)
  ],
  [
    atLeastOrigin(Origins.resources, 3),
    atLeastOrigin(Origins.renown, 3),
    atLeastOrigin(Origins.network, 2)
  ],
  [Corporal]
)

export const Subaltern: Rank = hellveticRank(
  'subaltern',
  [atLeastSkill(Skills.leadership, 8), atLeastSkill(Skills.projectiles, 8)],
  [atLeastOrigin(Origins.authority, 4)],
  [Sapper, Grenadier, Sentinel, RadioBeamUnit, Medic, Genie, Forager]
)

export const FieldOfficer: Rank = hellveticRank(
  'fieldOfficer',
  [],
  [
    atLeastOrigin(Origins.allies, 3),
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.renown, 4)
  ],
  [Subaltern]
)

export const CorpsCommander: Rank = hellveticRank(
  'corpsCommander',
  [],
  [atLeastOrigin(Origins.allies, 5), atLeastOrigin(Origins.authority, 6)],
  [FieldOfficer]
)

export const HellveticRanks = [
  Soldier,
  Corporal,
  Sapper,
  Grenadier,
  SpecialDetachement,
  Sentinel,
  RadioBeamUnit,
  Medic,
  Genie,
  Forager,
  Spotter,
  Infiltrator,
  P26Squad,
  Subaltern,
  FieldOfficer,
  CorpsCommander
]
