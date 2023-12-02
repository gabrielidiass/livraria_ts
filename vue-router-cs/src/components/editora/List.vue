<template>
  <div id="tab_aut">
    <div class="col-md-6">
      <h4>Listagem de Editoras</h4>
      <table class="table table-striped">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Cnpj</th>
          <th scope="col">Alterar</th>
          <th scope="col">Remover</th>
        </tr>
        <tbody>
          <tr
            v-for="(e, indice) in editora"
            :key="e.id"
            :class="{ active: indice == currentIndex }"
          >
            <td>{{ e.nome }}</td>
            <td>{{ e.cnpj }}</td>
            <td>
              <button
                v-on:click="setCurrentEditora(e, indice)"
                class="btn"
                type="button"
              >
                Alterar
              </button>
            </td>
            <td>
              <button
                v-on:click="remeditora(e, indice)"
                class="btn"
                type="button"
              >
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-md-6">
      <div v-if="currentEditora">
        <h4>Editoras</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentEditora.id }}
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentEditora.nome }}
        </div>
        <div>
          <label><strong>CNPJ</strong></label> {{ currentEditora.cnpj }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/editora/update/' + currentEditora.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a editora...</p>
        <router-link to="/addeditora" class="badge badge-success"
          >Novo</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import EditoraDataService from "../../services/EditoraDataService";

export default {
  name: "listeditora",
  data() {
    return {
      editora: [],
      currentEditora: null,
      currentIndex: 0
    };
  },
  methods: {
    listareditora() {
      EditoraDataService.list()
        .then(response => {
          console.log("Retorno do seviço authenticateeditora", response.status);

          this.editora = response.data;
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço listeditora");
          console.log(response);
        });
    },
    setCurrentEditora(editora, index) {
      this.currentEditora = editora;
      this.currentIndex = index;
    },
    remeditora(editora) {
      EditoraDataService.delete(editora.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.listareditora();
      this.currentTutorial = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.listareditora();
  }
};
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
