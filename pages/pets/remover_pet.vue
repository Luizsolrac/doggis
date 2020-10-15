<template>
  <v-btn text color="error" @click="removerPet">Remover</v-btn>
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
    removerPet() {
      this.$store.commit("removerPet", this.id);
      this.$emit("removido");
    }
  }
};
</script>

<style>
</style>