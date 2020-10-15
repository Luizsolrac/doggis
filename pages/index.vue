<template>
  <v-row>
    <v-col cols="12" sm="12" md="4" v-for="(card, index) in cards" :key="index">
      <v-card class="mx-auto">
        <v-img class height="200px" :src="card.imagem"></v-img>
        <v-card-title>
          <nuxt-link :to="card.to">{{card.titulo}}</nuxt-link>
        </v-card-title>
        <v-card-text>{{card.descricao}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      cards: []
    };
  },
  created() {
    let usuarioLogado = this.$store.state.usuarioLogado;
    let perfilUsuario = usuarioLogado.perfil;

    this.cards = this.$store.state.cards.filter(x =>
      x.perfisPermitidos.includes(perfilUsuario)
    );
  }
};
</script>
