import { Potential } from './potential'
import { Attributes, Skills } from '../properties'
import { atLeastAttribute, atLeastSkill, either } from '../requirements'

export const Asceticism = new Potential('asceticism', undefined, [], [], [], [], undefined, undefined, undefined)
export const EtherCall = new Potential('etherCall', undefined, [], [], [], [])
export const MovingMountains = new Potential('movingMountains', undefined, [], [], [], [])
export const ElephantSkin = new Potential('elephantSkin', undefined, [], [], [], [])
export const Brainwave = new Potential('brainwave', undefined, [], [], [], [])
export const DangerSense = new Potential('dangerSense', undefined, [], [], [], [])
export const Sleek = new Potential('sleek', undefined, [], [], [], [])
export const CouldBeWorse = new Potential('couldBeWorse', undefined, [], [], [], [])
export const Marathon = new Potential('marathon', undefined, [], [], [], [])
export const Unyielding = new Potential(
  'unyielding',
  undefined,
  [],
  [],
  [],
  [],
  undefined,
  Skills.willpower
)
export const NumberCruncher = new Potential(
  'numberCruncher',
  undefined,
  [],
  [atLeastAttribute(Attributes.intellect, 4)],
  [],
  []
)
export const UntoDeath = new Potential(
  'untoDeath',
  undefined,
  [atLeastSkill(Skills.leadership, 10)],
  [],
  [],
  []
)
export const Hawkeye = new Potential(
  'hawkeye',
  undefined,
  [atLeastSkill(Skills.projectiles, 8), atLeastSkill(Skills.perception, 8)],
  [],
  [],
  []
)
export const FirstLanguage = new Potential(
  'firstLanguage',
  undefined,
  [atLeastSkill(Skills.orienteering, 4), atLeastSkill(Skills.primal, 4)],
  [],
  [],
  []
)
export const VipersTongue = new Potential(
  'vipersTongue',
  undefined,
  [atLeastSkill(Skills.seduction, 9)],
  [],
  [],
  []
)
export const Undefeatable = new Potential(
  'undefeatable',
  undefined,
  [
    atLeastSkill(Skills.mobility, 10),
    either(atLeastSkill(Skills.brawl, 10), atLeastSkill(Skills.melee, 10))
  ],
  [],
  [],
  [],
  Skills.primal
)
export const Paragon = new Potential(
  'paragon',
  undefined,
  [atLeastSkill(Skills.leadership, 8)],
  [],
  [],
  []
)
export const Ambidextrous = new Potential(
  'ambidextrous',
  undefined,
  [atLeastSkill(Skills.mobility, 6)],
  [],
  [],
  []
)
export const ToughAsNails = new Potential(
  'toughAsNails',
  undefined,
  [atLeastSkill(Skills.toughness, 8)],
  [],
  [],
  []
)
export const Luminary = new Potential('luminary', undefined, [], [], [], [])
export const FoolsFate = new Potential('foolsFate', undefined, [], [], [], [])
export const Beastmaster = new Potential('beastmaster', undefined, [], [], [], [])
export const QuickEye = new Potential(
  'quickEye',
  undefined,
  [atLeastSkill(Skills.perception, 8)],
  [],
  [],
  []
)
export const Mole = new Potential('mole', undefined, [], [], [], [])
export const PitFighter = new Potential(
  'pitFighter',
  undefined,
  [atLeastSkill(Skills.brawl, 8)],
  [],
  [],
  []
)
export const Goliath = new Potential(
  'goliath',
  undefined,
  [atLeastSkill(Skills.force, 6)],
  [],
  [],
  []
)
export const Adaptability = new Potential('adaptability', undefined, [], [], [], [])
export const Pariah = new Potential('pariah', undefined, [], [], [], [])
export const Herald = new Potential(
  'herald',
  undefined,
  [atLeastSkill(Skills.leadership, 6)],
  [],
  [],
  []
)
export const Rebel = new Potential('rebel', undefined, [], [], [], [])

export const CommonPotentials = [
  Asceticism,
  EtherCall,
  MovingMountains,
  ElephantSkin,
  Brainwave,
  DangerSense,
  Sleek,
  CouldBeWorse,
  Marathon,
  Unyielding,
  NumberCruncher,
  UntoDeath,
  Hawkeye,
  FirstLanguage,
  VipersTongue,
  Undefeatable,
  Paragon,
  Ambidextrous,
  ToughAsNails,
  Luminary,
  FoolsFate,
  Beastmaster,
  QuickEye,
  Mole,
  PitFighter,
  Goliath,
  Adaptability,
  Pariah,
  Herald,
  Rebel
]
