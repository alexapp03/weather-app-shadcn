<template>
  <Command class="rounded-lg border shadow-md max-w-[450px]">
    <CommandInput v-model="query" placeholder="Search for city or state" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        <CommandItem v-for="item in featureList" :value="item.id" :key="item.id">
          <span>{{ item.properties.name }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from '@/components/ui/command'

import { watchDebounced } from '@vueuse/core'
import { Constants } from '@/models'
import { mapboxService, type MapboxFeature } from '@/services/api'

const query = ref<string>('')
const featureList = ref<MapboxFeature[]>([])

watchDebounced(
  query,
  () => {
    searchWeather()
  },
  { debounce: Constants.DEBOUNCE_DELAY },
)

async function searchWeather() {
  if (!query.value.length) {
    return
  }
  const response = await mapboxService.geolocation.forwardGeocode({
    q: query.value,
  })
  featureList.value = response.features
}
</script>

<style scoped></style>
