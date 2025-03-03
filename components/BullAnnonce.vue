<template>
    <section v-gsap.timeline.pinned>
        <div class="Dot" v-gsap.add.fromTo="[{ scale: 0.65 }, { scale: 1 }]" v-gsap.draggable>
            <h1
                v-gsap.add.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
                v-gsap.add.to="{ opacity: 0, y: -32, color: '#fff' }">
                A la Recherche
            </h1>
            <h1
                v-gsap.add.withPrevious.fromTo="[{ opacity: 0, y: 32 }, { opacity: 1, y: 0 }]"
                v-gsap.add.to="{ opacity: 0, y: -32, color: '#fff' }">
                d'alternance
            </h1>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.Dot {
    width: 300px;
    height: 300px;
    background-color: orange;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 100px;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transform-origin: center;
    transition: transform 0.3s ease; /* Transition for hover effect */
}

h1 {
    font-size: 3rem;
    z-index: 2;
    position: absolute;
    color: #fff; /* Initial color */
}
</style>