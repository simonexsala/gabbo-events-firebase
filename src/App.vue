<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="content m-a max-w-2xl">
    <div class="grid-row grid-cols-2 pl-8 pr-8 justify-center flex items-center w-full">
      <img src="../public/logo.png" class="h-[10rem]" alt="logo" />
      <div>
        <p class="title titleGabbo mb-2 text-xl text-primary select-none">Gabbo</p>
        <p class="title titleEvents text-sm text-primary select-none">Events</p>
      </div>
    </div>

    <div class="navbar ml-4 mr-4 rounded-lg text-center">
      <div class="inline-block p-3">
        <RouterLink class="pt-3 pb-2" to="/">Home</RouterLink>
        <RouterLink class="pt-3 pb-2" to="/prevendite">Prevendite</RouterLink>
        <RouterLink class="pt-3 pb-2" to="/navette">Navette</RouterLink>
        <RouterLink class="pt-3 pb-2" to="/foto">Foto</RouterLink>
        <RouterLink class="pt-3 pb-2 lastChild" to="/eventi">Eventi</RouterLink>
      </div>
    </div>
    <RouterView v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

   <div class="grid-row grid-cols-3 mb-4">
      <div class="flex gap-x-2 ml-4 items-center">
        <AAvatar
          icon="i-bx-trending-up"
          color="success"
          class="rounded-9 text-[1rem]"
        />
        <ATypography
          class="!children:leading-tight"
          :title="['Eventi', 'text-xs !text-medium-emphasis font-normal']"
          :subtitle="['12', 'text-l font-bold !text-high-emphasis']"
        />
      </div>

      <div class="flex gap-x-2 items-center">
        <AAvatar
          icon="i-bx-face"
          color="info"
          class="rounded-9 text-[1rem]"
        />
        <ATypography
          class="!children:leading-tight"
          :title="['Clienti', 'text-xs !text-medium-emphasis font-normal']"
          :subtitle="['3000+', 'text-l font-bold !text-high-emphasis']"
        />
      </div>

      <div class="flex gap-x-2 items-center">
        <AAvatar
          icon="i-bx-navigation"
          color="danger"
          class="rounded-9 text-[1rem]"
        />
        <ATypography
          class="!children:leading-tight"
          :title="['Luoghi', 'text-xs !text-medium-emphasis font-normal']"
          :subtitle="['7', 'text-l font-bold !text-high-emphasis']"
        />
      </div>
    </div>

    <p class="text-xs opacity-60 text-center pb-2">
      Creato e mantenuto da <a href="https://simonesala.xyz" class="underline">Simone Sala</a> 
    </p>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Fugaz One', cursive;
  text-transform: uppercase;
}
.titleGabbo {
  font-size: 2.5rem;
}
.titleEvents {
  font-size: 2rem;
}

a {
  margin-right: 0.8rem;
  user-select: none;
}

.lastChild {
  margin-right: 0;
}

@media (max-width: 355px) {
  a {
    font-size: 0.8rem;
  }
}

@media (min-width: 355px) and (max-width: 380px) {
  a {
    font-size: 0.9rem;
  }
}

a.router-link-active {
  border-bottom: 3px solid var(--info);
  color: var(--info);
}

.navbar {
  background-color: var(--card); 
}
</style>
