<template>
  <v-app style="background-image: url('/images/doggis-background.jpg')">
    <v-content>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="primary" :fixed="true" app>
      <span>&copy; Doggis {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>
