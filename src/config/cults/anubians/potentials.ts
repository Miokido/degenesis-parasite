import { Potential } from '@/config/potentials/potential'
import { Skills } from '@/config/properties'
import { atLeastSkill, either } from '@/config/requirements'
import { Anubians } from '.'

export const SekhmetsSlumber = new Potential('sekhmetsSlumber', Anubians, [], [], [], [])
export const NavelOfNefertem = new Potential('navelOfNefertem', Anubians, [], [], [], [])
export const EyeOfHorus = new Potential('eyeOfHorus', Anubians, [], [], [], [])
export const MercyOfAnubis = new Potential('mercyOfAnubis', Anubians, [], [], [], [])
export const AmmitsFeast = new Potential('ammitsFeast', Anubians, [], [], [], [], Skills.primal)
export const GazeOfTheFate = new Potential('gazeOfTheFate', Anubians, [], [], [], [])
export const AncestralStare = new Potential(
  'ancestralStare',
  Anubians,
  [atLeastSkill(Skills.perception, 10)],
  [],
  [],
  []
)
export const EmbraceOfApophis = new Potential(
  'embraceOfApophis',
  Anubians,
  [atLeastSkill(Skills.brawl, 6)],
  [],
  [],
  [],
  Skills.primal
)
export const TheDarkestHeart = new Potential(
  'theDarkestHeart',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.focus
)
export const ChillOfDeath = new Potential('chillOfDeath', Anubians, [], [], [], [], Skills.primal)
export const Afterlife = new Potential('afterlife', Anubians, [], [], [], [])
export const SoulDrain = new Potential('soulDrain', Anubians, [], [], [], [])
export const CoilsOfSet = new Potential(
  'coilsOfSet',
  Anubians,
  [atLeastSkill(Skills.brawl, 6), atLeastSkill(Skills.perception, 6)],
  [],
  [],
  [],
  Skills.primal
)
export const SobeksPatience = new Potential(
  'sobeksPatience',
  Anubians,
  [],
  [],
  [],
  [],
  Skills.focus
)
export const FortitudeOfOsiris = new Potential(
  'fortitudeOfOsiris',
  Anubians,
  [
    atLeastSkill(Skills.toughness, 8),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [],
  [],
  [],
  Skills.focus
)

export const AnubianPotentials = [
  SekhmetsSlumber,
  NavelOfNefertem,
  EyeOfHorus,
  MercyOfAnubis,
  AmmitsFeast,
  GazeOfTheFate,
  AncestralStare,
  EmbraceOfApophis,
  TheDarkestHeart,
  ChillOfDeath,
  Afterlife,
  SoulDrain,
  CoilsOfSet,
  SobeksPatience,
  FortitudeOfOsiris
]
