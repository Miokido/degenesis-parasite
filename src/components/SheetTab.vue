<template>
  <div class="page">
    <div class="elevation-2">
      <v-toolbar class="pa-4 bg-grey-lighten-2" density="compact">
        <v-btn @click="generateSheet" stacked>
          {{ $t('messages.generateSheet') }}
          <v-icon :icon="mdiFileDocumentArrowRight" />
          <v-progress-circular
            v-if="sheetIsGenerating"
            class="ml-2"
            indeterminate
            size="20"
            color="red"
          ></v-progress-circular>
        </v-btn>
      </v-toolbar>
    </div>
    <div id="sheetContainer">
      <div class="elevation-10">
        <div id="sheet" class="bg-white">
          <v-container>
            <v-row class="row">
              <v-col class="coreDataBlock pt-8">
                <SheetText
                  class="mb-1"
                  :title="$t('messages.name')"
                  :text="store.characterName"
                ></SheetText>
                <SheetText class="mb-1" :title="$t('messages.age')" :text="store.age"></SheetText>
                <SheetText
                  class="mb-1"
                  :title="$t('messages.rank')"
                  :text="`${$t(`ranks.${store.rank.name}`)} (${store.rank.hierarchyLevelString})`"
                ></SheetText>
                <SheetText class="mb-1" :title="$t('messages.experience')" text=""></SheetText>
              </v-col>
              <v-col class="coreDataBlock pt-8">
                <SheetText
                    class="mb-1"
                    :text="$t('messages.legacies').toUpperCase()"
                  ></SheetText>
                <div v-for="{ potential, value } in legacies()" :key="potential">
                  <SheetText
                    class="mb-1"
                    :text="potential"
                  ></SheetText>
                </div>
              </v-col>
              <v-col class="coreDataBlock pt-8">
                <SheetText
                  class="mb-1"
                  :title="$t('messages.gender')"
                  :text="store.gender"
                ></SheetText>
                <SheetText
                  class="mb-1"
                  :title="$t('messages.height')"
                  :text="store.height"
                ></SheetText>
                <SheetText
                  class="mb-1"
                  :title="$t('messages.weight')"
                  :text="store.weight"
                ></SheetText>
                <SheetText class="mb-1" :title="$t('messages.dinars')" text=""></SheetText>
              </v-col>
              <v-col class="d-flex justify-center align-center">
                <div class="logo">
                  <img src="@/assets/degenesis.svg" type="image/svg+xml" />
                  <div class="appName label text-uppercase d-flex justify-center">
                    {{ appName }}
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row class="row mb-2">
              <v-col class="archetypeBlock">
                <SheetArchetype
                  type="culture"
                  :typeLabel="$t('messages.culture')"
                  :archetype="store.culture.name"
                  :label="$t(`culturesConceptsCults.${store.culture.name}`)"
                ></SheetArchetype>
              </v-col>
              <v-col class="archetypeBlock">
                <SheetArchetype
                  type="concept"
                  :typeLabel="$t('messages.concept')"
                  :archetype="store.concept.name"
                  :label="
                    romanize(store.concept.index) +
                    '. ' +
                    $t(`culturesConceptsCults.${store.concept.name}`)
                  "
                ></SheetArchetype>
              </v-col>
              <v-col class="archetypeBlock">
                <SheetArchetype
                  v-if="!store.clan"
                  type="cult"
                  :typeLabel="$t('messages.cult')"
                  :archetype="store.cult.name"
                  :label="$t(`culturesConceptsCults.${store.cult.name}`)"
                ></SheetArchetype>
                <SheetArchetype
                  v-if="store.clan"
                  type="clan"
                  :typeLabel="$t('messages.clan')"
                  :archetype="store.clan.name"
                  :label="$t(`clans.${store.clan.name}`)"
                ></SheetArchetype>
              </v-col>
            </v-row>
            <v-row>
              <v-divider class="border-opacity-100" color="black"></v-divider>
            </v-row>
            <v-row class="row">
              <v-col
                xs="4"
                v-for="attr in attributes"
                :key="attr.name"
                class="sheetBlock attributeBlock"
              >
                <v-container class="attribute ma-0 pa-0 mb-2">
                  <v-row class="ma-0 pa-0">
                    <v-col cols="7" class="ma-0 pa-0">
                      <div class="blockLabel float-left ma-0 pl-1">
                        {{ $t(`attributes.${attr.name}`) }}
                      </div>
                    </v-col>
                    <v-col cols="5" class="boxes ma-0 pa-0">
                      <div class="float-end">
                        <Boxes
                          class="float-end"
                          :count="6"
                          :value="store.attributeValue(attr)"
                          :active="false"
                          :interactive="false"
                        />
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <div v-for="skill in SkillsByAttribute.get(attr) || []" :key="skill.name">
                  <v-container class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0">
                      <v-col cols="7" class="ma-0 pa-0">
                        <div class="float-left pl-1">{{ $t(`skills.${skill.name}`) }}</div>
                      </v-col>
                      <v-col cols="5" class="ma-0 pa-0">
                        <div class="float-end">
                          <Boxes
                            :count="6"
                            :value="store.skillValue(skill)"
                            :active="false"
                            :interactive="false"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
            </v-row>
            <v-row class="row">
              <v-col class="ma-0 pa-0">
                <v-divider class="border-opacity-100" color="black"></v-divider>
              </v-col>
            </v-row>
            <v-row class="row">
              <v-col xs="4" class="sheetBlock potentialsBlock">
                <v-container class="attribute ma-0 pa-0 mb-2">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0">
                      <div class="blockLabel float-left ma-0 pl-1">
                        {{ $t(`messages.origins`) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <div v-for="origin in origins" :key="origin.name">
                  <v-container class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0">
                      <v-col xs="2" class="ma-0 pa-0">
                        <div class="float-left pl-1">{{ $t(`origins.${origin.name}`) }}</div>
                      </v-col>
                      <v-col xs="10" class="ma-0 pa-0">
                        <div class="float-end">
                          <Boxes
                            :count="6"
                            :value="store.originValue(origin)"
                            :active="false"
                            :interactive="false"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
              <v-col class="sheetBlock statusBlock">
                <v-container class="ma-0 pa-0">
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" class="ma-0 pa-0">
                      <div class="d-flex justify-center">
                        <Boxes
                          :count="24"
                          :value="store.maxEgo"
                          :active="false"
                          :interactive="false"
                          :inverted="true"
                        />
                      </div>
                      <div class="d-flex justify-center mb-1">
                        {{ $t('messages.ego') }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" class="ma-0 pa-0">
                      <div class="d-flex justify-center">
                        <Boxes
                          :count="24"
                          :value="store.maxSporeInfestations"
                          :active="false"
                          :interactive="false"
                          :inverted="true"
                        />
                      </div>
                      <div class="d-flex justify-center mb-1">
                        {{ $t('messages.sporeInfestations') }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" class="ma-0 pa-0">
                      <div class="d-flex justify-center">
                        <Boxes
                          :count="24"
                          :value="store.maxFleshwounds"
                          :active="false"
                          :interactive="false"
                          :inverted="true"
                        />
                      </div>
                      <div class="d-flex justify-center mb-1">
                        {{ $t('messages.fleshwounds') }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col xs="10" class="ma-0 pa-0">
                      <div class="d-flex justify-center">
                        <Boxes
                          :count="24"
                          :value="store.maxTrauma"
                          :active="false"
                          :interactive="false"
                          :inverted="true"
                        />
                      </div>
                      <div class="d-flex justify-center mb-1">
                        {{ $t('messages.trauma') }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col xs="4" class="sheetBlock potentialsBlock">
                <v-container class="attribute ma-0 pa-0 mb-2">
                  <v-row class="ma-0 pa-0">
                    <v-col class="ma-0 pa-0">
                      <div class="blockLabel float-left ma-0 pl-1">
                        {{ $t(`messages.potentials`) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <div v-for="{ potential, value } in potentials()" :key="potential">
                  <v-container class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0">
                      <v-col xs="2" class="ma-0 pa-0">
                        <span class="potentialsText">{{ potential }}</span>
                      </v-col>
                      <v-col xs="10" class="ma-0 pa-0">
                        <div class="float-end">
                          <Boxes :value="value" :count="3" :active="false" :interactive="false" />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div v-for="index in 6 - potentials().length" :key="index">
                  <v-container class="ma-0 pa-0">
                    <v-row class="ma-0 pa-0">
                      <v-col xs="2" class="ma-0 pa-0">
                        <SheetText class="potentialsText" />
                      </v-col>
                      <v-col xs="10" class="ma-0 pa-0">
                        <div class="float-end">
                          <Boxes :count="3" :active="false" :interactive="false" />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-col>
            </v-row>
            <v-row class="row">
              <v-col>
                <table>
                  <tr>
                    <th class="equipmentName">{{ $t(`sheet.weapon.name`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.handling`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.distance`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.damage`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.magazine`) }}</th>
                    <th class="equipmentProperties">{{ $t(`sheet.weapon.properties`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.encumbrance`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.tech`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.weapon.slots`) }}</th>
                  </tr>
                  <tr v-for="index in 4" :key="index">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row class="row">
              <v-col>
                <table>
                  <tr>
                    <th class="equipmentArmorName">{{ $t(`sheet.armor.name`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.armor.value`) }}</th>
                    <th class="equipmentArmorProperties">{{ $t(`sheet.armor.properties`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.armor.encumbrance`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.armor.tech`) }}</th>
                    <th class="equipmentSlot">{{ $t(`sheet.armor.slots`) }}</th>
                  </tr>
                  <tr v-for="index in 4" :key="index">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SheetArchetype from '@/components/SheetArchetype.vue'
import SheetText from '@/components/SheetText.vue'
import Boxes from '@/components/ValueBoxes.vue'
import config from '@/config'
import messages from '@/config/messages'
import type { Potential } from '@/config/potentials/potential'
import { SkillsByAttribute } from '@/config/properties'
import { useCharacterStore } from '@/store'
import romanize from '@/util/romanize'
import { mdiFileDocumentArrowRight } from '@mdi/js'
import domtoimage from 'dom-to-image'
import { jsPDF } from 'jspdf'
import slugify from 'slugify'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { attributes, origins, appName } = config
const store = useCharacterStore()
const i18n = useI18n()

const englishPotentialNames = new Map(Object.entries(messages.en.potentials))
function englishName(potential: Potential) {
  return englishPotentialNames.get(potential.name) || potential.name
}
const potentials = () => {
  return Array.from(store.potentials.entries())
    .filter((x) => x[1] > 0)
    .map(([p, v]) => {
      const label = i18n.t(`potentials.${p.name}`)
      return { potential: label, value: v }
    })
    .sort((p1, p2) => p1.potential.localeCompare(p2.potential))
    .slice(0, 6)
}
const legacies = () => {
  return Array.from(store.legacies.entries())
    .filter((x) => x[1] > 0)
    .map(([p, v]) => {
      const label = i18n.t(`legacies.${p.name}`)
      return { potential: label, value: v }
    })
    .sort((p1, p2) => p1.potential.localeCompare(p2.potential))
    .slice(0, 6)
}

const sheetIsGenerating = ref(false)
const generateSheet = () => {
  sheetIsGenerating.value = true
  const el = document.querySelector('#sheet')
  if (!el) {
    sheetIsGenerating.value = false
    throw new Error('Could not select element')
  }
  const scale = 4
  const width = el.clientWidth * scale
  const height = el.clientHeight * scale
  domtoimage
    .toPng(el, {
      width: width,
      height: height,
      style: {
        transform: 'scale(' + scale + ')',
        'transform-origin': 'top left'
      }
    })
    .then(function (dataUrl) {
      const img = new Image()
      img.src = dataUrl
      const doc = new jsPDF('p', 'mm', 'A4')
      doc.addImage({
        imageData: dataUrl,
        format: 'PNG',
        x: 0,
        y: 0,
        width: doc.internal.pageSize.width,
        height: doc.internal.pageSize.height,
        compression: 'FAST'
      })
      sheetIsGenerating.value = false
      const fileName = `${config.appName}${
        store.characterName.length > 0 ? '-' + slugify(store.characterName) : ''
      }.pdf`
      doc.save(fileName)
    })
    .catch(function (error) {
      sheetIsGenerating.value = false
      console.error('oops, something went wrong!', error)
    })
}
</script>

<style scoped>
.page {
  /* scroll as an ugly hack to let mobile viewers see the whole sheet until we fix the layout */
  overflow: scroll;
}

#sheetContainer {
  width: 210mm;
  height: 297mm;
  margin-left: 1em;
  margin-top: 1em;
  font-size: 7pt;
}

#sheet {
  padding: 10mm 15mm 15mm;
}

.logo {
  width: 40mm;
}

.appName {
  border-top: 1px solid black;
}

.sheetBlock {
  min-width: 45mm;
  text-transform: uppercase;
}

.attributeBlock {
  margin-left: 15mm;
}

.attributeBlock:nth-of-type(4),
.attributeBlock:first-of-type {
  margin-left: 0;
}

.statusBlock {
  min-width: 70mm;
  max-width: 80mm;
}

.coreDataBlock {
  min-width: 55mm;
  max-width: 55mm;
}

.archetypeBlock {
  min-width: 60mm;
  max-width: 60mm;
}

.potentialsBlock {
  max-width: 50mm;
}

.potentialsText {
  margin-top: 2.8mm;
  width: 32mm;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.boxes {
  max-width: 21.5mm;
}

.blockLabel {
  height: 3.5mm;
  background: black;
  width: 100%;
  color: white;
  font-weight: bold;
  /* Force background to show up in print */
  -webkit-print-color-adjust: exact !important; /* Chrome, Safari 6 – 15.3, Edge */
  print-color-adjust: exact !important; /* Firefox 97+, Safari 15.4+ */
}

.row {
  width: 180mm;
}

th {
  text-transform: uppercase;
  font-weight: normal;
  opacity: 0.5;
  text-align: left;
}

.equipmentName {
  width: 37mm;
}

.equipmentArmorName {
  width: 57mm;
}

.equipmentArmorProperties {
  width: 60mm;
}

.equipmentProperties {
  width: 40mm;
}

.equipmentSlot {
  width: 14mm;
}

td {
  padding-top: 5mm;
  border-bottom: 1px solid black;
}

@page {
  size: A4;
  margin: 0;
}
</style>
