<template>
    <section class="height-[850px] text-center ">
        <div class="text-6xl" v-gsap.whenVisible.to="{ x: -300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">Je vous présente</div>
        <div class="text-6xl" v-gsap.whenVisible.to="{ x: 300, start: 'top bottom', end: 'bottom top', scrub: 1.5 }">les applications que j'ai développée</div>
    </section>
</template>