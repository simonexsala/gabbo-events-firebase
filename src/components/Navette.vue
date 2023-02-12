<template>
  <div class="page m-4">
    <ACard
      text="Prenota il posto per una singola persona, premi due volte per rimuovere la selezione"
      variant="fill"
      color="var(--card)"
    >

      <template #title>
        <div class="!text-high-emphasis flex justify-between items-center">
          <span>Navette {{ this.$evento.nome }}</span>
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

      <div class="a-card-body">
        <div class="grid-row grid-cols-2 justify-items-stretch">
          <div class="flex flex-col gap-y-3">
            <span>Andata</span>
            <ABtn
              v-for="optionAndata in optionsAndata"
              :key="optionAndata"
              :variant="selectedOptionAndata === optionAndata ? 'fill' : 'light'"
              @click="selectAndata(selectedOptionAndata === optionAndata ? '' : optionAndata)"
            >
              {{ optionAndata }}
            </ABtn>
          </div>
          <div class="flex flex-col gap-y-3">
            <span>Ritorno</span>
            <ABtn
              v-for="optionRitorno in optionsRitorno"
              :key="optionRitorno"
              :variant="selectedOptionRitorno === optionRitorno ? 'fill' : 'light'"
              @click="selectRitorno(selectedOptionRitorno === optionRitorno ? '' : optionRitorno)"
            >
              {{ optionRitorno }}
            </ABtn>
          </div>
        </div>

        <AInput
          placeholder="Nome e cognome"
          prepend-inner-icon="i-bx-check-double"
          class="mt-4"
          v-model="nome"
        />
        <ABtn class="w-full mt-4"
              variant="light"
              icon="i-bx-heart"
              @click="handlePrenota"
        >
          <span>Prenota</span>
        </ABtn>

       <ADialog
          v-model="dialogPrenotazione"
          title="Conferma prenotazione"
          variant="light"
          color="var(--background)"
          :subtitle="[this.prompt]"
          persistent
        >
          <div class="a-card-body">
            <div class="grid-row grid-cols-2 justify-items-stretch mb-4">
              <ABtn
                variant="light"
                color="danger"
                class="text-sm"
                @click="dialogPrenotazione = false"
              >
                Indietro
              </ABtn>
              <ABtn
                variant="light"
                color="success"
                class="text-sm"
                @click=""
              >
                Conferma
              </ABtn>
            </div>
          </div>
        </ADialog>

        <AAlert 
          v-model="alertPrenotazione"
          variant="light"
          color="danger"
          class="mt-4"
          dismissible
        >
          <span>Inserisci nome e cognome e seleziona almeno un viaggio!</span>
        </AAlert>

      </div>
    </ACard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsAndata: ['21:00', '22:00', '23:00'],
      selectedOptionAndata: '',
      optionsRitorno: ['01:00', '02:00', '03:00'],
      selectedOptionRitorno: '',
      nome: '',

      prompt: '',

      dialogPrenotazione: false,
      alertPrenotazione: false,
    }
  },
  methods: {
    selectAndata(option) {
      this.selectedOptionAndata = option
    },
    selectRitorno(option) {
      this.selectedOptionRitorno = option
    },
    datiValidi() {
      this.prompt = 'A nome ' + this.nome 
      if (this.selectedOptionAndata)
        this.prompt += ', andata ' + this.selectedOptionAndata
      if (this.selectedOptionRitorno)
        this.prompt += ', ritorno ' + this.selectedOptionRitorno
      return this.nome && (this.selectedOptionAndata || this.selectedOptionRitorno);
    },
    handlePrenota() {
      if (this.datiValidi()) {
        this.dialogPrenotazione = true
        this.alertPrenotazione = false
      } else {
        this.alertPrenotazione = true
      }
    },
  },
}
</script>
