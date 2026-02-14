import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Hellvetics = new Cult('hellvetics', [
  Skills.force,
  Skills.stamina,
  Skills.leadership,
  Skills.projectiles,
  Skills.reaction
])
