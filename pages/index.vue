<template>
     <Header/>
     <div class="flex flex-col justify-center min-h-screen">
           <img src="/construction-svgrepo-com.png" alt="en construction image dan elenga" class="md:w-[300px] md:h-[300px] h-[200px] w-[200px] mx-auto" />
           
           <section class="flex flex-col text-center space-y-[3rem]">
               <div class="space-y-3">
                    <h1 class="text-4xl md:text-6xl dark:text-slate-50">En maintenance</h1>
                    <p class=" text-md md:text-xl dark:text-slate-50">Mon portfolio est temporairement en maintenance. J'apporte quelques améliorations pour mieux vous présenter mon travail. 
                         Merci de votre compréhension et à très bientôt !</p>
               </div>

               <div>
                    <a href="/CV Dan Elenga DevOps.pdf" target="_blank" class="p-3 bg-green-500 text-slate-50 dark:text-white">Télécharger mon cv</a>
               </div>
               
                <div class="flex mx-auto space-x-3 items-center">
                         <!-- <a href="https://discord.com" target="_blank">
                             <UIcon v-gsap.magnetic.stronger name="i-simple-icons-discord" class="w-[1.7rem] h-[1.7rem] text-[#4169E1]" />
                         </a> -->
                         <a href="https://hub.docker.com/u/dancodeur" target="_blank">
                             <UIcon v-gsap.magnetic.stronger name="i-simple-icons-docker" class="w-[1.7rem] h-[1.7rem] text-[#2496ED]" />
                         </a>
                         <a href="https://github.com/dancodeur" target="_blank">
                             <UIcon v-gsap.magnetic.stronger name="i-simple-icons-github" class="w-[1.7rem] h-[1.7rem] text-[#181717] dark:text-white" />
                         </a>
                         <a href="https://www.linkedin.com/in/dan-elenga-4ab095229/" target="_blank">
                             <UIcon v-gsap.magnetic.stronger name="i-simple-icons-linkedin" class="w-[1.7rem] h-[1.7rem] text-[#2496ED]" />
                         </a>
                 </div>
           </section>
     </div>
</template>

<script setup>
</script>
