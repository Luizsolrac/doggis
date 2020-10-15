<template>
  <section>
    <v-btn text @click="dialog = true" color="black">Editar</v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title>Editar Pet {{pet.nome}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="editarPetForm">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="pet.nome" :rules="requirido" label="Nome do pet"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="pet.raca" :rules="requirido" label="Raça do pet"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select
                  v-model="pet.porte"
                  :items="portes"
                  :rules="requirido"
                  label="Porte do pet"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select v-model="pet.tipo" :items="tipos" :rules="requirido" label="Tipo do pet"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="pet.dono" :items="donos" :rules="requirido" label="Dono do pet"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  v-model="pet.descricao"
                  :rules="requirido"
                  rows="2"
                  label="Decreva os hábitos, alergias e gostos do pet."
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-checkbox v-model="pet.permiteFoto" label="Permite o uso de fotos do pet"></v-checkbox>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-file-input ref="files" @change="carregarFoto" accept="image/*" label="Foto"></v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="12" v-if="pet.foto !== ''">
                <v-img :src="pet.foto" max-width="500"></v-img>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="black" dark @click="editarPet">Editar</v-btn>
        </v-card-actions>
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
      pet: null,
      portes: ["Pequeno", "Médio", "Grande"],
      requirido: [v => !!v || "Campo obrigatório"]
    };
  },
  created() {
    let pet = this.$store.state.pets.find(x => x.id === this.id);
    if (!pet) throw new Error("Pet ID inválido.");

    this.pet = Object.assign({}, pet);
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
    editarPet() {
      if (this.$refs.editarPetForm.validate()) {
        this.$store.commit("editarPet", Object.assign({}, this.pet));
        this.dialog = false;

        this.$emit("editado");
      }
    },
    carregarFoto(event) {
      if (event) {
        let file = event;
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = event => {
          this.pet.foto = reader.result;
        };
      } else {
        this.pet.foto = "";
      }
    }
  }
};
</script>

<style>
</style>