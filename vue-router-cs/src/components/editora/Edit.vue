<template>
  <div id="tab_aut">
    <div v-if="currentEditora" class="edit-form">
      <h3>Editora</h3>
      <form>
        <div class="form-group">
          <label for="inputNome">Nome:</label>
          <input
            type="text"
            v-model="currentEditora.nome"
            class="form-control"
            id="inputNome"
          />
        </div>
        <div class="form-group">
          <label for="inputCnpj">CNPJ:</label>
          <input
            type="text"
            v-model="currentEditora.cnpj"
            class="form-control"
            id="inputCnpj"
          />
        </div>
        <div class="form-group">
        <label for="selectLivro">Livros:</label>
        <select
          v-model="currentEditora.livros"
          class="form-control"
          id="selectLivro"
          multiple
        >
          <option v-for="l in livros" :key="l.codigo" v-bind:value="l">
            {{ l.nome }}
          </option>
        </select>
      </div>
      
      </form>
      <button class="badge badge-success" @click="updateEditora">Salvar</button>
      <!-- <button class="badge badge-danger mr-2" @click="deleteEditora">
        Delete
      </button> -->
      <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Editora...</p>
    </div>
  </div>
</template>
<script>
import EditoraDataService from "../../services/EditoraDataService";
import LivroDataService from '../../services/LivroDataService'

export default {
  name: "editEditora",
  data() {
    return {
      currentEditora: null,
      message: "",
      livros: []
    };
  },
  methods: {
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
    getEditora(id) {
      EditoraDataService.get(id)
        .then(response => {
          this.currentEditora = response.data;
          console.log(this.currentEditora);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateEditora() {
      EditoraDataService.update(this.currentEditora)
        .then(response => {
          console.log("EditoraDataService.update");

          this.message = "Editora alterado com sucesso !";
        })
        .catch(e => {
          console.log(e);
        });
    },
  
    voltar() {
      const targetRoute = { name: "editoras-list" }; // Supondo que a rota seja "editoras-list"
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
    this.getEditora(this.$route.params.id);
    this.listlivros();
    
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
