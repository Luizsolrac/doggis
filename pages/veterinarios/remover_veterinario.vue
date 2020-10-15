<template>
  <v-btn text color="error" @click="removerVeterinario">Remover</v-btn>
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
  methods: {
    removerVeterinario() {
      this.$store.commit("removerVeterinario", this.id);
      this.$emit("removido");
    }
  }
};
</script>

<style>
</style>