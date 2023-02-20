<template>
  <div class="page m-4">
    <ACard
      variant="fill"
      color="var(--card)"
    >
      <img
        src="../../public/evento.jpg"
        alt=""
      >
      <template #title>
        <div class="!text-high-emphasis flex justify-between items-center">
          <span>Foto {{ this.$oldEvento.nome }}</span>
          <a
            target="_blank"
            :href="link"
            class="underline text-sm"
          >
            link
          </a>
          <a
            target="_blank"
            href="https://we.tl/t-e6LXx9imel"
            class="underline text-sm"
          >
            link
          </a>
        </div>
      </template>
      <template #subtitle>
        <div class="flex justify-between items-center">
          <span>{{ this.$oldEvento.data }}, {{ this.$oldEvento.luogo }}</span>
        </div>
      </template>
    </ACard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: this.$oldEvento.link,
    }
  },
}
</script>
