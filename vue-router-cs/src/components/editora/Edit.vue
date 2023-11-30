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
            v-model="currentEditora.cpnj"
            class="form-control"
            id="inputCnpj"
          />
        </div>
      </form>
      <button class="badge badge-success" @click="updateEditora">Salvar</button>
      <button class="badge badge-danger mr-2" @click="deleteEditora">
        Delete
      </button>
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
//  import LivroDataService from '../../services/LivroDataService'

export default {
  name: "editEditora",
  data() {
    return {
      currentEditora: null,
      message: ""
    };
  },
  methods: {
    getEditora(id) {
      EditoraDataService.get(id)
        .then(response => {
          console.log(response.data);
          this.currentEditora = response.data;
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
    deleteEditora() {
      EditoraDataService.delete(this.currentTutorial.nome)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "editoras-list" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    voltar() {
      this.$router.push({ name: "editoras-list" });
    }
  },
  mounted() {
    this.message = "";
    this.getEditora(this.$route.params.id);
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
