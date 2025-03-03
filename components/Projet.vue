<template>
    <section class="h-[500px] grid grid-cols-12">
       <div class="col-span-5 bg-card-image" v-gsap.parallax.slower >
       </div>

       <div class="col-span-5 bg-card-image" v-gsap.parallax.faster >
       </div>

       <div  v-gsap.parallax.slower-10>
          <UIcon name="i-simple-icons-github" class="w-[4rem] h-[4rem]" />
       </div>
    </section>

</template>


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