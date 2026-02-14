import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Spitalians } from '.'

const spitalianRank = cultRank(Spitalians)

export const Recruit: Rank = spitalianRank('recruit', [], [], [])

export const Orderly: Rank = spitalianRank(
  'orderly',
  [atLeastSkill(Skills.medicine, 4), atLeastSkill(Skills.stamina, 4)],
  [],
  [Recruit]
)

export const Famulancer: Rank = spitalianRank(
  'famulancer',
  [
    atLeastSkill(Skills.medicine, 6),
    atLeastSkill(Skills.science, 4),
    atLeastSkill(Skills.toughness, 4)
  ],
  [],
  [Orderly]
)

export const Hygienist: Rank = spitalianRank(
  'hygienist',
  [atLeastSkill(Skills.toughness, 6), atLeastSkill(Skills.engineering, 4)],
  [atLeastOrigin(Origins.allies, 4), atLeastOrigin(Origins.authority, 4)],
  [Famulancer]
)

export const FieldMedic: Rank = spitalianRank(
  'fieldMedic',
  [atLeastSkill(Skills.medicine, 8)],
  [
    atLeastOrigin(Origins.renown, 2),
    atLeastOrigin(Origins.resources, 2),
    atLeastOrigin(Origins.network, 2)
  ],
  [Famulancer]
)

export const Surgeon: Rank = spitalianRank(
  'surgeon',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.dexterity, 6),
    atLeastSkill(Skills.leadership, 4)
  ],
  [atLeastOrigin(Origins.renown, 4)],
  [Famulancer]
)

export const Epigeneticist: Rank = spitalianRank(
  'epigeneticist',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.engineering, 6),
    atLeastSkill(Skills.science, 6)
  ],
  [atLeastOrigin(Origins.secrets, 3)],
  [Famulancer]
)

export const Pharmacist: Rank = spitalianRank(
  'pharmacist',
  [atLeastSkill(Skills.medicine, 10), atLeastSkill(Skills.science, 8)],
  [atLeastOrigin(Origins.renown, 4)],
  [Famulancer]
)

export const Hippocrat: Rank = spitalianRank(
  'hippocrat',
  [atLeastSkill(Skills.domination, 6)],
  [
    atLeastOrigin(Origins.allies, 2),
    atLeastOrigin(Origins.authority, 4),
    atLeastOrigin(Origins.secrets, 3)
  ],
  [Famulancer]
)

export const Anesthesiologist: Rank = spitalianRank(
  'anesthesiologist',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.brawl, 6),
    atLeastSkill(Skills.force, 4),
    atLeastSkill(Skills.stamina, 6)
  ],
  [atLeastOrigin(Origins.allies, 3)],
  [Famulancer]
)

export const VillageDoctor: Rank = spitalianRank('villageDoctor', [], [], [Famulancer], true)

export const Registrar: Rank = spitalianRank(
  'registrar',
  [],
  [
    atLeastOrigin(Origins.allies, 5),
    atLeastOrigin(Origins.renown, 4),
    atLeastOrigin(Origins.secrets, 4)
  ],
  [FieldMedic, Surgeon, Hygienist, Anesthesiologist, Pharmacist, Epigeneticist, Hippocrat]
)

export const Consultant: Rank = spitalianRank(
  'consultant',
  [],
  [
    atLeastOrigin(Origins.allies, 5),
    atLeastOrigin(Origins.authority, 5),
    atLeastOrigin(Origins.secrets, 5)
  ],
  [Registrar]
)

export const Preservist: Rank = spitalianRank(
  'preservist',
  [
    atLeastSkill(Skills.melee, 8),
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.mobility, 6)
  ],
  [atLeastOrigin(Origins.renown, 4)],
  [Famulancer]
)

export const CommandoPrime: Rank = spitalianRank(
  'commandoPrime',
  [atLeastSkill(Skills.melee, 10), atLeastSkill(Skills.navigation, 6)],
  [
    atLeastOrigin(Origins.renown, 5),
    atLeastOrigin(Origins.secrets, 3),
    atLeastOrigin(Origins.authority, 4)
  ],
  [Preservist]
)

export const Provost: Rank = spitalianRank(
  'provost',
  [],
  [
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.authority, 6),
    atLeastOrigin(Origins.secrets, 5)
  ],
  [CommandoPrime]
)

export const Elder: Rank = spitalianRank(
  'elder',
  [],
  [atLeastOrigin(Origins.renown, 4)],
  [Recruit],
  true
)

export const SpitalianRanks = [
  Recruit,
  Orderly,
  Famulancer,
  Hygienist,
  FieldMedic,
  Surgeon,
  Epigeneticist,
  Pharmacist,
  Hippocrat,
  Anesthesiologist,
  VillageDoctor,
  Registrar,
  Consultant,
  Preservist,
  CommandoPrime,
  Provost,
  Elder
]
