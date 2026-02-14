import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Spitalians = new Cult('spitalians', [
  Skills.toughness,
  Skills.medicine,
  Skills.faith,
  Skills.willpower,
  Skills.science,
  Skills.perception
])
