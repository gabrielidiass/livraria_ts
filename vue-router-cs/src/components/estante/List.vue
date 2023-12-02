<template>
  <div id="tab_aut">
    <div class="col-md-6">
      <h4>Listagem de Estante</h4>
      <table class="table table-striped">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Alterar</th>
          <th scope="col">Remover</th>
        </tr>
        <tbody>
          <tr
            v-for="(e, indice) in estante"
            :key="e.id"
            :class="{ active: indice == currentIndex }"
          >
            <td>{{ e.nome }}</td>
            <td>
              <button
                v-on:click="setCurrentEstante(e, indice)"
                class="btn"
                type="button"
              >
                Alterar
              </button>
            </td>
            <td>
              <button
                v-on:click="remEstante(e, indice)"
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
      <div v-if="currentEstante">
        <h4>Estantes</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentEstante.indice }}
        </div>
        <div>
          <label><strong>Nome</strong></label> {{ currentEstante.nome }}
        </div>
        <div></div>

        <a
          class="badge badge-warning"
          :href="'/estante/update/' + currentEstante.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a book...</p>
        <router-link to="/addestante" class="badge badge-success"
          >Novo</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import EstanteDataService from "../../services/EstanteDataService";

export default {
  name: "listestante",
  data() {
    return {
      estante: [],
      currentEstante: null,
      currentIndex: -1
    };
  },
  methods: {
    listarEstante() {
      EstanteDataService.list()
        .then(response => {
          console.log("Retorno do seviço authenticateestante", response.status);

          this.estante = response.data;
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço listestante");
          console.log(response);
        });
    },
    setCurrentEstante(estante, index) {
      this.currentEstante = estante;
      this.currentIndex = index;
    },
    remEstante(estante) {
      EstanteDataService.delete(estante.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.listarEstante();
      this.currentTutorial = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.listarEstante();
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
