<template>
  <div class="page m-4">
    <ACard
      :text="'Free drink ' + [this.$evento.drink] + '€, Birra illimitata ' + [this.$evento.birra] + '€'"
      img="../../public/prevendita.jpg"
      variant="fill"
      color="var(--card)"
    >

      <template #title>
        <div class="flex justify-between items-center">
          <span>{{ this.$evento.nome }}</span>
          <a
            target="_blank"
            href=""
            class="!text-light-emphasis underline text-sm"
          >Link</a>
        </div>
      </template>
      <template #subtitle>
        <div class="flex justify-between items-center">
          <span>{{ this.$evento.data }}, {{ this.$evento.luogo }}</span>
        </div>
      </template>

      <div class="a-card-body">

        <!--
        <div class="grid-row grid-cols-2 justify-items-stretch mb-4">
          <ARadio
            v-model="opzione"
            value="drink"
            label="Drink"
            @click="prezzo=this.$evento.drink"
          />
          <ARadio
            v-model="opzione"
            value="birra"
            label="Birra"
            @click="prezzo=this.$evento.birra"
          />
        </div>
        -->

        <div v-if="birraDrink" class="grid-row grid-cols-2 justify-items-stretch mb-4">
          <ABtn
            v-model="opzione"
            value="drink"
            :variant="opzione === 'drink' ? 'fill' : 'light'"
            @click="prezzo=this.$evento.drink; opzione='drink'"
            class="w-full"
          >
            Drink
          </ABtn>
          <ABtn
            v-model="opzione"
            value="birra"
            :variant="opzione === 'birra' ? 'fill' : 'light'"
            @click="prezzo=this.$evento.birra; opzione='birra'"
            class="w-full"
          >
            Birra
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
            <div class="items-center bg-success bg-opacity-40 p-2 w-full rounded-lg">
              Totale 
              <span>
                {{ totale = ((ingressi * prezzo) +  (ingressi * prezzo) / 100 * 4).toFixed(2) }}€
              </span>
            </div>
            <ABtn
              variant="light"
              icon="i-bx-heart"
              class="w-full"
              @click="isPaypalShown = true"
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
          title="Completa l'acquisto con Paypal"
          persistent
        >
          <div class="a-card-body">
            <div id="paypal-container" class="mb-4" />
            <ABtn
              variant="light"
              class="text-sm"
              @click="isPaypalShown = false"
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
      birraDrink: true,
      opzione: 'drink',
      ingressi: 1,
      prezzo: this.$evento.drink,
      totale: this.prezzo + this.prezzo / 100 * 4,
      isPaypalShown: false,
      options: [this.$evento.drink, this.$evento.birra],
    }
  },
}
</script>
