import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Chroniclers } from '.'
import { Paradigma, Shutter } from './ranks'

export const DeadEnd = new Potential('deadEnd', Chroniclers, [], [], [], [])
export const Multiply = new Potential(
  'multiply',
  Chroniclers,
  [atLeastSkill(Skills.deception, 6)],
  [],
  [],
  [atLeastRank(Shutter)]
)
export const BackDoor = new Potential(
  'backDoor',
  Chroniclers,
  [atLeastSkill(Skills.deception, 6)],
  [],
  [],
  [atLeastRank(Shutter)]
)
export const Download = new Potential('download', Chroniclers, [], [], [], [])
export const Upload = new Potential('upload', Chroniclers, [], [], [], [])
export const Tesla = new Potential('tesla', Chroniclers, [], [], [], [])
export const Nova = new Potential('nova', Chroniclers, [], [], [], [], Skills.primal)
export const FractalMemory = new Potential(
  'fractalMemory',
  Chroniclers,
  [],
  [],
  [],
  [],
  Skills.focus
)
export const SituationalAnalysis = new Potential(
  'situationalAnalysis',
  Chroniclers,
  [atLeastSkill(Skills.focus, 10), atLeastSkill(Skills.cunning, 8)],
  [],
  [],
  [atLeastRank(Paradigma)]
)
export const NervousBreakdown = new Potential(
  'nervousBreakdown',
  Chroniclers,
  [atLeastSkill(Skills.medicine, 6), atLeastSkill(Skills.science, 6)],
  [],
  [],
  []
)
export const MindOfTheMachine = new Potential(
  'mindOfTheMachine',
  Chroniclers,
  [atLeastSkill(Skills.willpower, 8)],
  [],
  [],
  [],
  Skills.focus
)
export const Y2K = new Potential(
  'y2k',
  Chroniclers,
  [atLeastSkill(Skills.artifactLore, 8), atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  []
)
export const ChildOfTheStream = new Potential(
  'childOfTheStream',
  Chroniclers,
  [atLeastSkill(Skills.artifactLore, 10)],
  [],
  [atLeastOrigin(Origins.secrets, 4)],
  []
)
export const Defragment = new Potential(
  'defragment',
  Chroniclers,
  [atLeastSkill(Skills.science, 8)],
  [],
  [],
  [],
  Skills.focus
)
export const WhiteNoise = new Potential('whiteNoise', Chroniclers, [], [], [], [], Skills.primal)

export const ChroniclerPotentials = [
  DeadEnd,
  Multiply,
  BackDoor,
  Download,
  Upload,
  Tesla,
  Nova,
  FractalMemory,
  SituationalAnalysis,
  NervousBreakdown,
  MindOfTheMachine,
  Y2K,
  ChildOfTheStream,
  Defragment,
  WhiteNoise
]
