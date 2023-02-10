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

          <ATypography
            :text="['348 649 3733', 'text-success']"
            class="text-sm font-semibold place-self-end"
          />

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
          <ATypography
            :text="['@gabbo_events', 'text-danger']"
            class="text-sm font-semibold place-self-end"
          />
        </div>
      </div>
    </ACard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      telefono: 'mailto: +393486493733',
      instagram: 'https://instagram.com/gabbo_events',
    }
  },
}
</script>
