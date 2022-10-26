<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { addEventListenerWrap } from '../../../utils/addEventListener'

const testContextRef = ref()
const testContextRefHandler = ref(null)
const clickCounter = ref(0)

onMounted(() => {
  testContextRefHandler.value = addEventListenerWrap(testContextRef.value, 'click', () => {
    console.log('!!!click!!')
    clickCounter.value++
    if(clickCounter.value > 3) {
      testContextRefHandler.value.remove()
    }
  })
})

</script>

<template>
  <div>
    <div ref="testContextRef" class="demo-context">
      test context
    </div>
  </div>

  <!-- <CascaderDemo /> -->
</template>


<style scoped>
.demo-context {
  background-color: #ddd;
}
</style>
