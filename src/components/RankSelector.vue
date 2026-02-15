<template>
  <div class="mb-2">
    {{ $t('messages.rank').toUpperCase() }}
  </div>
  <v-divider class="mb-4"></v-divider>

  <v-tooltip location="top" v-for="rank in ranks()" v-bind:key="rank.name" max-width="500" open-delay="500">
    <template v-slot:activator="{ props }">
      <div
        v-bind="props"
        class="d-inline-block"
        @mouseenter="
          store.setHighlighted(
            ...rank.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
            ...rank.requiredOrigins.flatMap((o) => o.items),
            ...[...rank.parentRanks]
          )
        "
        @mouseleave="
          store.unsetHighlighted(
            ...rank.requiredSkills.flatMap((s) => s.items.map((i) => i.skill)),
            ...rank.requiredOrigins.flatMap((o) => o.items),
            ...[...rank.parentRanks]
          )
        "
      >
        <v-btn
          class="rankButton ma-1"
          @click="store.setRank(rank)"
          :color="buttonColor(rank)"
          :disabled="!isEligible(rank)"
        >
          {{ `${rank.hierarchyLevelString}. ${$t(`ranks.${rank.name}`)}` }}
        </v-btn>
      </div>
    </template>
    <span v-html="$t(`ranks.${rank.name}Description`)" ></span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { ranksByCult } from '@/config/cults/cults'
import type { Rank } from '@/config/ranks/ranks'
import { useCharacterStore } from '@/store'
import { useI18n } from 'vue-i18n'

const store = useCharacterStore()
const i18n = useI18n()

const ranks = () => (ranksByCult(store.cult, store.clan) || []).sort((a, b) => a.compare(b))
const eligibleRanks = () => Array.from(store.eligibleRanks).map((r) => r.name)
const isEligible = (rank: Rank): boolean => eligibleRanks().includes(rank.name)

const formatRank = (rank: Rank) => rank.formatPrerequisites(i18n.t)

const buttonColor = (rank: Rank) => {
  if (store.isHighlighted(rank)) {
    return 'red-darken-4'
  } else if (rank.name == store.rank.name) {
    return 'grey-darken-4'
  } else if (!isEligible(rank)) {
    return 'grey-darken-3'
  }
  return ''
}
</script>

<style scoped>
.rankButton {
  transition: all 0.3s;
}
</style>
