import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel } from '@/config/ranks/ranks'
import { atLeastSkill, either } from '@/config/requirements'
import { Hellvetics } from '.'
import { HellveticRanks, Sapper, Sentinel as SentinelRank } from './ranks'

export const Assault = new Potential('assault', Hellvetics, [], [], [], [])
export const ForcedMarch = new Potential('forcedMarch', Hellvetics, [], [], [], [])
export const ShieldWall = new Potential('shieldWall', Hellvetics, [], [], [], [])
export const Infiltration = new Potential('infiltration', Hellvetics, [], [], [], [])
export const Discipline = new Potential('discipline', Hellvetics, [], [], [], [], Skills.focus)
export const Morale = new Potential('morale', Hellvetics, [], [], [], [])
export const Recovery = new Potential(
  'recovery',
  Hellvetics,
  [atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  []
)
export const HeavyDuty = new Potential(
  'heavyDuty',
  Hellvetics,
  [atLeastSkill(Skills.navigation, 8), atLeastSkill(Skills.reaction, 8)],
  [],
  [],
  [atLeastRank(SentinelRank)]
)
export const AlpineSoul = new Potential(
  'alpineSoul',
  Hellvetics,
  [atLeastSkill(Skills.athletics, 6), atLeastSkill(Skills.stamina, 6)],
  [],
  [],
  []
)
export const Demolitions = new Potential(
  'demolitions',
  Hellvetics,
  [atLeastSkill(Skills.crafting, 6), atLeastSkill(Skills.science, 6)],
  [],
  [],
  [atLeastRank(Sapper)]
)
export const Austerity = new Potential('austerity', Hellvetics, [], [], [], [])
export const Sentinel = new Potential(
  'sentinel',
  Hellvetics,
  [atLeastSkill(Skills.projectiles, 8), atLeastSkill(Skills.perception, 8)],
  [],
  [],
  [],
  Skills.focus
)
export const HellveticHonor = new Potential('hellveticHonor', Hellvetics, [], [], [], [])
export const NoMansLand = new Potential('noMansLand', Hellvetics, [], [], [], [])
export const DogOfWar = new Potential(
  'dogOfWar',
  Hellvetics,
  [
    atLeastSkill(Skills.toughness, 10),
    atLeastSkill(Skills.stamina, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  [atLeastRankLevel(HellveticRanks, 4)]
)

export const HellveticPotentials = [
  Assault,
  ForcedMarch,
  ShieldWall,
  Infiltration,
  Discipline,
  Morale,
  Recovery,
  HeavyDuty,
  AlpineSoul,
  Demolitions,
  Austerity,
  Sentinel,
  HellveticHonor,
  NoMansLand,
  DogOfWar
]
