<template>
  <div class="page m-4">
    <ACard
      variant="fill"
      color="var(--card)"
    >
      <img
        src="../../public/locandina.jpg"
      >
      <template #title>
        <div class="!text-high-emphasis flex justify-between items-center">
          <span>{{ this.$evento.nome }}</span>
          <a
            target="_blank"
            href=""
            class="underline text-sm"
          >Link</a>
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
