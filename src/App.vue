<script setup>
</script>

<template>
  <div class="content">
    <div class="grid-row grid-cols-2 pl-8 pr-8 items-center w-full">
      <img src="../public/logo.png" class="h-[10rem]" alt="logo" />
      <span class="title">Gabbo Events</span>
    </div>

    <div class="inline-block pl-4 relative">
      <router-link class="" to="/">Home</router-link>
      <router-link class="" to="/prevendite">Prevendite</router-link>
      <router-link class="" to="/navette">Navette</router-link>
      <router-link class="" to="/foto">Foto</router-link>
      <router-link class="" to="/eventi">Eventi</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

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
          :subtitle="['8', 'text-l font-bold !text-high-emphasis']"
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
          :subtitle="['1000+', 'text-l font-bold !text-high-emphasis']"
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
          :subtitle="['4', 'text-l font-bold !text-high-emphasis']"
        />
      </div>
    </div>

    <p class="text-xs opacity-40 text-center">
      Creato e mantenuto da Simone Sala
    </p>
  </div>
</template>



<style scoped>
.title {
  font-family: 'Monoton', cursive;
  font-size: 2rem;
  color: var(--danger);
}

a {
  font-weight: bold;
  margin-right: 1rem;
}

a.router-link-active, a:hover {
  border-bottom: 2px solid var(--info);
  color: var(--info);
}
</style>
