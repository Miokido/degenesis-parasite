<template>
  <div class="pa-1">
    <div class="pa-1 text-subtitle-2">
      {{ $t('messages.preferences.untranslatedLabels') }}
    </div>
    <v-btn-toggle
      :disabled="$i18n.locale == 'en'"
      v-model="store.displayTranslatedLabels"
      @update:model-value="updateTranslatedLabels"
      color="grey-darken-4"
      variant="outlined"
      density="comfortable"
      mandatory
    >
      <v-btn :value="false" :prepend-icon="mdiTranslateOff">{{
        $t('messages.preferences.displayOriginalLabels')
      }}</v-btn>
      <v-btn :value="true" :prepend-icon="mdiTranslate">{{
        $t('messages.preferences.displayTranslatedLabels')
      }}</v-btn>
    </v-btn-toggle>
    <div class="pa-1 text-caption text-grey-darken-1">
      <p>
        {{ $t(`messages.preferences.displayTranslatedLabelsDescription`) }}
      </p>
    </div>
  </div>
  <v-divider class="my-4"></v-divider>
  <v-form>
    <div class="pa-1 text-subtitle-2">
      {{ $t('messages.locale') }}
    </div>
    <v-select
      v-model="$i18n.locale"
      :items="$i18n.availableLocales"
      @update:modelValue="browserStorage.storeLocale(i18n.locale.value)"
      variant="outlined"
      density="compact"
    ></v-select>
  </v-form>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/store'
import browserStorage from '@/store/browserStorage'
import { mdiTranslate, mdiTranslateOff } from '@mdi/js'
import { useI18n } from 'vue-i18n'
const store = useCharacterStore()
const i18n = useI18n()

function updateTranslatedLabels(value: boolean) {
  browserStorage.storeDisplayTranslatedLabels(value)
  store.displayTranslatedLabels = value
}
</script>
