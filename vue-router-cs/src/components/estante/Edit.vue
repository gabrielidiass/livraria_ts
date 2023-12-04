<template>
  <div id="tab_aut">
    <div v-if="currentEstante" class="edit-form">
      <h3>Estante</h3>
      <form>
        <div class="form-group">
          <label for="inputNome">Nome:</label>
          <input
            type="text"
            v-model="currentEstante.nome"
            class="form-control"
            id="inputNome"
          />
        </div>
        <div class="form-group">
          <label for="selectAutor">Livros:</label>
          <select
            v-model="currentEstante.livros"
            class="form-control"
            id="selectAutor"
            multiple
          >
            <option v-for="l in livros" :key="l.codigo" v-bind:value="l">
              {{ l.nome }}
            </option>
          </select>
        </div>
      </form>
      <button class="badge badge-success" @click="updateEstante">Salvar</button>
      <!-- <button class="badge badge-danger mr-2" @click="deleteEstante">
        Delete
      </button> -->
      <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Estante...</p>
    </div>
  </div>
</template>
<script>
import EstanteDataService from "../../services/EstanteDataService";
import LivroDataService from "../../services/LivroDataService";

export default {
  name: "editEstantes",
  data() {
    return {
      currentEstante: null,
      message: "",
      livros: []
    };
  },
  methods: {
    getEstante(id) {
      EstanteDataService.get(id)
        .then(response => {
          this.currentEstante = response.data;
          console.log(this.currentEstante);
        })
        .catch(e => {
          console.log(e);
        });
    },
    listlivros() {
      LivroDataService.list()
        .then(response => {
          console.log(
            "Retorno do seviço LivroDataService.list",
            response.status
          );
         
          this.livros = response.data;
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço LivroDataService.list");
          console.log(response);
        });

        console.log(this.livros);
        console.log("chegou");
    },
    updateEstante() {
      EstanteDataService.update(this.currentEstante)
        .then(response => {
          console.log("EstanteDataService.update");
          this.message = "Estante alterado com sucesso !";
        })
        .catch(e => {
          console.log(e);
        });
    },
    // deleteEstante() {
    //   EstanteDataService.delete(this.currentTutorial.nome)
    //     .then(response => {
    //       console.log(response.data);
    //       this.$router.push({ name: "estantes-list" });
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    // voltar() {
    //   this.$router.push({ name: "estantes-list" });
    // }
    voltar() {
      const targetRoute = { name: "estantes-list" }; // Supondo que a rota seja "estantes-list"
      if (
        this.$route.name !== targetRoute.name ||
        JSON.stringify(this.$route.params) !== JSON.stringify(targetRoute.params)
      ) {
        this.$router.push(targetRoute);
      }
    }
  },
  mounted() {
    this.message = "";
    this.getEstante(this.$route.params.id);
    this.listlivros()
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
