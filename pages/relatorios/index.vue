<template>
  <section>
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="rgba(223,156,78, 0.7)">
          <v-card-title>Filtrar Relatórios de Satisfação</v-card-title>
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
                <v-text-field
                  clearable
                  prepend-icon="mdi-cat"
                  color="black"
                  outlined
                  v-model="nomePet"
                  label="Nome do pet"
                ></v-text-field>
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

    <!-- conteudo da página !-->
    <v-row>
      <v-col cols="6" sm="6" md="6" lg="6" v-for="(report,index) in reports" :key="index">
        <v-card class="mx-auto">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-img height="250px" :src="report.veterinario.foto"></v-img>
                <v-card-title>{{report.veterinario.nome}}</v-card-title>
              </v-col>
              <v-col cols="6">
                <v-img height="250px" :src="report.pet.foto"></v-img>
                <v-card-title>{{report.pet.nome}}</v-card-title>
              </v-col>
              <v-col cols="6">
                <div>Data do atendimento: {{report.data}}</div>
              </v-col>
              <v-col cols="6">
                <div>Tipo do atendimento: {{report.tipoAtendimento}}</div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            Nota do atendimento:
            <v-spacer />
            <span class="black--text text--lighten-2 caption mr-2">({{ report.nota }})</span>
            <v-rating
              readonly
              v-model="report.nota"
              background-color="indigo lighten-3"
              color="indigo"
              size="30"
            ></v-rating>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      reports: [],
      nomeVeterinario: "",
      nomePet: ""
    };
  },
  methods: {
    obterRelatorios() {
      this.reports = this.$store.state.reports;
    },
    filtrar() {
      this.obterRelatorios();

      if (this.nomeVeterinario)
        this.reports = this.reports.filter(x =>
          x.veterinario.nome
            .toLowerCase()
            .includes(this.nomeVeterinario.toLowerCase())
        );

      if (this.nomePet)
        this.reports = this.reports.filter(x =>
          x.pet.nome.toLowerCase().includes(this.nomePet.toLowerCase())
        );
    }
  },
  created() {
    this.obterRelatorios();
  }
};
</script>

<style>
</style>