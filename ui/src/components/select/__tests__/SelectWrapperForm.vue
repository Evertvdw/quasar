<template>
<div class="q-pa-md">
    <q-form class="q-gutter-md">
      <q-select
        v-bind="$attrs"
        v-model="preferred"
        :options="options"
      />
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  setup () {
    return {
      preferred: ref('rock'),

      options: [
        {
          label: 'Rock',
          value: 'rock'
        },
        {
          label: 'Funk',
          value: 'funk'
        },
        {
          label: 'Pop',
          value: 'pop'
        }
      ]
    }
  }
})

</script>
