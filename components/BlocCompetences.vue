<template>
    <div class="grid grid-cols-2 gap-4 h-[850px]">
        <div class="col-span-1" v-gsap.parallax.slower>
            <h2 class="text-2xl font-semibold">{{title}}</h2>
            <p class="text-lg">{{ description }}</p>
        </div>
        <div class="col-span-1">
            <slot/>
        </div>
    </div>

</template>

<script setup>
    defineProps({
        title: String,
        description: String
    })
</script>