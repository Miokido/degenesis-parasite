import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, eitherRank } from '@/config/ranks/ranks'
import { atLeastSkill } from '@/config/requirements'
import { Jehammedans } from '.'
import { Arianoi, Delilah, Iconide, Isaaki, Oracle as OracleRank, Shepherd } from './ranks'

export const IreOfJehammed = new Potential(
  'ireOfJehammed',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const FleeceOfAries = new Potential(
  'fleeceOfAries',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(Arianoi)]
)
export const CallOfJehammed = new Potential('callOfJehammed', Jehammedans, [], [], [], [])
export const IconidesCurse = new Potential(
  'iconidesCurse',
  Jehammedans,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))]
)
export const IconidesBlessing = new Potential(
  'iconidesBlessing',
  Jehammedans,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))]
)
export const Oracle = new Potential('oracle', Jehammedans, [], [], [], [atLeastRank(OracleRank)])
export const Compassion = new Potential(
  'compassion',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [eitherRank(atLeastRank(Iconide), atLeastRank(OracleRank))]
)
export const ThroesOfTheWolf = new Potential(
  'throesOfTheWolf',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [atLeastRank(Arianoi)],
  Skills.primal
)
export const BrothersKeeper = new Potential(
  'brothersKeeper',
  Jehammedans,
  [atLeastSkill(Skills.faith, 10)],
  [],
  [],
  [atLeastRank(Shepherd)]
)
export const BlackSheep = new Potential(
  'blackSheep',
  Jehammedans,
  [],
  [],
  [],
  [atLeastRank(Delilah)]
)
export const WealAndWoe = new Potential(
  'wealAndWoe',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const Sacrifice = new Potential('sacrifice', Jehammedans, [], [], [], [atLeastRank(Isaaki)])
export const RamsOffspring = new Potential('ramsOffspring', Jehammedans, [], [], [], [])
export const Fatalist = new Potential(
  'fatalist',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const DivineIntervention = new Potential(
  'divineIntervention',
  Jehammedans,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)

export const JehammedanPotentials = [
  IreOfJehammed,
  FleeceOfAries,
  CallOfJehammed,
  IconidesCurse,
  IconidesBlessing,
  Oracle,
  Compassion,
  ThroesOfTheWolf,
  BrothersKeeper,
  BlackSheep,
  WealAndWoe,
  Sacrifice,
  RamsOffspring,
  Fatalist,
  DivineIntervention
]
