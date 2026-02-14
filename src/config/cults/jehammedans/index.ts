import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Jehammedans = new Cult('jehammedans', [
  Skills.melee,
  Skills.crafting,
  Skills.faith,
  Skills.willpower,
  Skills.arts,
  Skills.taming
])
