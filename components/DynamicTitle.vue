<template>
    <div class="flex flex-col justify-left space-y-6 mt-3 mb-3">
        <h1 class="text-5xl md:text-6xl font-bold">Bonjour je suis <span  id="element"></span></h1>
        <div class="text-xl md:w-[600px] space-y-4">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
const typed = useTypedJs()
onMounted(() => {
  typed('#element', {
    strings: ['Apprentis', 'Développeurs', 'Designers', 'Freelancers'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  })
})
</script>