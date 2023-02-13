<template>
  <div class="page m-4">
    <ACard
      title="404"
      subtitle="La pagina che stai cercando non esiste"
      variant="fill"
      color="var(--card)"
    >
      <div class="a-card-body">
        <ABtn color="info" @click="$router.push('/')">Home</ABtn>
      </div>
    </ACard>
  </div>
</template>
