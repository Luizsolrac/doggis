<template>
  <section>
    <v-btn color="black" text @click="dialog = true">Editar</v-btn>
    <v-dialog v-model="dialog" width="500px">
      <v-card>
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title>Editar veterinário {{veterinario.nome}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="veterinarioEditarForm">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="veterinario.nome"
                  :rules="requerido"
                  label="Nome do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  type="tel"
                  v-mask="['###.###.###-##']"
                  v-model="veterinario.cpf"
                  :rules="requerido"
                  label="CPF do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="veterinario.rg"
                  type="tel"
                  v-mask="['#.###.###']"
                  :rules="requerido"
                  label="RG do veterinário"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  v-model="veterinario.registro"
                  :rules="requerido"
                  label="Número de registro"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  v-model="veterinario.tiposAtendimento"
                  multiple
                  :items="tiposPet"
                  :rules="requeridoTipos"
                  label="Tipos de pet para atendimento"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-file-input @change="carregarFoto" accept="image/*" label="Foto"></v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="veterinario.foto !== ''">
                <v-img :src="veterinario.foto" max-width="500"></v-img>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" dark @click="dialog = false">Cancelar</v-btn>
            <v-btn color="black" dark @click="editarVeterinario">Editar</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  middleware: "auth",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      requerido: [v => !!v || "Campo obrigatório."],
      requeridoTipos: [
        v =>
          v.length > 0 ||
          "Selecionar pelo menos um tipo de pet para atendimento."
      ],
      veterinario: null
    };
  },
  computed: {
    tiposPet() {
      return this.$store.state.tiposPet;
    }
  },
  methods: {
    editarVeterinario() {
      if (this.$refs.veterinarioEditarForm.validate()) {
        this.$store.commit(
          "editarVeterinario",
          Object.assign({}, this.veterinario)
        );

        this.$emit("editado");

        this.dialog = false;
      }
    },
    carregarFoto(event) {
      if (event) {
        let file = event;
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = event => {
          this.veterinario.foto = reader.result;
        };
      } else {
        this.veterinario.foto = "";
      }
    }
  },
  created() {
    let veterinarioParaEditar = this.$store.state.veterinarios.find(
      x => x.id === this.id
    );
    if (!veterinarioParaEditar) throw new Error("Id do veterinário inválido.");

    this.veterinario = Object.assign({}, veterinarioParaEditar);
  }
};
</script>

<style>
</style>