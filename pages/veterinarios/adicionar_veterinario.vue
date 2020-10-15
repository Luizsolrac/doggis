<template>
  <section>
    <v-btn color="black" dark @click="dialog = true">Cadastrar veterinário</v-btn>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title>Cadastrar veterinário</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="veterinarioAddForm">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="nomeVeterinario"
                  :rules="requerido"
                  label="Nome do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  type="tel"
                  v-mask="['###.###.###-##']"
                  v-model="cpf"
                  :rules="requerido"
                  label="CPF do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="rg"
                  type="tel"
                  v-mask="['#.###.###']"
                  :rules="requerido"
                  label="RG do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="registro" :rules="requerido" label="Número de registro"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-model="tiposAtendimento"
                  multiple
                  :items="tiposPet"
                  :rules="requeridoTipos"
                  label="Tipos de pet para atendimento"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-file-input ref="files" @change="carregarFoto" accept="image/*" label="Foto"></v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="foto !== ''">
                <v-img :src="foto" max-width="500"></v-img>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" dark @click="dialog = false">Cancelar</v-btn>
            <v-btn color="black" dark @click="adicionarVeterinario">Cadastrar</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      dialog: false,
      nomeVeterinario: "",
      cpf: "",
      rg: "",
      registro: "",
      tiposAtendimento: [],
      requerido: [v => !!v || "Campo obrigatório."],
      requeridoTipos: [
        v =>
          v.length > 0 ||
          "Selecionar pelo menos um tipo de pet para atendimento."
      ],
      foto: ""
    };
  },
  computed: {
    tiposPet() {
      return this.$store.state.tiposPet;
    }
  },
  methods: {
    adicionarVeterinario() {
      if (this.$refs.veterinarioAddForm.validate()) {
        this.$store.commit("adicionarVeterinario", {
          nome: this.nomeVeterinario,
          cpf: this.cpf,
          rg: this.rg,
          registro: this.registro,
          tiposAtendimento: this.tiposAtendimento,
          foto: this.foto
        });

        this.$emit("adicionado");

        this.dialog = false;
        this.$refs.veterinarioAddForm.reset();
      }
    },
    carregarFoto(event) {
      if (event) {
        let file = event;
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = event => {
          this.foto = reader.result;
        };
      } else {
        this.foto = "";
      }
    }
  }
};
</script>

<style>
</style>