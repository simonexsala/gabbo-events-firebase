<template>
  <div class="page m-4">

    <ADialog
      v-model="soldOut"
      title="Prevendite sold out!"
      variant="light"
      color="var(--background)"
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
      color="var(--background)"
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
      img="../../public/prevendite.jpg"
      imgAlt=""
      variant="fill"
      color="var(--card)"
    >
      <template #title>
        <div class="!text-high-emphasis flex justify-between items-center">
          <span>{{ this.$evento.nome }}</span>
          <a
            target="_blank"
            :href="link"
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
        <div class="grid-row grid-cols-3 justify-items-stretch mb-4">
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
            value="birra"
            :variant="opzione === 'birra' ? 'fill' : 'light'"
            @click="prezzo = this.$evento.birra; opzione = 'birra'"
            :disabled="birraActive"
            class="w-full"
          >
            Birra
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

        <div class="flex">
          <div class="w-full mb-4">
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
              <span >
                {{ totale = ((ingressi * prezzo) +  (ingressi * prezzo) / 100 * 4).toFixed(1) }}0€
              </span>
            </div>
            <ABtn
              variant="light"
              icon="i-bx-heart"
              class="w-full"
              @click="isPaypalShown = true; prompt = totale + '0€, per ' + ingressi + ' ingressi ' + opzione"
            >
              Acquista
            </ABtn>
          </div> 
        </div>
        <p class="text-xs opacity-40 text-center">
          Commissione del 4% automaticamente inclusa 
        </p>

        <ADialog
          v-model="isPaypalShown"
          title="Completa con Paypal"
          :subtitle="[this.prompt]"
          variant="light"
          color="#FFF"
          img="../../public/prevendite.jpg"
          alt=""
          persistent
        >
          <div class="a-card-body">
            <div v-if="isPaypalLoading" class="mb-7 flex justify-center items-center">
              <div class="spinner inline-block w-24 h-24" role="status" />
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
          text="Ricorda di controllare la mail per ulteriori informazioni."
          variant="light"
          color="var(--background)"
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

      opzione: 'drink',
      ingressi: 1,
      prezzo: this.$evento.drink,
      totale: this.prezzo + this.prezzo / 100 * 4,
      prompt: this.totale + '0€, per ' + this.ingressi + ' ingressi ' + this.opzione,
      dateMessage: 'Ci vediamo il ' + this.$evento.data,
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
    }
  },
  mounted: function () {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AYt8UxPRZS1k32KYmPOV142g7_hmJbEFpNmooZ73Ts79E6PWT4dNM94czFJzE-EJWF2iV3Ue1yaIRkKP";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    if (!this.drinkActive)
      this.textConditions += "Free drink " + this.$evento.drink + "€";
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
          layout: 'vertical',
          label: 'paypal',
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: "Gabbo Events Prevendita, " + this.ingressi + "x " + this.opzione,
              amount: {
                currency_code: "EUR",
                value: this.totale,
              }
            }]
          });
        },

        onApprove: (data, actions) => {
          return actions.order.capture().then(function (orderData) {
            const transaction = orderData.purchase_units[0].payments.captures[0];
            this.isPaypalPaid = true;
            this.isPaypalShown = false;
          });
        }
      }).render('#paypal-container');
    },
  },
};
</script>

<style scoped>
.spinner {
  border: 5px solid #000;
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
