import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill } from '@/config/requirements'
import { Palers } from '.'
import { Cyclops, Demagogue, Halo } from './ranks'

export const Nightmare = new Potential('nightmare', Palers, [], [], [], [])
export const Lament = new Potential('lament', Palers, [], [], [], [], Skills.primal)
export const Alias = new Potential('alias', Palers, [], [], [], [])
export const MidnightSun = new Potential('midnightSun', Palers, [], [], [], [], Skills.focus)
export const Chosen = new Potential('chosen', Palers, [], [], [], [atLeastRank(Halo)])
export const Suggestor = new Potential(
  'suggestor',
  Palers,
  [],
  [],
  [],
  [atLeastRank(Demagogue)]
)
export const SparklingFire = new Potential(
  'sparklingFire',
  Palers,
  [atLeastSkill(Skills.focus, 8), atLeastSkill(Skills.orienteering, 10)],
  [],
  [],
  [atLeastRank(Halo)]
)
export const Memeticon = new Potential(
  'memeticon',
  Palers,
  [atLeastSkill(Skills.empathy, 6)],
  [],
  [],
  []
)
export const Negator = new Potential('negator', Palers, [], [], [], [], Skills.primal)
export const Fluoride = new Potential(
  'fluoride',
  Palers,
  [atLeastSkill(Skills.mobility, 8)],
  [],
  [],
  []
)
export const Pandaemonium = new Potential(
  'pandaemonium',
  Palers,
  [atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  [atLeastRank(Cyclops)]
)
export const Tripwire = new Potential('tripwire', Palers, [], [], [], [], Skills.focus)
export const Xenos = new Potential(
  'xenos',
  Palers,
  [atLeastSkill(Skills.legends, 6)],
  [],
  [atLeastOrigin(Origins.secrets, 4)],
  []
)
export const VaultFighter = new Potential(
  'vaultFighter',
  Palers,
  [atLeastSkill(Skills.mobility, 6)],
  [],
  [],
  []
)
export const Masterplan = new Potential(
  'masterplan',
  Palers,
  [atLeastSkill(Skills.cunning, 6)],
  [],
  [],
  []
)

export const PalerPotentials = [
  Nightmare,
  Lament,
  Alias,
  MidnightSun,
  Chosen,
  Suggestor,
  SparklingFire,
  Memeticon,
  Negator,
  Fluoride,
  Pandaemonium,
  Tripwire,
  Xenos,
  VaultFighter,
  Masterplan
]
