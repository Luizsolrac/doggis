<template>
  <section>
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="rgba(223,156,78, 0.7)">
          <v-card-title>Filtrar Pets</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  clearable
                  prepend-icon="mdi-dog"
                  color="black"
                  outlined
                  v-model="nomePet"
                  label="Nome do pet"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select
                  clearable
                  color="black"
                  prepend-icon="mdi-cat"
                  outlined
                  v-model="tipoPet"
                  :items="tiposPet"
                  label="Tipo de pet"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" dark @click="filtrar">Pesquisar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12" sm="12">
        <div class="float-right">
          <adicionar-pet @adicionado="obterPets"></adicionar-pet>
        </div>
      </v-col>

      <v-col cols="12" md="12" sm="12">
        <v-alert type="warning" color="primary" v-if="pets.length === 0">Nenhum pet encontrado.</v-alert>
      </v-col>
      <v-col cols="12" sm="12" md="4" v-for="pet in pets" :key="pet.id">
        <card-detalhe
          :imagem="pet.foto"
          :titulo="pet.nome + ' - ' + pet.dono"
          :subtitulo="pet.tipo + ' - ' + pet.raca + ' - ' + pet.porte"
          :descricao="pet.descricao"
        >
          <v-spacer></v-spacer>
          <remover-pet :id="pet.id" @removido="obterPets" />
          <editar-pet :id="pet.id" @editado="obterPets" />
        </card-detalhe>
      </v-col>
    </v-row>

    <v-row></v-row>
  </section>
</template>

<script>
import AdicionarPet from "./adicionar_pet";
import EditarPet from "./editar_pet";
import RemoverPet from "./remover_pet";

export default {
  middleware: "auth",
  components: {
    "adicionar-pet": AdicionarPet,
    "editar-pet": EditarPet,
    "remover-pet": RemoverPet
  },
  data() {
    return {
      nomePet: "",
      tipoPet: "",
      pets: []
    };
  },
  computed: {
    tiposPet() {
      return this.$store.state.tiposPet;
    }
  },
  created() {
    this.obterPets();
  },
  methods: {
    filtrar() {
      this.obterPets();

      if (this.nomePet)
        this.pets = this.pets.filter(x => x.nome === this.nomePet);
      if (this.tipoPet)
        this.pets = this.pets.filter(x => x.tipo === this.tipoPet);
    },
    obterPets() {
      this.pets = this.$store.state.pets;
    }
  }
};
</script>

<style>
</style>