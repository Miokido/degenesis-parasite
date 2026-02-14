import type { Cult, Clan } from '../model'
import type { Potential } from '../potentials/potential'
import type { Rank } from '../ranks/ranks'
import { Anabaptists } from './anabaptists'
import { AnabaptistPotentials } from './anabaptists/potentials'
import { AnabaptistRanks } from './anabaptists/ranks'
import { Anubians } from './anubians'
import { AnubianPotentials } from './anubians/potentials'
import { AnubianRanks } from './anubians/ranks'
import { Apocalyptics } from './apocalyptics'
import { ApocalypticPotentials } from './apocalyptics/potentials'
import { ApocalypticsRanks } from './apocalyptics/ranks'
import { Chroniclers } from './chroniclers'
import { ChroniclerPotentials } from './chroniclers/potentials'
import { ChroniclerRanks } from './chroniclers/ranks'
import { Clanners } from './clanners'
import { ClannerRanks } from './clanners/clans'
import { ClannerPotentials } from './clanners/potentials'
import { Hellvetics } from './hellvetics'
import { HellveticPotentials } from './hellvetics/potentials'
import { HellveticRanks } from './hellvetics/ranks'
import { Jehammedans } from './jehammedans'
import { JehammedanPotentials } from './jehammedans/potentials'
import { JehammedansRanks } from './jehammedans/ranks'
import { Judges } from './judges'
import { JudgePotentials } from './judges/potentials'
import { JudgeRanks } from './judges/ranks'
import { Neolibyans } from './neolibyans'
import { NeolibyanPotentials } from './neolibyans/potentials'
import { NeolibyanRanks } from './neolibyans/ranks'
import { Palers } from './palers'
import { PalerPotentials } from './palers/potentials'
import { PalerRanks } from './palers/ranks'
import { Scourgers } from './scourgers'
import { ScourgerPotentials } from './scourgers/potentials'
import { ScourgerRanks } from './scourgers/ranks'
import { Scrappers } from './scrappers'
import { ScrapperPotentials } from './scrappers/potentials'
import { ScrapperRanks } from './scrappers/ranks'
import { Spitalians } from './spitalians'
import { SpitalianPotentials } from './spitalians/potentials'
import { SpitalianRanks } from './spitalians/ranks'

export const Cults = {
  Spitalians: Spitalians,
  Chroniclers: Chroniclers,
  Hellvetics: Hellvetics,
  Judges: Judges,
  Clanners: Clanners,
  Scrappers: Scrappers,
  Neolibyans: Neolibyans,
  Scourgers: Scourgers,
  Anubians: Anubians,
  Jehammedans: Jehammedans,
  Apocalyptics: Apocalyptics,
  Anabaptists: Anabaptists,
  Palers: Palers
}

export const RanksByCults = new Map<string, Rank[]>()
  .set(Cults.Spitalians.name, SpitalianRanks)
  .set(Cults.Apocalyptics.name, ApocalypticsRanks)
  .set(Cults.Jehammedans.name, JehammedansRanks)
  .set(Cults.Chroniclers.name, ChroniclerRanks)
  .set(Cults.Hellvetics.name, HellveticRanks)
  .set(Cults.Judges.name, JudgeRanks)
  .set(Cults.Scrappers.name, ScrapperRanks)
  .set(Cults.Neolibyans.name, NeolibyanRanks)
  .set(Cults.Scourgers.name, ScourgerRanks)
  .set(Cults.Anubians.name, AnubianRanks)
  .set(Cults.Anabaptists.name, AnabaptistRanks)
  .set(Cults.Palers.name, PalerRanks)
  .set(Cults.Clanners.name, ClannerRanks)

export function ranksByCult(cult: Cult, clan?: Clan): Rank[] {
  if (cult.name == Cults.Clanners.name) {
    return ClannerRanks.filter((r) => r.clan?.name == clan?.name)
  }
  const ranksForCult = RanksByCults.get(cult.name) || []
  if (ranksForCult.length == 0) {
    throw new Error('Could not find ranks for cult ' + cult.name)
  }
  return ranksForCult
}

export const PotentialsByCults = new Map<string, Potential[]>()
  .set(Cults.Spitalians.name, SpitalianPotentials)
  .set(Cults.Chroniclers.name, ChroniclerPotentials)
  .set(Cults.Hellvetics.name, HellveticPotentials)
  .set(Cults.Judges.name, JudgePotentials)
  .set(Cults.Scrappers.name, ScrapperPotentials)
  .set(Cults.Neolibyans.name, NeolibyanPotentials)
  .set(Cults.Scourgers.name, ScourgerPotentials)
  .set(Cults.Anubians.name, AnubianPotentials)
  .set(Cults.Jehammedans.name, JehammedanPotentials)
  .set(Cults.Anabaptists.name, AnabaptistPotentials)
  .set(Cults.Apocalyptics.name, ApocalypticPotentials)
  .set(Cults.Palers.name, PalerPotentials)
  .set(Cults.Clanners.name, ClannerPotentials)
