<template>
  <v-row justify="center" align="center">
    <v-card class="ml-7" width="450">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Efetuar login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="email"
            :rules="regrasEmail"
            prepend-icon="mdi-account-circle"
            label="Email"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="senha"
            :rules="regrasSenha"
            prepend-icon="mdi-lock"
            label="Senha"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Entrar</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar color="info" v-model="snackbar">
      Usuário não encontrado.
      <v-btn color="black" text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  middleware: "notauth",
  layout: "login",
  data() {
    return {
      snackbar: false,
      email: "",
      senha: "",
      regrasEmail: [
        v => !!v || "E-mail obrigatório",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ],
      regrasSenha: [v => !!v || "Senha obrigatória"]
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let user = this.$store.state.usuarios.find(
          x => x.email === this.email && x.senha === this.senha
        );

        if (user) {
          this.$store.commit("login", user);
          this.$router.push({ name: "index" });
        } else {
          this.snackbar = true;
        }
      }
    }
  }
};
</script>

<style>
</style>