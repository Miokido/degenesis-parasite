import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Chroniclers = new Cult('chroniclers', [
  Skills.crafting,
  Skills.negotiation,
  Skills.engineering,
  Skills.artifactLore,
  Skills.deception
])
