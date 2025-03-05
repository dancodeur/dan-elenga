<template>
    <Header/>
    <Status/>
    <div>
        <DynamicTitle>
            <p class="text-lg font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, temporibus?</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi neque enim doloribus debitis ipsum optio reiciendis tempore nostrum? Sequi assumenda optio voluptate facilis. Corrupti maxime voluptas soluta adipisci? Nobis </p>
        </DynamicTitle>
    </div>

    <BullAnnonce/>

    <BlocCompetences title="Framework" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, temporibus?">
        <UIcon  v-gsap.parallax.faster-30 v-gsap.magnetic.stronger name="i-simple-icons-react" class="w-[6rem] h-[6rem] text-[#61DAFB]" />
        <UIcon  v-gsap.parallax.faster-40 v-gsap.magnetic.stronger name="i-simple-icons-vuedotjs" class="w-[6rem] h-[6rem] text-[#4FC08D]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-tailwindcss" class="w-[6rem] h-[6rem] text-[#06B6D4]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-nuxt" class="w-[6rem] h-[6rem] text-[#00DC82]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-adonisjs" class="w-[6rem] h-[6rem] text-[#5A45FF]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-symfony" class="w-[6rem] h-[6rem] text-[#000000]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-android" class="w-[6rem] h-[6rem] text-[#34A853]" />
    </BlocCompetences>

    <BlocCompetences title="Programmation" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, temporibus?">
        <UIcon  v-gsap.parallax.faster-30 v-gsap.magnetic.stronger  name="i-simple-icons-php" class="w-[6rem] h-[6rem] text-[#777BB4]" />
        <UIcon  v-gsap.parallax.faster-40 v-gsap.magnetic.stronger  name="i-simple-icons-python" class="w-[6rem] h-[6rem] text-[#3776AB]" />
        <UIcon  v-gsap.parallax.faster-40 v-gsap.magnetic.stronger  name="i-simple-icons-kotlin" class="w-[6rem] h-[6rem] text-[#7F52FF]" />
        <UIcon  v-gsap.parallax.faster-40 v-gsap.magnetic.stronger  name="i-simple-icons-javascript" class="w-[6rem] h-[6rem] text-[#F7DF1E]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger  name="i-simple-icons-typescript" class="w-[6rem] h-[6rem] text-[#3178C6]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger  name="i-simple-icons-postgresql" class="w-[6rem] h-[6rem] text-[#4169E1]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger  name="i-simple-icons-mysql" class="w-[6rem] h-[6rem] text-[#4479A1]" />
       
    </BlocCompetences>

    <BlocCompetences title="Outils" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, temporibus?">
        <UIcon  v-gsap.parallax.faster-30 v-gsap.magnetic.stronger name="i-simple-icons-github" class="w-[6rem] h-[6rem] text-[#181717]" />
        <UIcon  v-gsap.parallax.faster-40 v-gsap.magnetic.stronger name="i-simple-icons-git" class="w-[6rem] h-[6rem] text-[#F05032]" /> 
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-docker" class="w-[6rem] h-[6rem] text-[#2496ED]" />
        <UIcon  v-gsap.parallax.faster-20 v-gsap.magnetic.stronger name="i-simple-icons-linux" class="w-[6rem] h-[6rem] text-[#FCC624]" />
    </BlocCompetences>
    
    <TextDefil/>
    <!--Projet-->
    <Projet/>

</template>

<script setup>
import TextDefil from '~/components/TextDefil.vue';



</script>