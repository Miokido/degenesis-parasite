import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, eitherRank } from '@/config/ranks/ranks'
import { atLeastSkill } from '@/config/requirements'
import { Spitalians } from '.'
import { FieldMedic, Hippocrat, Orderly, Preservist, Surgeon } from './ranks'

export const Splaying = new Potential('splaying', Spitalians, [], [], [], [])
export const Phalanx = new Potential('phalanx', Spitalians, [], [], [], [])
export const Preservalis = new Potential(
  'preservalis',
  Spitalians,
  [],
  [],
  [],
  [atLeastRank(Preservist)]
)
export const LastBastion = new Potential('lastBastion', Spitalians, [], [], [], [])
export const KranzlersTeaching = new Potential(
  'kranzlersTeaching',
  Spitalians,
  [],
  [],
  [],
  [],
  Skills.focus,
  undefined
)
export const TheLastFarewell = new Potential(
  'theLastFarewell',
  Spitalians,
  [],
  [],
  [],
  [],
  Skills.primal,
  undefined
)
export const Polaris = new Potential(
  'polaris',
  Spitalians,
  [atLeastSkill(Skills.leadership, 8), atLeastSkill(Skills.cunning, 8)],
  [],
  [],
  [atLeastRank(Preservist)]
)
export const WillToSurvive = new Potential(
  'willToSurvive',
  Spitalians,
  [atLeastSkill(Skills.willpower, 10)],
  [],
  [],
  [atLeastRank(Preservist)]
)
export const TunnelVision = new Potential(
  'tunnelVision',
  Spitalians,
  [atLeastSkill(Skills.medicine, 6)],
  [],
  [],
  [eitherRank(atLeastRank(FieldMedic), atLeastRank(Surgeon))],
  Skills.focus,
  undefined
)
export const Oathspeaker = new Potential(
  'oathspeaker',
  Spitalians,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.cunning, 6)],
  [],
  [],
  [atLeastRank(Hippocrat)]
)
export const Caregiver = new Potential(
  'caregiver',
  Spitalians,
  [atLeastSkill(Skills.medicine, 6)],
  [],
  [],
  [atLeastRank(Orderly)]
)
export const RodOfAsclepius = new Potential(
  'rodOfAsclepius',
  Spitalians,
  [atLeastSkill(Skills.medicine, 8), atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  []
)
export const OldSchool = new Potential(
  'oldSchool',
  Spitalians,
  [atLeastSkill(Skills.primal, 6)],
  [],
  [],
  [atLeastRank(Preservist)]
)
export const RaiseDead = new Potential(
  'raiseDead',
  Spitalians,
  [atLeastSkill(Skills.medicine, 10), atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  [eitherRank(atLeastRank(FieldMedic), atLeastRank(Surgeon))]
)
export const HumanitysBurden = new Potential(
  'humanitysBurden',
  Spitalians,
  [atLeastSkill(Skills.toughness, 9), atLeastSkill(Skills.stamina, 9)],
  [],
  [],
  []
)

export const SpitalianPotentials = [
  Splaying,
  Phalanx,
  Preservalis,
  LastBastion,
  KranzlersTeaching,
  TheLastFarewell,
  Polaris,
  WillToSurvive,
  TunnelVision,
  Oathspeaker,
  Caregiver,
  RodOfAsclepius,
  OldSchool,
  RaiseDead,
  HumanitysBurden
]
