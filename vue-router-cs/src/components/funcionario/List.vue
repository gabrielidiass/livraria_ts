<template>
  <div id="tab_aut">
    <div class="col-md-6">
      <h4>Listagem de Funcionarios</h4>
      <table class="table table-striped">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">CPF</th>
          <th scope="col">CTPS</th>
          <th scope="col">Senha</th>
          <th scope="col">Salário</th>
          <th scope="col">Alterar</th>
          <th scope="col">Remover</th>
        </tr>
        <tbody>
          <tr
            v-for="(f, indice) in funcionarios"
            :key="f.cpf"
            :class="{ active: indice == currentIndex }"
          >
          <td>{{ f.id }}</td>

            <td>{{ f.nome }}</td>
            <td>{{ f.cpf }}</td>
            <td>{{ f.ctps }}</td>
            <td>{{ f.senha }}</td>
            <td>{{ f.salario }}</td>
            <td>
              <button
                v-on:click="setCurrentFuncionario(f, indice)"
                class="btn"
                type="button"
              >
                Alterar
              </button>
            </td>
            <td>
              <button
                v-on:click="remfuncionario(f, indice)"
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
      <div v-if="currentFuncionario">
        <h4>Funcionario</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentFuncionario.id }}
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentFuncionario.nome }}
        </div>
        <div>
          <label><strong>CPF:</strong></label> {{ currentFuncionario.cpf }}
        </div>
        <div>
          <label><strong>CTPS:</strong></label> {{ currentFuncionario.ctps }}
        </div>
        <div>
          <label><strong>Senha:</strong></label> {{ currentFuncionario.senha }}
        </div>
        <div>
          <label><strong>Salário:</strong></label> {{ currentFuncionario.salario }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/funcionario/update/' + currentFuncionario.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Func...</p>
        <router-link to="/addfuncionario" class="badge badge-success"
          >Novo</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import FuncionarioDataService from "../../services/FuncionarioDataService";

export default {
  name: "listfuncionarios",
  data() {
    return {
      funcionarios: [],
      currentFuncionario: null,
      currentIndex: 0
    };
  },
  methods: {
    listarfuncionarios() {
      FuncionarioDataService.list()
        .then(response => {
          console.log(
            "Retorno do seviço authenticatefuncionario",
            response.status
          );

          this.funcionarios = response.data;
        })
        .catch(response => {
          // error callback
          alert("Não conectou no serviço listfuncionario");
          console.log(response);
        });
    },
    setCurrentFuncionario(funcionario, index) {
      this.currentFuncionario = funcionario;
      this.currentIndex = index;
    },
    remfuncionario(funcionario) {
      FuncionarioDataService.delete(funcionario.id)
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.listarfuncionarios();
      this.currentTutorial = null;
      this.currentIndex = -1;
    }
  },
  mounted() {
    this.listarfuncionarios();
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
