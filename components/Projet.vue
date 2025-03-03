<template>
    <section class="h-[500px] grid grid-cols-12">
       <div class="col-span-5 bg-card-image" v-gsap.parallax.slower >
       </div>

       <div class="col-span-5 bg-card-image" v-gsap.parallax.faster >
       </div>

       <div  v-gsap.parallax.slower-10 class="w-[400px]">
            <h1 class="text-3xl" v-gsap.whenVisible.animateText.slow>{{ title ? title: "Ici le titre du projet" }}</h1>
            <p class="text-md" v-gsap.whenVisible.animateText.fast>{{ description ? description: "Iici la description du projet" }}</p>
       </div>
    </section>

</template>

<script setup>
    defineProps({
        title: String,
        description: String
    })
</script>

<style scoped>
.bg-card-image {
    background-image: url('/projet_images/Application de géolocalisation  - temps reel.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height:800px;
    width: 800px;
}
</style>