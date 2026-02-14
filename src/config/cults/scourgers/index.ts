import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Scourgers = new Cult('scourgers', [
  Skills.athletics,
  Skills.force,
  Skills.mobility,
  Skills.stamina,
  Skills.reaction
])
