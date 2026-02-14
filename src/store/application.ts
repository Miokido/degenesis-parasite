import { defineStore } from 'pinia'
import browserStorage from './browserStorage'
import { Character } from './character'

export type State = {
  storedCharacters: Map<string, Character>
}

export const useApplicationStore = defineStore('application', {
  state: (): State => ({
    storedCharacters: loadAllCharacters()
  }),
  getters: {
    getStoredCharacters(): Character[] {
      return Array.from(this.storedCharacters.values()).sort((a, b) => a.name.localeCompare(b.name))
    },
    storedCharacterNames(): string[] {
      return Array.from(this.storedCharacters.keys()).sort((a, b) => a.localeCompare(b))
    }
  },
  actions: {
    refresh() {
      this.storedCharacters = loadAllCharacters()
    }
  }
})

function loadAllCharacters() {
  return new Map(browserStorage.loadAllCharacters().map(({name, character}) => [name, character]))
}