import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Judges = new Cult('judges', [
  Skills.melee,
  Skills.navigation,
  Skills.conduct,
  Skills.projectiles,
  Skills.domination
])
