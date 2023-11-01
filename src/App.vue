<template>
  <v-app>
    <v-app-bar class="bg-indigo-darken-4">
      <v-app-bar-title class="d-flex">VuderaSoft</v-app-bar-title>
      <v-btn prepend-icon="mdi-home" to="/">Inicio</v-btn>
      <v-btn prepend-icon="mdi-account" to="/cliente">Clientes</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>

</style>
