// filepath: /c:/Users/eleng/Desktop/Offres Alternance/Portfolio/dan/components/CustomCursor.vue
<template>
  <div class="cursor">
    <div class="cursor-border">
      <span class="text">VIEW</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import CustomCursor from 'custom-cursor.js'

onMounted(() => {
  const customCursor = new CustomCursor('.cursor', {
    hideTrueCursor: true,
    focusElements: [
      {
        elements: '.photo-link',
        focusClass: 'cursor--focused-view',
      },
      'a',
    ],
  })
  .setPosition(-30, -30)
  .initialize()

  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  function animate() {
    cursorX += (mouseX - cursorX) * 0.1
    cursorY += (mouseY - cursorY) * 0.1

    customCursor.setPosition(cursorX, cursorY)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

