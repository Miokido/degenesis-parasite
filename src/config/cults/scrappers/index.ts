import { Cult } from '@/config/model'
import { Skills } from '../../properties'

export const Scrappers = new Cult('scrappers', [
  Skills.athletics,
  Skills.toughness,
  Skills.artifactLore,
  Skills.crafting,
  Skills.survival
])
