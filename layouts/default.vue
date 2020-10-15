<template>
  <v-app style="background-image: url('/images/doggis-background.jpg')">
    <v-navigation-drawer
      color="rgba(223,156,78, 0.7)"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="item.to"
          router
          exact
          @click="drawer = false"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.titulo" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="#DF9C4E" :clipped-left="clipped" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white" />
      <v-toolbar-title class="white--text">Doggis</v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="white--text">Bem vindo, {{usuario.nome}}</span>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>
    <v-footer color="#DF9C4E" :fixed="fixed" app>
      <span class="white--text">&copy; Doggis {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      menu: []
    };
  },
  created() {
    let usuarioLogado = this.$store.state.usuarioLogado;
    let perfilUsuario = usuarioLogado.perfil;

    this.menu = this.$store.state.menu.filter(x =>
      x.perfisPermitidos.includes(perfilUsuario)
    );
  },
  computed: {
    usuario() {
      return this.$store.state.usuarioLogado;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
