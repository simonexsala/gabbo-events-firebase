<template>
  <div class="page m-4">
    <ACard
      variant="fill"
      color="var(--card)"
    >
      <img
        src="../../public/eventi.jpg"
        alt=""
      >
      <template #title>
        <div class="!text-high-emphasis flex justify-between items-center">
          <span>{{ this.$evento.nome }}</span>
        </div>
      </template>
      <template #subtitle>
        <div class="flex justify-between items-center">
          <span>{{ this.$evento.data }}, {{ this.$evento.luogo }}</span>
        </div>
      </template>
    </ACard>
  </div>
</template>
