<template>
  <v-card>
    <v-img :src="imagem" v-if="imagem" max-height="200" aspect-ratio="1"></v-img>
    <v-card-title>{{titulo}}</v-card-title>
    <v-card-subtitle v-if="subtitulo">{{subtitulo}}</v-card-subtitle>
    <v-card-text>{{descricao}}</v-card-text>
    <v-card-actions>
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: false
    },
    imagem: {
      type: String,
      required: false
    },
    descricao: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>