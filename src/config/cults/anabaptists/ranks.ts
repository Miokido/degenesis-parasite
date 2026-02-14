import { Skills, Origins } from "@/config/properties"
import { atLeastSkill, either, atLeastOrigin } from "@/config/requirements"
import { Anabaptists } from "."
import { cultRank, Rank } from "../../ranks/ranks"

const anabaptistRank = cultRank(Anabaptists)

export const Touched: Rank = anabaptistRank('touched', [], [], [])

export const Ascetic: Rank = anabaptistRank(
  'ascetic',
  [
    atLeastSkill(Skills.stamina, 6),
    atLeastSkill(Skills.conduct, 4),
    either(atLeastSkill(Skills.faith, 6), atLeastSkill(Skills.willpower, 6))
  ],
  [],
  [Touched]
)

export const Elysian: Rank = anabaptistRank(
  'elysian',
  [
    atLeastSkill(Skills.medicine, 8),
    atLeastSkill(Skills.legends, 6),
    atLeastSkill(Skills.science, 6)
  ],
  [atLeastOrigin(Origins.renown, 2), atLeastOrigin(Origins.secrets, 2)],
  [Ascetic]
)

export const Orgiastic: Rank = anabaptistRank(
  'orgiastic',
  [
    atLeastSkill(Skills.toughness, 4),
    atLeastSkill(Skills.melee, 6),
    either(atLeastSkill(Skills.focus, 6), atLeastSkill(Skills.primal, 6))
  ],
  [],
  [Touched]
)

export const Furor: Rank = anabaptistRank(
  'furor',
  [
    atLeastSkill(Skills.melee, 8),
    either(atLeastSkill(Skills.faith, 8), atLeastSkill(Skills.willpower, 8))
  ],
  [atLeastOrigin(Origins.renown, 4)],
  [Orgiastic]
)

export const Emissary: Rank = anabaptistRank(
  'emissary',
  [
    either(atLeastSkill(Skills.domination, 8), atLeastSkill(Skills.conduct, 8)),
    atLeastSkill(Skills.negotiation, 6),
    either(atLeastSkill(Skills.faith, 10), atLeastSkill(Skills.willpower, 10))
  ],
  [atLeastOrigin(Origins.authority, 4), atLeastOrigin(Origins.renown, 3)],
  [Furor, Elysian]
)

export const Counselor: Rank = anabaptistRank(
  'counselor',
  [either(atLeastSkill(Skills.expression, 10), atLeastSkill(Skills.cunning, 10))],
  [atLeastOrigin(Origins.authority, 5), atLeastOrigin(Origins.renown, 4)],
  [Emissary]
)

export const Baptist: Rank = anabaptistRank(
  'baptist',
  [],
  [
    atLeastOrigin(Origins.authority, 6),
    atLeastOrigin(Origins.renown, 6),
    atLeastOrigin(Origins.secrets, 4)
  ],
  [Counselor]
)

export const Sublime: Rank = anabaptistRank(
  'sublime',
  [either(atLeastSkill(Skills.focus, 10), atLeastSkill(Skills.primal, 10))],
  [atLeastOrigin(Origins.allies, 4), atLeastOrigin(Origins.renown, 6)],
  [Furor, Elysian]
)

export const Acheron: Rank = anabaptistRank(
  'acheron',
  [atLeastSkill(Skills.melee, 10), atLeastSkill(Skills.mobility, 10)],
  [atLeastOrigin(Origins.allies, 5)],
  [Sublime]
)

export const AnabaptistRanks = [
  Touched,
  Ascetic,
  Elysian,
  Orgiastic,
  Furor,
  Emissary,
  Counselor,
  Baptist,
  Sublime,
  Acheron
]
