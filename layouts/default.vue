<template>
    <NuxtParticles id="tsparticles" :options="options" @load="onLoad"/>
    <!--Container of page-->
    <UContainer>
      <!--Souris personnalisé-->
      <!--
       Color gray : #D3D3D3 / #A9A9A9
      -->
        <CustomCursor />
        <slot/>
    </UContainer>
</template>

<script setup lang="ts">
import type { Container } from '@tsparticles/engine'

const options = {
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  particles: {
    color: {
      value: '#A9A9A9',
    },
    links: {
      color: '#D3D3D3',
      enable: true,
    },
    move: {
      enable: true,
    },
    number: {
      value: 50,
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
};

const onLoad = (container: Container) => {
  // Do something with the container
  container.pause()
  setTimeout(() => container.play(), 2000)
}
</script>