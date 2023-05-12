<template>
  <div class="page m-4">
    <ADialog
      v-model="navetteNonAttive"
      title="Navette non disponibili!"
      variant="light"
      color="#FFF"
      text="Ci dispiace, le navette per questo evento non sono disponibili."
      persistent
    >
      <div class="a-card-body a-card-spacer">
        <ABtn
          variant="light"
          class="text-sm"
          @click="$router.push('/')"
        >
          Home
        </ABtn>
      </div>
    </ADialog>

    <ACard
      text="Prenota il posto per una singola persona, premi due volte su un'opzione per rimuovere la selezione"
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
            <span class="mx-a">Andata</span>
              <ABtn
                v-for="viaggio in viaggiAndata"
                :key="viaggio.time"
                :variant="selectedOptionAndata === viaggio.time ? 'fill' : 'light'"
                :disabled="isButtonDisabled(viaggio)"
                @click="selectAndata(selectedOptionAndata === viaggio.time ? '' : viaggio.time)"
              >
                {{ viaggio.time }}
              </ABtn>
          </div>
          <div class="flex flex-col gap-y-3">
            <span class="mx-a">Ritorno</span>
            <ABtn
              v-for="viaggio in viaggiRitorno"
              :key="viaggio.time"
              :variant="selectedOptionRitorno === viaggio.time ? 'fill' : 'light'"
              :disabled="isButtonDisabled(viaggio)"
              @click="selectRitorno(selectedOptionRitorno === viaggio.time ? '' : viaggio.time)"
            >
              {{ viaggio.time }}
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
          color="#FFF"
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
                @click="commitToFirebase()"
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

        <AAlert 
          v-model="alertConfermaErrore"
          variant="light"
          color="danger"
          class="mt-4"
          dismissible
        >
          <span>C'è stato un errore nel confermare la prenotazione!</span>
        </AAlert>

        <AAlert 
          v-model="alertConferma"
          variant="light"
          color="success"
          class="mt-4"
          dismissible
        >
          <span>La prenotazione è andata a buon fine!</span>
        </AAlert>

      </div>
    </ACard>
  </div>
</template>

<script>
import { db } from '../firebase'
import { collection, addDoc, query, where, getCountFromServer } from "firebase/firestore";

export default {
  data() {
    return {
      navetteNonAttive: !this.$evento.navetteAttive, 
      selectedOptionAndata: '',
      selectedOptionRitorno: '',
      nome: '',

      viaggiAndata: [
        {
          time: '21:00',
          available: 5,
          booked: 0
        },
        {
          time: '22:00',
          available: 7,
          booked: 0
        },
        {
          time: '23:00',
          available: 9,
          booked: 0
        }
      ],
      viaggiRitorno: [
        {
          time: '01:00',
          available: 4,
          booked: 0
        },
        {
          time: '02:00',
          available: 1,
          booked: 0
        },
        {
          time: '03:00',
          total: 10,
          booked: 0
        },
      ],

      prompt: '',

      dialogPrenotazione: false,
      alertPrenotazione: false,
      prenotazioneConfermata: false,
      alertConferma: false,
      alertConfermaErrore: false,
    }
  },

  created() {
    this.getNumeroPrenotazioni()
  },

  watch: {
    alertConferma(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.alertConferma = false;
        }, 3000);
      }
    },
    alertConfermaErrore(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.alertConfermaErrore = false;
        }, 3000);
      }
    }
  },

  methods: {
    isButtonDisabled(viaggio) {
      return viaggio.available <= viaggio.booked
    },
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

    async commitToFirebase() {
      this.alertPrenotazione = false
      const docRef = await addDoc(collection(db, "navette"), {
        nome: this.nome,
        optionAndata: this.selectedOptionAndata,
        optionRitorno: this.selectedOptionRitorno 
      })

      if(docRef) {
        this.alertConferma = true
      } else {
        this.alertConfermaErrore = true
      }

      this.dialogPrenotazione = false
      this.selectedOptionAndata = ''
      this.selectedOptionRitorno = ''
      this.nome = ''
      this.getNumeroPrenotazioni()
    },

    async getNumeroPrenotazioni() {
      const navetteRef = collection(db, "navette")
      const countArrayAndata = []
      const countArrayRitorno = []

      for (let i = 0; i < this.viaggiAndata.length; i++) {
        const q = query(navetteRef, where("optionAndata", "==", this.viaggiAndata[i].time))
        const snapshot = await getCountFromServer(q)
        countArrayAndata[i] = snapshot.data().count
      }

      for (let i = 0; i < this.viaggiRitorno.length; i++) {
        const q = query(navetteRef, where("optionRitorno", "==", this.viaggiRitorno[i].time))
        const snapshot = await getCountFromServer(q)
        countArrayRitorno[i] = snapshot.data().count
      }

      countArrayAndata.forEach((count, index) => {
        const viaggiIndex = this.viaggiAndata.findIndex(viaggio => viaggio.time === this.viaggiAndata[index].time)
        if (viaggiIndex !== -1) {
          this.viaggiAndata[viaggiIndex].booked = count
        }
      })

      countArrayRitorno.forEach((count, index) => {
        const viaggiIndex = this.viaggiRitorno.findIndex(viaggio => viaggio.time === this.viaggiRitorno[index].time)
        if (viaggiIndex !== -1) {
          this.viaggiRitorno[viaggiIndex].booked = count
        }
      })
    },
  }
}
</script>
