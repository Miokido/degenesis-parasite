import { Clans } from './cults/clanners/clans'
import { Cults } from './cults/cults'
import { Concept, Culture } from './model'
import { Attributes as A, Origins, Skills as S, Skills } from './properties'

const AppName = 'Noret'
const AppTagLine = 'cryogenic vaults'
const SourceCodeRepo = 'https://gitlab.com/diskordanz/noret'

const Cultures = {
  Borca: new Culture(
    'borca',
    [A.agility, A.instinct],
    [S.toughness, S.crafting, S.artifactLore, S.engineering, S.survival]
  ),
  Franka: new Culture(
    'franka',
    [A.charisma, A.instinct],
    [S.stamina, S.stealth, S.negotiation, S.faith, S.willpower, S.seduction]
  ),
  Pollen: new Culture(
    'pollen',
    [A.body, A.instinct],
    [S.melee, S.stamina, S.legends, S.survival, S.empathy]
  ),
  Balkhan: new Culture(
    'balkhan',
    [A.body, A.psyche],
    [S.brawl, S.force, S.leadership, S.reaction, S.empathy]
  ),
  Hybrispania: new Culture(
    'hybrispania',
    [A.agility, A.intellect],
    [S.melee, S.mobility, S.stealth, S.medicine, S.orienteering]
  ),
  Purgare: new Culture(
    'purgare',
    [A.charisma, A.psyche],
    [S.conduct, S.legends, S.faith, S.willpower, S.domination, S.taming]
  ),
  Africa: new Culture(
    'africa',
    [A.body, A.intellect],
    [S.athletics, S.brawl, S.expression, S.medicine, S.reaction]
  )
}

const Concepts = {
  Adventurer: new Concept('adventurer', 0, A.body, [S.mobility, S.orienteering]),
  Creator: new Concept('creator', 1, A.agility, [S.arts, S.engineering]),
  Mentor: new Concept('mentor', 2, A.intellect, [S.leadership, S.legends]),
  Martyr: new Concept('martyr', 3, A.psyche, [S.faith, S.willpower, S.toughness]),
  Ruler: new Concept('ruler', 4, A.charisma, [S.cunning, S.leadership]),
  Seeker: new Concept('seeker', 5, A.intellect, [S.artifactLore, S.science]),
  Healer: new Concept('healer', 6, A.agility, [S.medicine, S.crafting]),
  Traditionalist: new Concept('traditionalist', 7, A.instinct, [S.legends, S.conduct]),
  Mediator: new Concept('mediator', 8, A.psyche, [S.perception, S.negotiation]),
  Hermit: new Concept('hermit', 9, A.instinct, [S.survival, S.stealth]),
  Heretic: new Concept('heretic', 10, A.psyche, [S.cunning, S.expression]),
  Conqueror: new Concept('conqueror', 11, A.body, [S.toughness, S.force]),
  Abomination: new Concept('abomination', 12, A.psyche, [S.domination, S.toughness]),
  Destroyer: new Concept('destroyer', 13, A.instinct, [S.stamina, S.force]),
  Chosen: new Concept('chosen', 14, A.charisma, [S.expression, S.leadership]),
  Defiler: new Concept('defiler', 15, A.psyche, [S.deception, S.domination]),
  Protector: new Concept('protector', 16, A.psyche, [S.stamina, S.toughness]),
  Visionary: new Concept('visionary', 17, A.charisma, [S.seduction, S.cunning]),
  Zealot: new Concept('zealot', 18, A.instinct, [S.reaction, S.faith, S.willpower]),
  Disciple: new Concept('disciple', 19, A.charisma, [S.empathy, S.perception]),
  Righteous: new Concept('righteous', 20, A.intellect, [S.cunning, S.negotiation]),
  Traveler: new Concept('traveler', 21, A.instinct, [S.legends, S.orienteering])
}

const allAttributes = [A.body, A.agility, A.charisma, A.intellect, A.psyche, A.instinct]
export default {
  appName: AppName,
  appTagLine: AppTagLine,
  sourceCodeRepo: SourceCodeRepo,
  // password, just used for primitive access control to the beta
  password: import.meta.env.VITE_BETA_PASSWORD,
  availablePoints: {
    attributes: 10,
    skills: 28,
    origins: 4,
    potentials: 1,
    legacies: 3
  },
  pointLimits: {
    attributes: {
      min: 1,
      max: 3
    },
    skills: {
      min: 0,
      max: 2
    },
    origins: {
      min: 0,
      max: 3
    },
    potentials: {
      min: 0,
      max: 3
    },
    legacies: {
      min: 0,
      max: 1
    }
  },
  attributes: allAttributes,
  skills: Object.values(Skills),
  cultures: Cultures,
  concepts: Concepts,
  cults: Cults,
  clans: Clans,
  origins: Object.values(Origins),
  culturesByName: new Map(Object.values(Cultures).map((c) => [c.name, c])),
  conceptsByName: new Map(Object.values(Concepts).map((c) => [c.name, c])),
  cultsByName: new Map(Object.values(Cults).map((c) => [c.name, c])),
  clansByName: new Map(Object.values(Clans).map((c) => [c.name, c])),
  attributesByName: new Map(Object.values(allAttributes).map((a) => [a.name, a])),
  skillsByName: new Map(Object.values(Skills).map((s) => [s.name, s])),
  originsByName: new Map(Object.values(Origins).map((o) => [o.name, o]))
}
