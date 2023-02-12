<script setup>
</script>

<template>
  <div class="content dots">
    <div class="grid-row grid-cols-2 pl-8 pr-8 items-center w-full">
      <img src="../public/logo.png" class="h-[10rem]" alt="logo" />
      <span class="title text-primary">Gabbo Events</span>
    </div>

    <div class="navbar p-3 ml-4 mr-4 rounded-lg text-center">
      <div class="inline-block">
        <router-link class="" to="/">Home</router-link>
        <router-link class="" to="/prevendite">Prevendite</router-link>
        <router-link class="" to="/navette">Navette</router-link>
        <router-link class="" to="/foto">Foto</router-link>
        <router-link class="lastChild" to="/eventi">Eventi</router-link>
      </div>
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

    <p class="text-xs opacity-40 text-center pb-2">
      Creato e mantenuto da Simone Sala
    </p>
  </div>
</template>

<style scoped>
.title {
  font-family: 'Fugaz One', cursive;
  font-size: 2rem;
  text-transform: uppercase;
}

a {
  margin-right: 0.8rem;
  user-select: none;
}

.lastChild {
  margin-right: 0;
}

@media (max-width: 370px) {
  a {
  font-size: 0.9rem;
  }
}

a.router-link-active {
  border-bottom: 3px solid var(--info);
  color: var(--info);
}

.router-lionk (:last-of-type) a {
  border-right: 1px dotted #ccc;
}

.navbar {
  background-color: var(--card); 
}
</style>
