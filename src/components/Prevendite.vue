<template>
  <div class="page m-4">

    <ADialog
      v-model="soldOut"
      title="Prevendite sold out!"
      variant="light"
      color="#FFF"
      text="Ci dispiace, non sono più disponibili prevendite per questo evento."
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

    <ADialog
      v-model="prevenditeOnline"
      title="Prevendite non disponibili!"
      variant="light"
      color="#FFF"
      text="Ci dispiace, le prevendite per questo evento non sono disponibili online."
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
      :text="textConditions"
      img="/prevendite.jpg"
      imgAlt=""
      variant="fill"
      color="var(--card)"
    >
      <template #title>
        <div class="!text-high-emphasis text-3xl flex justify-between items-center">
          <span>{{ this.$evento.nome }}</span>
       </div>
      </template>
      <template #subtitle>
        <div class="flex text-xl justify-between items-center">
          <span>{{ this.$evento.data }} &#x2022; <i>{{ this.$evento.luogo }}</i></span>
        </div>
        <div class="opacity-50 flex text-sm justify-between items-center">
          <span>{{ this.$evento.indirizzo }}</span>
        </div>
        <div class="flex text-xl justify-between items-center">
          <span>Ingresso con open bar fino a mezzanotte</span>
        </div>
      </template>

      <div class="a-card-body">
        <!-- <div class="grid-row grid-cols-3 justify-items-stretch mb-4"> 
        <div class="grid-row grid-cols-2 justify-items-stretch mb-4">
          <ABtn
            v-model="opzione"
            value="drink"
            :variant="opzione === 'drink' ? 'fill' : 'light'"
            @click="prezzo = this.$evento.drink; opzione = 'drink'"
            :disabled="drinkActive"
            class="w-full"
          >
            Drink
          </ABtn>
          <ABtn
            v-model="opzione"
            value="tavolo"
            :variant="opzione === 'tavolo' ? 'fill' : 'light'"
            @click="prezzo = this.$evento.tavolo; opzione = 'tavolo'; if (ingressi < 6) { ingressi = 6; }"
            :disabled="tavoloActive"
            class="w-full"
          >
            Tavolo
          </ABtn>
        </div>
        -->

        <div class="flex-inline items-center grid-row grid-cols-2 w-full mb-4">
          <div class="w-full">
            <ASelect
              v-model="ingressi"
              placeholder="Seleziona ingressi"
              :options="numeri"
            />
          </div>
        </div>

        <div class="mb-2"> 
          <div class="flex-inline items-center grid-row grid-cols-2 w-full">
            <div class="items-center text-center bg-primary bg-opacity-50 p-2 w-full rounded-lg">
              <span class="!text-high-emphasis">
                {{ totale = ((ingressi * prezzo)).toFixed(1) }}0€
              </span>
            </div>
            <ABtn
              variant="light"
              icon="i-bx-heart"
              class="w-full"
              @click="isPaypalShown = true; prompt = totale + '0€ per ' + ingressi + ' ' + opzione"
            >
              Acquista
            </ABtn>
          </div> 
        </div>
        <p class="text-xs opacity-40 text-center">
          Commissione automaticamente inclusa 
        </p>
        <p class="text-xs opacity-40 text-center">
          I dati sono trattati ai sensi del regolamento UE 2016/679 
        </p>

        <ADialog
          v-model="isPaypalShown"
          title="Completa con Paypal"
          :subtitle="[this.prompt]"
          variant="light"
          color="#FFF"
          img="/prevendite.jpg"
          alt=""
          persistent
        >
          <div class="a-card-body">
            <div v-if="isPaypalLoading" class="mb-7 flex justify-center items-center">
              <div class="spinner inline-block w-10 h-10" role="status" />
            </div>
            <div id="paypal-container" />
            <ABtn
              variant="light"
              class="text-sm"
              @click="isPaypalShown = false"
            >
              Indietro
            </ABtn>
          </div>
        </ADialog>

        <ADialog
          v-model="isPaypalPaid"
          title="Grazie per aver acquistato"
          :subtitle="[this.dateMessage]"
          text="Controlla la mail per ulteriori informazioni. L'acquisto è andato a buon fine se hai ricevuto la notifica di pagamento da parte di Paypal."
          variant="light"
          color="#FFF"
          persistent
        >
          <div class="a-card-body">
            <ABtn
              variant="light"
              class="text-sm"
              @click="isPaypalPaid = false"
            >
              Indietro
            </ABtn>
          </div>
        </ADialog>
      </div>
    </ACard>

  </div>
