import { Cult } from "@/config/model";
import { Skills } from '../../properties'

export const Anubians = new Cult('anubians', [
      Skills.toughness,
      Skills.leadership,
      Skills.medicine,
      Skills.legends,
      Skills.faith,
      Skills.willpower
    ])