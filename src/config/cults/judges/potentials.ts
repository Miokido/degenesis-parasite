import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Judges } from '.'
import { Advocate, Executioner, Protector } from './ranks'

export const FiatLux = new Potential(
  'fiatLux',
  Judges,
  [],
  [],
  [atLeastOrigin(Origins.renown, 4)],
  []
)
export const LynchLaw = new Potential('lynchLaw', Judges, [], [], [], [])
export const HammerBlow = new Potential('hammerBlow', Judges, [], [], [], [])
export const JanusFace = new Potential('janusFace', Judges, [], [], [], [])
export const Stampede = new Potential('stampede', Judges, [], [], [], [])
export const SteelThunder = new Potential('steelThunder', Judges, [], [], [], [])
export const DuraLex = new Potential(
  'duraLex',
  Judges,
  [],
  [],
  [],
  [atLeastRank(Protector)],
  Skills.primal
)
export const Tremor = new Potential(
  'tremor',
  Judges,
  [],
  [],
  [atLeastOrigin(Origins.renown, 4)],
  []
)
export const JusticeForAll = new Potential(
  'justiceForAll',
  Judges,
  [],
  [],
  [],
  [atLeastRank(Protector)]
)
export const BlazeOfGlory = new Potential(
  'blazeOfGlory',
  Judges,
  [atLeastSkill(Skills.toughness, 8)],
  [],
  [],
  [atLeastRank(Executioner)]
)
export const Crackdown = new Potential(
  'crackdown',
  Judges,
  [atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  [atLeastRank(Protector)]
)
export const TiltShift = new Potential(
  'tiltShift',
  Judges,
  [atLeastSkill(Skills.empathy, 8)],
  [],
  [],
  [],
  Skills.focus
)
export const Undertaker = new Potential(
  'undertaker',
  Judges,
  [atLeastSkill(Skills.melee, 8)],
  [],
  [],
  [atLeastRank(Protector)],
  Skills.primal
)
export const Heritage = new Potential('heritage', Judges, [], [], [], [atLeastRank(Advocate)])
export const HailOfLead = new Potential(
  'hailOfLead',
  Judges,
  [atLeastSkill(Skills.dexterity, 8)],
  [],
  [],
  []
)

export const JudgePotentials = [
  FiatLux,
  LynchLaw,
  HammerBlow,
  JanusFace,
  Stampede,
  SteelThunder,
  DuraLex,
  Tremor,
  JusticeForAll,
  BlazeOfGlory,
  Crackdown,
  TiltShift,
  Undertaker,
  Heritage,
  HailOfLead
]
