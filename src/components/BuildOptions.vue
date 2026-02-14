<template>
  <div class="pa-1">
    <div class="pa-1 text-subtitle-2">
      {{ $t('messages.editorModes.label') }}
    </div>
    <v-btn-toggle
      v-model="store.editorMode"
      @update:model-value="store.setEditorMode"
      color="grey-darken-4"
      variant="outlined"
      density="comfortable"
      mandatory
    >
      <v-btn
        :disabled="store.editorMode != EditorMode.HardLimits && store.anyPointLimitExceeded"
        :value="EditorMode.HardLimits"
        :prepend-icon="mdiLock"
        >{{ $t('messages.editorModes.hardLimits') }}
      </v-btn>
      <v-btn :value="EditorMode.SoftLimits" :prepend-icon="mdiLockCheckOutline">{{
        $t('messages.editorModes.softLimits')
      }}</v-btn>
      <v-btn :value="EditorMode.Free" :prepend-icon="mdiLockOpenOutline">{{
        $t('messages.editorModes.free')
      }}</v-btn>
    </v-btn-toggle>
    <div class="pa-1 text-caption text-grey-darken-1">
      <p
        v-if="store.editorMode != EditorMode.HardLimits && store.anyPointLimitExceeded"
        class="text-grey-darken-3"
      >
        <b>{{ $t(`messages.hint`) }}:</b>
        {{ $t(`messages.editorModes.hintHardLimitModeImpossible`) }}
      </p>
      <p>
        <b>{{ $t(`messages.editorModes.${store.editorMode}`) }}:</b>
        {{ $t(`messages.editorModes.hints.${store.editorMode}`) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorMode } from '@/config/modes';
import { useCharacterStore } from '@/store';
import { mdiLock, mdiLockCheckOutline, mdiLockOpenOutline } from '@mdi/js';
const store = useCharacterStore()
</script>
