<template>
  <section>
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="rgba(223,156,78, 0.7)">
          <v-card-title>Filtrar Veterinários</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  clearable
                  prepend-icon="mdi-dog"
                  color="black"
                  outlined
                  v-model="nomeVeterinario"
                  label="Nome do veterinário"
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
                  label="Tipo do pet para atendimento"
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
          <adicionar-veterinario @adicionado="obterVeterinarios"></adicionar-veterinario>
        </div>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-alert
          type="warning"
          color="primary"
          v-if="veterinarios.length === 0"
        >Nenhum veterinário encontrado.</v-alert>
      </v-col>
      <v-col cols="12" sm="12" md="4" v-for="vet in veterinarios" :key="vet.id">
        <card-detalhe
          :titulo="'Dr(a) ' + vet.nome"
          :imagem="vet.foto"
          :descricao="`Especialidade: ${vet.tiposAtendimento.join(', ')}`"
        >
          <v-spacer></v-spacer>
          <remover-veterinario :id="vet.id" @removido="obterVeterinarios" />
          <editar-veterinario :id="vet.id" @editado="obterVeterinarios" />
        </card-detalhe>
      </v-col>
    </v-row>

    <v-row></v-row>
  </section>
</template>

<script>
import AdicionarVeterinario from "./adicionar_veterinario";
import EditarVeterinario from "./editar_veterinario";
import RemoverVeterinario from "./remover_veterinario";

export default {
  middleware: "auth",
  components: {
    "adicionar-veterinario": AdicionarVeterinario,
    "editar-veterinario": EditarVeterinario,
    "remover-veterinario": RemoverVeterinario
  },
  data() {
    return {
      veterinarios: [],
      nomeVeterinario: "",
      tipoPet: ""
    };
  },
  computed: {
    tiposPet() {
      return this.$store.state.tiposPet;
    }
  },
  methods: {
    obterVeterinarios() {
      this.veterinarios = this.$store.state.veterinarios;
    },
    filtrar() {
      this.obterVeterinarios();

      if (this.nomeVeterinario)
        this.veterinarios = this.veterinarios.filter(x =>
          x.nome.toLowerCase().includes(this.nomeVeterinario.toLowerCase())
        );

      if (this.tipoPet)
        this.veterinarios = this.veterinarios.filter(x =>
          x.tiposAtendimento.includes(this.tipoPet)
        );
    }
  },
  created() {
    this.obterVeterinarios();
  }
};
</script>

<style>
</style>