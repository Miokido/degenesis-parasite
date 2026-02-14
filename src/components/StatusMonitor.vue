<template>
  <div
    @mouseenter="store.setHighlighted(...constituents)"
    @mouseleave="store.unsetHighlighted(...constituents)"
    @touchstart="store.flashHighlighted(...constituents)"
  >
    <div class="d-flex justify-center">
      <ValueBoxes class="text-caption" :count="max" :value="value" :interactive="false" />
    </div>
    <div class="d-flex justify-center mb-3 text-uppercase">
      {{ label }}
    </div>
    <v-tooltip
      v-if="tooltip.length > 0"
      :text="tooltip"
      location="top"
      activator="parent"
      scroll-strategy="close"
    >
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import ValueBoxes from '@/components/ValueBoxes.vue'
import type { Attribute, Skill } from '@/config/properties'
import { useCharacterStore } from '@/store';
const store = useCharacterStore()
export interface Props {
  label: string
  value: number
  max: number
  tooltip?: string
  constituents: (Attribute | Skill)[]
}
withDefaults(defineProps<Props>(), {
  tooltip: '',
  constituents: () => []
})
</script>
