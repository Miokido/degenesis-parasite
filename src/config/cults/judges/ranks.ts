import { Origins, Skills } from '@/config/properties'
import { Rank, cultRank } from '@/config/ranks/ranks'
import { atLeastOrigin, atLeastSkill, either } from '@/config/requirements'
import { Judges } from '.'

const judgeRank = cultRank(Judges)

export const Vagrant: Rank = judgeRank('vagrant', [], [], [])

export const CityJudge: Rank = judgeRank(
  'cityJudge',
  [
    atLeastSkill(Skills.legends, 4),
    atLeastSkill(Skills.melee, 6),
    atLeastSkill(Skills.expression, 4),
    atLeastSkill(Skills.conduct, 4)
  ],
  [],
  [Vagrant]
)

export const Protector: Rank = judgeRank(
  'protector',
  [
    atLeastSkill(Skills.navigation, 6),
    either(atLeastSkill(Skills.focus, 6), atLeastSkill(Skills.primal, 6)),
    atLeastSkill(Skills.reaction, 6)
  ],
  [atLeastOrigin(Origins.allies, 2)],
  [CityJudge]
)

export const Executioner: Rank = judgeRank(
  'executioner',
  [
    atLeastSkill(Skills.toughness, 6),
    either(atLeastSkill(Skills.domination, 6), atLeastSkill(Skills.leadership, 6))
  ],
  [atLeastOrigin(Origins.renown, 3)],
  [Protector]
)

export const BlackJudge: Rank = judgeRank(
  'blackJudge',
  [
    either(atLeastSkill(Skills.melee, 8), atLeastSkill(Skills.projectiles, 8)),
    atLeastSkill(Skills.stealth, 8),
    atLeastSkill(Skills.cunning, 6)
  ],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.allies, 3)],
  [Protector]
)

export const Advocate: Rank = judgeRank(
  'advocate',
  [
    atLeastSkill(Skills.expression, 6),
    atLeastSkill(Skills.negotiation, 6),
    atLeastSkill(Skills.legends, 6)
  ],
  [atLeastOrigin(Origins.authority, 2), atLeastOrigin(Origins.resources, 2)],
  [CityJudge]
)

export const Arbiter: Rank = judgeRank(
  'arbiter',
  [
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6)),
    atLeastSkill(Skills.expression, 8)
  ],
  [atLeastOrigin(Origins.authority, 3), atLeastOrigin(Origins.resources, 4)],
  [Advocate]
)

export const Assessor: Rank = judgeRank(
  'assessor',
  [
    atLeastSkill(Skills.perception, 8),
    either(atLeastSkill(Skills.domination, 6), atLeastSkill(Skills.negotiation, 6))
  ],
  [atLeastOrigin(Origins.allies, 1), atLeastOrigin(Origins.network, 2)],
  [Advocate]
)

export const Commissioner: Rank = judgeRank(
  'commissioner',
  [
    either(atLeastSkill(Skills.domination, 10), atLeastSkill(Skills.negotiation, 10)),
    atLeastSkill(Skills.empathy, 6)
  ],
  [
    atLeastOrigin(Origins.renown, 4),
    atLeastOrigin(Origins.network, 4),
    atLeastOrigin(Origins.allies, 2)
  ],
  [Assessor]
)

export const HighJudge: Rank = judgeRank(
  'highJudge',
  [],
  [
    atLeastOrigin(Origins.allies, 5),
    atLeastOrigin(Origins.authority, 4),
    atLeastOrigin(Origins.resources, 4)
  ],
  [Executioner, Arbiter]
)

export const Senator: Rank = judgeRank(
  'senator',
  [atLeastSkill(Skills.expression, 10)],
  [either(atLeastOrigin(Origins.renown, 6), atLeastOrigin(Origins.resources, 6))],
  [HighJudge]
)

export const SupremeJudge: Rank = judgeRank(
  'supremeJudge',
  [],
  [either(atLeastOrigin(Origins.renown, 6), atLeastOrigin(Origins.secrets, 6))],
  [Senator]
)

export const JudgeRanks = [
  Vagrant,
  CityJudge,
  Protector,
  BlackJudge,
  Executioner,
  Advocate,
  Arbiter,
  Assessor,
  Commissioner,
  HighJudge,
  Senator,
  SupremeJudge
]
