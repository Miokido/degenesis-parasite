import { Anabaptists } from '.'
import { Potential } from '../../potentials/potential'
import { Skills } from '../../properties'
import { atLeastRank, eitherRank } from '../../ranks/ranks'
import { atLeastSkill, either } from '../../requirements'
import { Acheron, Elysian, Furor, Sublime } from './ranks'

export const Zealot = new Potential('zealot', Anabaptists, [], [], [], [])
export const KillingJoke = new Potential('killingJoke', Anabaptists, [], [], [], [])
export const Pneuma = new Potential('pneuma', Anabaptists, [], [], [], [], Skills.focus)
export const RealmOfEmanations = new Potential(
  'realmOfEmanations',
  Anabaptists,
  [atLeastSkill(Skills.faith, 8)],
  [],
  [],
  []
)
export const Torchbearer = new Potential(
  'torchbearer',
  Anabaptists,
  [],
  [],
  [],
  [eitherRank(atLeastRank(Elysian), atLeastRank(Furor))]
)
export const FishermansBlood = new Potential(
  'fishermansBlood',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.primal
)
export const Unleashed = new Potential(
  'unleashed',
  Anabaptists,
  [],
  [],
  [],
  [atLeastRank(Furor)],
  Skills.primal
)
export const Innocence = new Potential('innocence', Anabaptists, [], [], [], [])
export const BlackRiver = new Potential(
  'blackRiver',
  Anabaptists,
  [atLeastSkill(Skills.domination, 8)],
  [],
  [],
  [atLeastRank(Acheron)]
)
export const SouthOfEden = new Potential(
  'southOfEden',
  Anabaptists,
  [atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.deception, 8)],
  [],
  [],
  [atLeastRank(Sublime)]
)
export const GodsGrace = new Potential(
  'godsGrace',
  Anabaptists,
  [],
  [],
  [],
  [atLeastRank(Elysian)],
  undefined,
  Skills.faith
)
export const DeathKnell = new Potential(
  'deathKnell',
  Anabaptists,
  [
    atLeastSkill(Skills.toughness, 10),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [],
  [],
  []
)
export const RottenApple = new Potential('rottenApple', Anabaptists, [], [], [], [], Skills.primal)
export const ParadiseLost = new Potential(
  'paradiseLost',
  Anabaptists,
  [],
  [],
  [],
  [],
  undefined,
  Skills.faith
)
export const DemiurgesBane = new Potential(
  'demiurgesBane',
  Anabaptists,
  [],
  [],
  [],
  [],
  Skills.focus
)

export const AnabaptistPotentials = [
  Zealot,
  KillingJoke,
  Pneuma,
  RealmOfEmanations,
  Torchbearer,
  FishermansBlood,
  Unleashed,
  Innocence,
  BlackRiver,
  SouthOfEden,
  GodsGrace,
  DeathKnell,
  RottenApple,
  ParadiseLost,
  DemiurgesBane
]
