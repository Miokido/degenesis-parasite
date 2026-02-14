import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Chroniclers } from '.'

const chroniclerRank = cultRank(Chroniclers)

export const Bit: Rank = chroniclerRank('bit', [], [], [])

export const Agent: Rank = chroniclerRank(
  'agent',
  [atLeastSkill(Skills.artifactLore, 5)],
  [],
  [Bit]
)

export const Mediator: Rank = chroniclerRank(
  'mediator',
  [atLeastSkill(Skills.artifactLore, 7), atLeastSkill(Skills.engineering, 4)],
  [atLeastOrigin(Origins.secrets, 1), atLeastOrigin(Origins.network, 2)],
  [Agent]
)

export const Streamer: Rank = chroniclerRank(
  'streamer',
  [
    atLeastSkill(Skills.legends, 5),
    atLeastSkill(Skills.engineering, 7),
    atLeastSkill(Skills.negotiation, 5)
  ],
  [
    atLeastOrigin(Origins.authority, 1),
    atLeastOrigin(Origins.secrets, 2),
    atLeastOrigin(Origins.network, 4)
  ],
  [Mediator]
)

export const Fragment: Rank = chroniclerRank(
  'fragment',
  [
    atLeastSkill(Skills.artifactLore, 10),
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6))
  ],
  [
    atLeastOrigin(Origins.authority, 2),
    atLeastOrigin(Origins.secrets, 5),
    atLeastOrigin(Origins.resources, 4)
  ],
  [Streamer]
)

export const Paradigma: Rank = chroniclerRank(
  'paradigma',
  [
    atLeastSkill(Skills.legends, 6),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8)),
    atLeastSkill(Skills.domination, 6)
  ],
  [],
  [Streamer]
)

export const Shutter: Rank = chroniclerRank(
  'shutter',
  [
    either(atLeastSkill(Skills.melee, 6), atLeastSkill(Skills.projectiles, 6)),
    atLeastSkill(Skills.cunning, 6)
  ],
  [],
  [Agent]
)

export const Fuse: Rank = chroniclerRank(
  'fuse',
  [
    either(atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.projectiles, 8)),
    atLeastSkill(Skills.toughness, 6),
    atLeastSkill(Skills.stealth, 6)
  ],
  [atLeastOrigin(Origins.network, 3)],
  [Shutter]
)

export const Scalar: Rank = chroniclerRank(
  'scalar',
  [atLeastSkill(Skills.cunning, 8), atLeastSkill(Skills.deception, 10)],
  [atLeastOrigin(Origins.secrets, 4), atLeastOrigin(Origins.network, 6)],
  [Fuse]
)

export const Zero: Rank = chroniclerRank(
  'zero',
  [atLeastSkill(Skills.cunning, 8), atLeastSkill(Skills.deception, 10)],
  [atLeastOrigin(Origins.secrets, 4), atLeastOrigin(Origins.network, 6)],
  [Shutter, Mediator],
  false,
  0
)

export const Needle: Rank = chroniclerRank(
  'needle',
  [atLeastSkill(Skills.leadership, 8)],
  [
    atLeastOrigin(Origins.allies, 3),
    atLeastOrigin(Origins.secrets, 5),
    atLeastOrigin(Origins.network, 4)
  ],
  [Zero],
  true
)

export const ChroniclerRanks = [
  Bit,
  Agent,
  Mediator,
  Streamer,
  Fragment,
  Paradigma,
  Shutter,
  Fuse,
  Scalar,
  Zero,
  Needle
]
