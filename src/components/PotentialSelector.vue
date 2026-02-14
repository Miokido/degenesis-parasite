<template>
  <div class="mb-2">
    {{ $t('messages.potentials').toUpperCase() }}
  </div>
  <v-divider class="mb-4"></v-divider>

  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="3"
        xl="2"
        class="py-0"
        v-for="{ potential, label, altLabel, value } in potentials()"
        v-bind:key="potential.name"
      >
        <ValueSelector
          :name="potential.name"
          :label="label"
          :altLabel="altLabel"
          :value="value"
          :max="1"
          :count="3"
          :active="store.eligiblePotentials.has(potential)"
          :min="config.pointLimits.potentials.min"
          @change="(v) => store.setPotential(potential, v)"
          :display-max="store.editorMode != EditorMode.Free"
          @mouseenter="store.setHighlighted(...requirements(potential))"
          @mouseleave="store.unsetHighlighted(...requirements(potential))"
          type="potentials"
        >
        </ValueSelector>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ValueSelector from '@/components/ValueSelector.vue'
import config from '@/config'
import { EditorMode } from '@/config/modes'
import { potentialsByCult } from '@/config/potentials'
import { useCharacterStore } from '@/store'
const store = useCharacterStore()
const i18n = useI18n()

import type { Potential } from '@/config/potentials/potential'

import messages from '@/config/messages'
import { useI18n } from 'vue-i18n'
const englishPotentialNames = new Map(Object.entries(messages.en.potentials))
function englishName(potential: Potential) {
  return englishPotentialNames.get(potential.name) || potential.name
}
function potentials() {
  return potentialsByCult(store.cult, store.clan)
    .map((potential) => {
      const translatedLabel = i18n.t(`potentials.${potential.name}`)
      const originalLabel = englishName(potential)
      const displayTranslation = store.displayTranslatedLabels

      const value = store.potentialValue(potential)

      if (i18n.locale.value == 'en') {
        return { potential: potential, label: translatedLabel, altLabel: '', value: value }
      }
      return {
        potential: potential,
        label: displayTranslation ? translatedLabel : originalLabel,
        altLabel: displayTranslation ? originalLabel : translatedLabel,
        value: value
      }
    })
    .sort((p1, p2) => p1.label.localeCompare(p2.label))
}
function requirements(potential: Potential) {
  return [
    ...potential.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
    ...potential.requiredOrigins.flatMap((o) => o.items),
    ...potential.requiredAttributes.flatMap((a) => a.items),
    ...(potential.mentalPowerSkill ? [potential.mentalPowerSkill] : []),
    ...(potential.mentalResistanceSkill ? [potential.mentalResistanceSkill] : []),
    ...potential.minimumRanks.flatMap((r) => r.ranks)
  ]
}
</script>
