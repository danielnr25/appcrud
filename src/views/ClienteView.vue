<template>
  <v-container fluid>
    <h1 class="text-center">Clientes</h1>
    <v-row class="justify-center">
      <v-col sm="12" md="8" lg="6" xl="4" xxl="3">
        <v-text-field
          label="Nombre"
          maxLength="50"
          counter
          color="indigo"
          clearable
          placeholder="Nombre del cliente"
          v-model="cliente.nombre"
        >
        </v-text-field>
        <v-text-field
          label="Teléfono"
          maxLength="9"
          counter
          color="indigo"
          clearable
          placeholder="Teléfono del cliente"
          v-model="cliente.telefono"
        >
        </v-text-field>
        <v-select
          color="indigo"
          label="País"
          :items="paises"
          item-value="id"
          item-title="nombre"
          v-model="cliente.fk_pais"
        >
        </v-select>
        <v-btn
          prepend-icon="mdi-account-plus"
          color="indigo"
          block
          @click="agregarCliente"
          >Agregar</v-btn
        >
      </v-col>

      <v-col xs="12" sm="11" md="10" lg="9" xl="8" xxl="7">
        <v-card>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Teléfono</th>
                  <th class="text-center">País</th>
                  <th class="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cliente, i) in clientes" :key="i">
                  <td class="text-center">{{ cliente.id }}</td>
                  <td class="text-center">{{ cliente.nombre }}</td>
                  <td class="text-center">{{ cliente.telefono }}</td>
                  <td class="text-center">{{ cliente.fk_pais }}</td>
                  <td class="text-center">
                    <v-btn-group>
                      <v-btn
                        icon="mdi-eye"
                        color="indigo"
                        @click="obtenerCliente(cliente.id, 1)"
                      ></v-btn>
                      <v-btn
                        icon="mdi-pencil"
                        color="green"
                        @click="obtenerCliente(cliente.id, 2)"
                      ></v-btn>
                      <v-btn icon="mdi-delete" color="red" @click="eliminarCliente(cliente.id)"></v-btn>
                    </v-btn-group>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">
      {{ mensaje }}
    </v-snackbar>

    <!-- cuadro de dialogo para ver registro -->
    <v-dialog
      v-model="dialogOne"
      transition="dialog-top-transition"
      width="500"
    >
      <v-card title="Ver" subtitle="Datos del cliente">
        <v-card-text>
          <v-list-item prepend-icon="mdi-account" :title="datos.nombre">
          </v-list-item>
          <v-list-item prepend-icon="mdi-phone" :title="datos.telefono">
          </v-list-item>
          <v-list-item prepend-icon="mdi-earth" :title="datos.fk_pais">
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- MODAL para editar -->
    <v-dialog
      v-model="dialogTwo"
      transition="dialog-top-transition"
      width="500"
    >
      <v-card title="Editar" subtitle="Datos del cliente">
        <v-card-text>
          <v-text-field
            label="Nombre"
            maxLength="50"
            counter
            color="indigo"
            clearable
            placeholder="Nombre del cliente"
            v-model="datos.nombre"
          ></v-text-field>
          <v-text-field
            label="Teléfono"
            maxLength="9"
            counter
            color="indigo"
            clearable
            placeholder="Número de teléfono del cliente"
            v-model="datos.telefono"
          ></v-text-field>
          <v-select
            color="indigo"
            label="País"
            :items="paises"
            item-value="id"
            item-title="nombre"
            v-model="datos.fk_pais"
          ></v-select>
          <v-btn
            prepend-icon="mdi-check"
            color="indigo"
            block
            @click="modificarCliente(datos.id)"
          >
            Actualizar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ClienteView",
  data() {
    return {
      paises: [],
      cliente: {},
      alertaEstado: false,
      mensaje: "",
      clientes: [],
      datos: {},
      dialogOne: false,
      dialogTwo: false,
    };
  },
  methods: {
    obtenerPaises() {
      axios
        .get("http://127.0.0.1:8000/api/paises")
        .then((response) => {
          if (response.data.code == 200) {
            let res = response.data;
            this.paises = res.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
    },

    agregarCliente() {
      axios
        .post("http://127.0.0.1:8000/api/cliente/store", this.cliente)
        .then((response) => {
          if (response.data.code == 200) {
            this.alertaEstado = true;
            this.mensaje = response.data.message;
            this.obtenerClientes();
            this.cliente = {};
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
    },

    obtenerClientes() {
      axios
        .get("http://127.0.0.1:8000/api/clientes")
        .then((response) => {
          if (response.data.code == 200) {
            let res = response.data;
            this.clientes = res.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
    },

    obtenerCliente(id, opcion) {
      if (opcion == 1) {
        this.dialogOne = true;
        axios
        .get("http://127.0.0.1:8000/api/cliente/find/" + id)
        .then((response) => {
          if (response.data.code == 200) {
            let res = response.data;
            this.datos = res.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
      } else {
        this.dialogTwo = true;
        axios
        .get("http://127.0.0.1:8000/api/cliente/find2/" + id)
        .then((response) => {
          if (response.data.code == 200) {
            let res = response.data;
            this.datos = res.data;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
      }

     
    },

    modificarCliente(id) {
      axios
        .put("http://127.0.0.1:8000/api/cliente/update/" + id, this.datos)
        .then((response) => {
          if (response.data.code == 200) {
            // actualizar tabla
            this.obtenerClientes();
            // cerrar modal
            this.dialogTwo = false;
            // cambiar mensaje y estado de alerta
            this.alertaEstado = true;
            this.mensaje = response.data.message;
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });
    },

    eliminarCliente(id) {
      axios
        .delete("http://127.0.0.1:8000/api/cliente/delete/" + id)
        .then((response) => {
          if (response.data.code == 200) {
            // cambiar mensaje y estado de alerta
            this.alertaEstado = true;
            this.mensaje = response.data.message;
            
            // actualizar tabla
            this.obtenerClientes();
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Ha ocurrido un error" + error);
        });

    }
  },

  created() {
    this.obtenerPaises();
    this.obtenerClientes();
  },
};
</script>