</template>

<script>
export default {
  data() {
    return {
      numeri: [1, 2, 3, 4, 5, 6, 7, 8, 9],

      drinkActive: !this.$evento.drinkOpzione,
      birraActive: !this.$evento.birraOpzione,
      tavoloActive: !this.$evento.tavoloOpzione,

      textConditions: '',

      opzione: 'ingresso',
      ingressi: 1,
      prezzo: this.$evento.drink,
      totale: this.prezzo + this.prezzo / 100 * 4,
      prompt: this.totale + '0€ per ' + this.ingressi + ' ' + this.opzione,
      // prompt: this.totale + '0€, per ' + this.ingressi + ' ingressi ' + this.opzione,
      dateMessage: 'Ci vediamo ' + this.$evento.data,
      link: this.$evento.link,

      soldOut: this.$evento.soldOut,
      prevenditeOnline: !this.$evento.prevenditeOnline,
      isPaypalShown: false,
      isPaypalPaid: false,
      isPaypalLoading: true,
      isPaypalLoadingReq: true,
      options: [this.$evento.drink, this.$evento.birra, this.$evento.tavolo],
    }
  },
  watch: {
    isPaypalShown: function(newVal, oldVal) {
      if (newVal === true) {
        this.hidePaypalContainer();
      }
    },
    opzione: function(newVal, oldVal) {
      if (newVal === 'tavolo') {
        this.numeri = [6, 7, 8, 9, 10, 11, 12]
      } else {
        this.numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    }
  },
  mounted: function () {
    const script = document.createElement("script");
    // Test
    // script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AfCfb7SWLyUbf0LwTzeqPyGVyMrlp_lrCryYrzYb_5AvMOzsXejI2npeIpFEkC4WhGGm1zm7XY1VAEtV&disable-funding=card";

    // Production
    script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AbYSdeaxvCLLplFYtmmfwLOGYf_k_INjhq-WI1Q1BUcIW-Uu0ZowwYfA5D5sA1J2VT0Sj1A5ZhLlhKBz&disable-funding=card";
    
    // Old Gabbo
    // script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AYt8UxPRZS1k32KYmPOV142g7_hmJbEFpNmooZ73Ts79E6PWT4dNM94czFJzE-EJWF2iV3Ue1yaIRkKP&disable-funding=card";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    if (!this.drinkActive)
      this.textConditions += "Ingresso con drink " + this.$evento.drink + "€";
    if (!this.birraActive)
      this.textConditions += ", birra illimitata " + this.$evento.birra + "€";
    if (!this.tavoloActive)
      this.textConditions += ", tavolo " + this.$evento.tavolo + "€";
  },
  methods: {
    hidePaypalContainer: function() {
      this.isPaypalLoading = true
      document.getElementById('paypal-container').style.display = 'none'

      setTimeout(() => {
        document.getElementById('paypal-container').style.display = 'block'
        if (this.isPaypalLoadingReq)
          this.isPaypalLoading = true
        else
          this.isPaypalLoading = false
      }, 3000);
    },

    setLoaded: function () {
      this.isPaypalLoadingReq = false
      window.paypal.Buttons({
        style: {
          shape: 'pill',
          color: 'blue',
          layout: 'horizontal',
          label: 'paypal',
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: "Gabbo Events Prevendita. " + this.ingressi + " " + this.opzione,
              amount: {
                currency_code: "EUR",
                value: this.totale,
              }
            }]
          });
        },

        onApprove: (data, actions) => {
          this.isPaypalPaid = true;
          this.isPaypalShown = false;
          return actions.order.capture().then(function (orderData) {
            const transaction = orderData.purchase_units[0].payments.captures[0];
          });
        }
      }).render('#paypal-container');
    },
  },
};
</script>

<style scoped>
.spinner {
  border: 3px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
} 
</style>
