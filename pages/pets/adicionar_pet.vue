<template>
  <section>
    <v-btn color="black" dark @click="dialog = true">Cadastrar novo pet</v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title>Cadastrar Pet</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="petForm">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="nome" :rules="requirido" label="Nome do pet"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="raca" :rules="requirido" label="Raça do pet"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select v-model="porte" :items="portes" :rules="requirido" label="Porte do pet"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select v-model="tipo" :items="tipos" :rules="requirido" label="Tipo do pet"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="dono" :items="donos" :rules="requirido" label="Dono do pet"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="descricao"
                  :rules="requirido"
                  rows="2"
                  label="Decreva os hábitos, alergias e gostos do pet."
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox v-model="permiteFoto" label="Permite o uso de fotos do pet"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-file-input ref="files" @change="carregarFoto" accept="image/*" label="Foto"></v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="foto !== ''">
                <v-img :src="foto" max-width="500"></v-img>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="black" dark @click="cadastrarPet">Cadastrar</v-btn>
        </v-card-actions>
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
      nome: "",
      portes: ["Pequeno", "Médio", "Grande"],
      porte: "",
      raca: "",
      descricao: "",
      dono: "",
      permiteFoto: false,
      tipo: "",
      requirido: [v => !!v || "Campo obrigatório"],
      foto: ""
    };
  },
  computed: {
    tipos() {
      return this.$store.state.tiposPet;
    },
    donos() {
      return this.$store.state.clientes;
    }
  },
  methods: {
    cadastrarPet() {
      if (this.$refs.petForm.validate()) {
        let pet = {
          nome: this.nome,
          porte: this.porte,
          raca: this.raca,
          tipo: this.tipo,
          dono: this.dono,
          descricao: this.descricao,
          permiteFoto: this.permiteFoto,
          foto: this.foto
        };

        this.$store.commit("adicionarPet", pet);
        this.$refs.petForm.reset();

        this.dialog = false;

        this.$emit("adicionado");
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