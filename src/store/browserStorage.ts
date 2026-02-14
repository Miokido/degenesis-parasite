import { Character } from './character'

const loadCharacter = (name: string) => {
  const saved = localStorage.getItem(`character-${name}`)
  if (saved) {
    const parsed: Character = JSON.parse(saved)
    return parsed
  }
  return undefined
}

const storeCharacter = (character: Character) => {
  localStorage.setItem(`character-${character.name}`, JSON.stringify(character))
}

const deleteCharacter = (name: string) => {
  localStorage.removeItem(`character-${name}`)
}

const keyToCharacterName = (localStorageKey: string) =>
  localStorageKey.replace(new RegExp(/^character-/), '')

const loadAllCharacterNames = () => {
  return Object.keys(localStorage)
    .filter((localStorageKey) => localStorageKey.startsWith('character-'))
    .map(keyToCharacterName)
    .sort((a, b) => (a > b ? -1 : 1))
}

const loadAllCharacters = () => {
  return loadAllCharacterNames().flatMap((name) => {
    const char = loadCharacter(name)
    if (char) {
      return [{
        name: name,
        character: char
      }]
    }
    return []
  })
}

const characterIsStored = (name: string) => {
  return loadAllCharacterNames().includes(name)
}

const loadLocale = () => {
  return localStorage.getItem('locale')
}

const storeLocale = (locale: string) => {
  localStorage.setItem('locale', locale)
}

const storeHasUnlockedBeta = () => {
  localStorage.setItem('beta-unlock', 'true')
}

const loadHasUnlockedBeta = () => {
  return localStorage.getItem('beta-unlock') == 'true'
}

const loadDisplayTranslatedLabels = (): boolean => {
  return localStorage.getItem('preference-display-translated-labels') == 'true'
}

const storeDisplayTranslatedLabels = (value: boolean) => {
  localStorage.setItem('preference-display-translated-labels', value.toString())
}

export default {
  loadCharacter,
  storeCharacter,
  deleteCharacter,
  loadAllCharacters,
  characterIsStored,
  loadLocale,
  storeLocale,
  storeHasUnlockedBeta,
  loadHasUnlockedBeta,
  loadDisplayTranslatedLabels,
  storeDisplayTranslatedLabels
}
