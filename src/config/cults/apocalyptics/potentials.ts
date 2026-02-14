import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel, eitherRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Apocalyptics } from '.'
import {
  Albatross,
  ApocalypticsRanks,
  Buzzard,
  Cuckoo,
  Owl,
  Phoenix,
  Raven
} from '../apocalyptics/ranks'

export const AllIn = new Potential('allIn', Apocalyptics, [], [], [], [])
export const CardOfDestiny = new Potential(
  'cardOfDestiny',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRankLevel(ApocalypticsRanks, 3)],
  undefined,
  Skills.faith
)
export const CrowsNest = new Potential('crowsNest', Apocalyptics, [], [], [], [], Skills.primal)
export const Mirror = new Potential('mirror', Apocalyptics, [], [], [], [], Skills.focus)
export const BlackOmen = new Potential('blackOmen', Apocalyptics, [], [], [], [])
export const ThousandWays = new Potential('thousandWays', Apocalyptics, [], [], [], [])
export const FinalDestination = new Potential(
  'finalDestination',
  Apocalyptics,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Raven), atLeastRank(Buzzard), atLeastRank(Albatross))]
)
export const BadLuck = new Potential('badLuck', Apocalyptics, [], [], [], [atLeastRank(Phoenix)])
export const AngelOfDeath = new Potential(
  'angelOfDeath',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRank(Owl)],
  Skills.focus
)
export const Mimicry = new Potential(
  'mimicry',
  Apocalyptics,
  [atLeastSkill(Skills.expression, 10), atLeastSkill(Skills.deception, 10)],
  [],
  [],
  [atLeastRank(Cuckoo)]
)
export const Traffic = new Potential(
  'traffic',
  Apocalyptics,
  [],
  [],
  [atLeastOrigin(Origins.network, 4)],
  []
)
export const FreeLikeABird = new Potential(
  'freeLikeABird',
  Apocalyptics,
  [],
  [],
  [],
  [atLeastRankLevel(ApocalypticsRanks, 2)]
)
export const Climax = new Potential(
  'climax',
  Apocalyptics,
  [atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.deception, 6)],
  [],
  [],
  []
)
export const HeavenOrHell = new Potential(
  'heavenOrHell',
  Apocalyptics,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const Corruption = new Potential(
  'corruption',
  Apocalyptics,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.empathy, 8)],
  [],
  [],
  [atLeastRank(Raven)]
)

export const ApocalypticPotentials = [
  AllIn,
  CardOfDestiny,
  CrowsNest,
  Mirror,
  BlackOmen,
  ThousandWays,
  FinalDestination,
  BadLuck,
  AngelOfDeath,
  Mimicry,
  Traffic,
  FreeLikeABird,
  Climax,
  HeavenOrHell,
  Corruption
]
