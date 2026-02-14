import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank, atLeastRankLevel } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Neolibyans } from '.'
import { GreatHunter, Merchant, NeolibyanRanks } from './ranks'

export const LionsShare = new Potential('lionsShare', Neolibyans, [], [], [], [])
export const Marksman = new Potential('marksman', Neolibyans, [], [], [], [], Skills.focus)
export const NineLives = new Potential('nineLives', Neolibyans, [], [], [], [])
export const Inspiration = new Potential('inspiration', Neolibyans, [], [], [], [])
export const AtEyeLevel = new Potential('atEyeLevel', Neolibyans, [], [], [], [])
export const WheelOfFortune = new Potential('wheelOfFortune', Neolibyans, [], [], [], [])
export const CrownOfCreation = new Potential(
  'crownOfCreation',
  Neolibyans,
  [atLeastSkill(Skills.leadership, 12)],
  [],
  [atLeastOrigin(Origins.renown, 6)],
  [atLeastRankLevel(NeolibyanRanks, 5)]
)
export const SilverTongue = new Potential(
  'silverTongue',
  Neolibyans,
  [atLeastSkill(Skills.conduct, 8), atLeastSkill(Skills.science, 6)],
  [],
  [],
  [atLeastRank(Merchant)]
)
export const TipOfTheScale = new Potential(
  'tipOfTheScale',
  Neolibyans,
  [atLeastSkill(Skills.cunning, 10)],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const HeirOfTheLibyan = new Potential('heirOfTheLibyan', Neolibyans, [], [], [], [])
export const Duelist = new Potential(
  'duelist',
  Neolibyans,
  [],
  [],
  [],
  [atLeastRank(GreatHunter)],
  Skills.focus
)
export const BankersTrust = new Potential(
  'bankersTrust',
  Neolibyans,
  [],
  [],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.renown, 3)],
  [atLeastRank(Merchant)]
)
export const DiamondInTheSand = new Potential(
  'diamondInTheSand',
  Neolibyans,
  [either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))],
  [],
  [atLeastOrigin(Origins.renown, 6)],
  []
)
export const Conqueror = new Potential('conqueror', Neolibyans, [], [], [], [], Skills.primal)
export const EcstasyOfGold = new Potential('ecstasyOfGold', Neolibyans, [], [], [], [])

export const NeolibyanPotentials = [
  LionsShare,
  Marksman,
  NineLives,
  Inspiration,
  AtEyeLevel,
  WheelOfFortune,
  CrownOfCreation,
  SilverTongue,
  TipOfTheScale,
  HeirOfTheLibyan,
  Duelist,
  BankersTrust,
  DiamondInTheSand,
  Conqueror,
  EcstasyOfGold
]
