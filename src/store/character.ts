import { EditorMode } from "@/config/modes";


export class Character {
  constructor(
    readonly name: string,
    readonly culture: string,
    readonly concept: string,
    readonly cult: string,
    readonly rank: string,
    readonly attributes: Array<[string, number]>,
    readonly skills: Array<[string, number]>,
    readonly origins: Array<[string, number]>,
    readonly potentials?: Array<[string, number]>,
    readonly legacies?: Array<[string, number]>,
    readonly age?: string,
    readonly gender?: string,
    readonly height?: string,
    readonly weight?: string,
    // Legacy flag, superseded by editorMode
    wasCreatedWithFreeMode?: boolean,
    readonly editorMode?: EditorMode,
    readonly clan?: string
  ) {
    this.storageVersion = 'v1'
    const legacyEditorMode = wasCreatedWithFreeMode ? (wasCreatedWithFreeMode ? EditorMode.Free : editorMode) : editorMode
    this.editorMode = legacyEditorMode ?? EditorMode.Default
  }
  storageVersion: string
}