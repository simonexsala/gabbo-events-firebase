<template>
  <div class="page m-4">
    <ACard
      title="Gabbo Events"
      subtitle="di Gabriele Dorigoni"
      text="I migliori eventi di Trento e dintorni"
      variant="fill"
      color="var(--card)"
    >

      <div class="a-card-body">
        <div class="grid-row items-center grid-cols-[auto_1fr_auto]">
          <AAvatar
            icon="i-bx-phone"
            color="success"
            class="rounded-lg text-[1.25rem]"
          />
          <ATypography
            title="Telefono"
            subtitle="per ogni evenienza"
            class="text-sm"
          />

          <a :href="'tel: +393486493733'" class="text-sm font-semibold place-self-end">
          <ATypography
            :text="['348 649 3733', 'text-success']"
            class="text-sm font-semibold place-self-end"
          />
          </a>

          <AAvatar
            icon="i-bx-like"
            color="danger"
            class="rounded-lg text-[1.25rem]"
          />
          <ATypography
            title=Instagram
            subtitle="la pagina social"
            class="text-sm"
          />
          <a :href="'https://instagram.com/gabbo_events'" class="text-sm font-semibold place-self-end">
          <ATypography
            :text="['@gabbo_events', 'text-danger']"
            class="text-sm font-semibold place-self-end"
          />
          </a>
        </div>
      </div>
    </ACard>

    <ACard
      :text="text"
      variant="fill"
      color="primary"
      class="mt-4"
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
      <template #text>
        <div class="flex justify-between items-center">
          <span>{{ this.$evento.data }}, {{ this.$evento.luogo }}</span>
        </div>
      </template>
      <div class="a-card-body a-card-spacer">
        <ABtn color="info" @click="$router.push('/prevendite')">Prevendite</ABtn>
      </div>
    </ACard>

  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Assicurati il tuo ingresso al prossimo evento.',
    }
  },
}
</script>
