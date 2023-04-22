<template>
  <div class="page m-4">
  miao
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

export default {
  data() {
    return {
      ingresso: this.$evento.ingresso,
      drink: this.$evento.drink,
      birra: this.$evento.birra,
      tavolo: this.$evento.tavolo,

      ingressi: 1,

      soldOut: this.$evento.soldOut,
      prevenditeOnline: this.$evento.prevenditeOnline,
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
    script.src = "https://www.paypal.com/sdk/js?currency=EUR&client-id=AYt8UxPRZS1k32KYmPOV142g7_hmJbEFpNmooZ73Ts79E6PWT4dNM94czFJzE-EJWF2iV3Ue1yaIRkKP&disable-funding=card";
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
