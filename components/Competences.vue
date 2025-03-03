<template>
    <div class="grid grid-cols-2 gap-4 h-[850px]">
        <div class="col-span-1" v-gsap.parallax.slower>
            <h2 class="text-2xl font-semibold">Compétences</h2>
            <p class="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos.</p>
        </div>
        <div class="col-span-1">
            <UIcon  v-gsap.parallax.faster-30 name="i-heroicons-light-bulb" class="w-[10rem] h-[10rem]" />
            <UIcon  v-gsap.parallax.faster-40 name="i-heroicons-light-bulb" class="w-[10rem] h-[10rem]" />
            <UIcon  v-gsap.parallax.faster-20 name="i-heroicons-light-bulb" class="w-[10rem] h-[10rem]" />
        </div>

    </div>

</template>