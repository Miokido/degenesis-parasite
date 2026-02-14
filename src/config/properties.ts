import type { Translatable, Translator } from '@/config/model'

export interface Property extends Translatable {
  readonly name: string
  format(translator: Translator): string
}

export class Value<T extends Property> {
  constructor(
    readonly property: T,
    readonly value: number
  ) {}
}

export class Attribute implements Property {
  constructor(readonly name: string) {}
  format(translator: Translator): string {
    return translator('attributes.' + this.name)
  }
  withValue(value: number): Value<Attribute> {
    return new Value(this, value)
  }
}

const Body = new Attribute('body')
const Agility = new Attribute('agility')
const Charisma = new Attribute('charisma')
const Intellect = new Attribute('intellect')
const Psyche = new Attribute('psyche')
const Instinct = new Attribute('instinct')

export class Skill {
  constructor(
    readonly name: string,
    readonly attribute: Attribute,
    // FIXME: This is a little hacky. Think of a better way than mutable public state.
    public antagonist?: Skill
  ) {}

  withValue(value: number): Value<SkillWithAttribute> {
    return new Value(new SkillWithAttribute(this), value)
  }

  withAttribute(): SkillWithAttribute {
    return new SkillWithAttribute(this)
  }

  format(translator: Translator): string {
    return translator('skills.' + this.name)
  }
}

export class SkillWithAttribute {
  constructor(readonly skill: Skill) {
    this.name = skill.name
  }
  readonly name: string
  format(translator: Translator): string {
    return `${this.skill.attribute
      .format(translator)
      .toUpperCase()
      .slice(0, 3)}+${this.skill.format(translator)}`
  }
}

const focus = new Skill('focus', Intellect)
const primal = new Skill('primal', Instinct)
focus.antagonist = primal
primal.antagonist = focus

const faith = new Skill('faith', Psyche)
const willpower = new Skill('willpower', Psyche)
faith.antagonist = willpower
willpower.antagonist = faith

export const Skills = {
  athletics: new Skill('athletics', Body),
  brawl: new Skill('brawl', Body),
  force: new Skill('force', Body),
  melee: new Skill('melee', Body),
  stamina: new Skill('stamina', Body),
  toughness: new Skill('toughness', Body),
  crafting: new Skill('crafting', Agility),
  dexterity: new Skill('dexterity', Agility),
  navigation: new Skill('navigation', Agility),
  mobility: new Skill('mobility', Agility) ,
  projectiles: new Skill('projectiles', Agility),
  stealth: new Skill('stealth', Agility),
  arts: new Skill('arts', Charisma),
  conduct: new Skill('conduct', Charisma),
  expression: new Skill('expression', Charisma),
  leadership: new Skill('leadership', Charisma),
  negotiation: new Skill('negotiation', Charisma),
  seduction: new Skill('seduction', Charisma),
  artifactLore: new Skill('artifactLore', Intellect),
  engineering: new Skill('engineering', Intellect),
  focus: focus,
  legends: new Skill('legends', Intellect),
  medicine: new Skill('medicine', Intellect),
  science: new Skill('science', Intellect),
  cunning: new Skill('cunning', Psyche),
  deception: new Skill('deception', Psyche),
  domination: new Skill('domination', Psyche),
  faith: faith,
  reaction: new Skill('reaction', Psyche),
  willpower: willpower,
  empathy: new Skill('empathy', Instinct),
  orienteering: new Skill('orienteering', Instinct),
  perception: new Skill('perception', Instinct),
  primal: primal,
  survival: new Skill('survival', Instinct),
  taming: new Skill('taming', Instinct)
}

export const SkillsByAttribute = new Map<Attribute, Array<Skill>>()
Object.values(Skills).forEach((skill) => {
  SkillsByAttribute.set(skill.attribute, [...(SkillsByAttribute.get(skill.attribute) || []), skill])
})

export const Attributes = {
  body: Body,
  agility: Agility,
  charisma: Charisma,
  intellect: Intellect,
  psyche: Psyche,
  instinct: Instinct
}

export class Origin implements Property {
  constructor(readonly name: string) {}

  withValue(value: number): Value<Origin> {
    return new Value(this, value)
  }

  format(translator: Translator): string {
    return translator('origins.' + this.name)
  }
}

export const Origins = {
  allies: new Origin('allies'),
  authority: new Origin('authority'),
  network: new Origin('network'),
  renown: new Origin('renown'),
  resources: new Origin('resources'),
  secrets: new Origin('secrets')
}
