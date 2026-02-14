import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Palers = new Cult('palers', [
  Skills.projectiles,
  Skills.stealth,
  Skills.cunning,
  Skills.engineering,
  Skills.perception
])
