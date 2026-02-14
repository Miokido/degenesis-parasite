import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastSkill, either } from '@/config/requirements'
import { Scourgers } from '.'
import { Chaga, Damu, Dumisai, Kifo, Moyo } from './ranks'

export const TheLionsRevenge = new Potential(
  'theLionsRevenge',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.primal
)
export const ElderBood = new Potential(
  'elderBood',
  Scourgers,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  []
)
export const TrialOfTheHero = new Potential('trialOfTheHero', Scourgers, [], [], [], [])
export const HyenasLaughter = new Potential('hyenasLaughter', Scourgers, [], [], [], [])
export const WildDogRun = new Potential('wildDogRun', Scourgers, [], [], [], [])
export const SimbasPrey = new Potential('simbasPrey', Scourgers, [], [], [], [], Skills.focus)
export const Bloodhound = new Potential(
  'bloodhound',
  Scourgers,
  [atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.primal, 8)],
  [],
  [],
  [atLeastRank(Dumisai)]
)
export const LastBite = new Potential(
  'lastBite',
  Scourgers,
  [
    atLeastSkill(Skills.toughness, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  [atLeastRank(Dumisai)]
)
export const UltimateFoe = new Potential(
  'ultimateFoe',
  Scourgers,
  [],
  [],
  [],
  [atLeastRank(Kifo)]
)
export const CrackTheScourge = new Potential(
  'crackTheScourge',
  Scourgers,
  [atLeastSkill(Skills.domination, 8)],
  [],
  [],
  [atLeastRank(Damu)]
)
export const PrideOfAfrica = new Potential('prideOfAfrica', Scourgers, [], [], [], [])
export const TwinChallenge = new Potential(
  'twinChallenge',
  Scourgers,
  [],
  [],
  [],
  [atLeastRank(Moyo)]
)
export const GrimReaper = new Potential(
  'grimReaper',
  Scourgers,
  [],
  [],
  [],
  [],
  Skills.primal
)
export const Howl = new Potential('howl', Scourgers, [], [], [], [], Skills.primal)
export const VesselOfTheSpirit = new Potential(
  'vesselOfTheSpirit',
  Scourgers,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  [atLeastRank(Chaga)],
  Skills.focus
)

export const ScourgerPotentials = [
  TheLionsRevenge,
  ElderBood,
  TrialOfTheHero,
  HyenasLaughter,
  WildDogRun,
  SimbasPrey,
  Bloodhound,
  LastBite,
  UltimateFoe,
  CrackTheScourge,
  PrideOfAfrica,
  TwinChallenge,
  GrimReaper,
  Howl,
  VesselOfTheSpirit
]
