import { Potential } from '@/config/potentials/potential'
import { Origins, Skills } from '@/config/properties'
import { atLeastRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Scrappers } from '.'
import { Badger, CaveBear } from './ranks'

export const TheMob = new Potential('theMob', Scrappers, [], [], [], [])
export const Rat = new Potential('rat', Scrappers, [atLeastSkill(Skills.cunning, 6)], [], [], [])
export const ToughDog = new Potential(
  'toughDog',
  Scrappers,
  [atLeastSkill(Skills.toughness, 6)],
  [],
  [],
  []
)
export const Nitro = new Potential('nitro', Scrappers, [], [], [], [], Skills.primal)
export const TrufflePig = new Potential('trufflePig', Scrappers, [], [], [], [])
export const Darwin = new Potential('darwin', Scrappers, [], [], [], [])
export const HourOfTheBastard = new Potential(
  'hourOfTheBastard',
  Scrappers,
  [
    atLeastSkill(Skills.survival, 10),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [],
  [],
  []
)
export const ArtifactSense = new Potential(
  'artifactSense',
  Scrappers,
  [atLeastSkill(Skills.artifactLore, 8), atLeastSkill(Skills.primal, 8)],
  [],
  [],
  []
)
export const Ravenous = new Potential('ravenous', Scrappers, [], [], [], [atLeastRank(CaveBear)])
export const Payback = new Potential('payback', Scrappers, [], [], [], [], Skills.primal)
export const Atlas = new Potential(
  'atlas',
  Scrappers,
  [atLeastSkill(Skills.force, 8), atLeastSkill(Skills.stamina, 8)],
  [],
  [],
  []
)
export const Junker = new Potential(
  'junker',
  Scrappers,
  [atLeastSkill(Skills.crafting, 8), atLeastSkill(Skills.engineering, 8)],
  [],
  [],
  [atLeastRank(Badger)]
)
export const Glyph = new Potential(
  'glyph',
  Scrappers,
  [atLeastSkill(Skills.legends, 6)],
  [],
  [atLeastOrigin(Origins.secrets, 3)],
  []
)
export const OneLastBullet = new Potential(
  'oneLastBullet',
  Scrappers,
  [
    atLeastSkill(Skills.projectiles, 8),
    atLeastSkill(Skills.cunning, 6),
    atLeastSkill(Skills.reaction, 8)
  ],
  [],
  [],
  []
)
export const Mongrel = new Potential(
  'mongrel',
  Scrappers,
  [],
  [],
  [atLeastOrigin(Origins.renown, 3), atLeastOrigin(Origins.network, 3)],
  []
)

export const ScrapperPotentials = [
  TheMob,
  Rat,
  ToughDog,
  Nitro,
  TrufflePig,
  Darwin,
  HourOfTheBastard,
  ArtifactSense,
  Ravenous,
  Payback,
  Atlas,
  Junker,
  Glyph,
  OneLastBullet,
  Mongrel
]
