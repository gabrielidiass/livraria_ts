<template>
  <div id="tab_aut">
    <div v-if="currentAutor" class="edit-form">
      <h3>Autor</h3>
      <form>
        <div class="form-group">
          <label for="inputNome">Nome:</label>
          <input
            type="text"
            v-model="currentAutor.nome"
            class="form-control"
            id="inputNome"
          />
        </div>
        <div class="form-group">
          <label for="inputNacionalidade">Nacionalidade:</label>
          <input
            type="text"
            v-model="currentAutor.nacionalidade"
            class="form-control"
            id="inputNacionalidade"
          />
        </div>
      </form>
      <button class="badge badge-success" @click="updateAutor">Salvar</button>
      <!-- <button class="badge badge-danger mr-2" @click="deleteAutor">
        Delete
      </button> -->
      <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

      <p>{{ message }}</p>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Autor...</p>
      <h1>não deu</h1>
    </div>
  </div>
</template>
<script>
import AutorDataService from "../../services/AutorDataService";

export default {
  name: "editAutores",
  data() {
    return {
      currentAutor: null,
      message: ""
    };
  },
  methods: {
    getAutor(nome) {
      AutorDataService.get(nome)
        .then(response => {
          console.log(response.data);
          this.currentAutor = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateAutor() {
      AutorDataService.update(this.currentAutor)
        .then(response => {
          console.log("AutorDataService.update");
          this.message = "Autor alterado com sucesso !";
        })
        .catch(e => {
          console.log(e);
        });
    },
    // deleteAutor() {
    //   AutorDataService.delete(this.currentAutor.nome)
    //     .then(response => {
    //       console.log(response.data);
    //       this.$router.push({ name: "autores-list" });
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    // voltar() {
    //   this.$router.push({ name: "autores-list" });
    // }
    voltar() {
      const targetRoute = { name: "autores-list" }; 
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
    this.getAutor(this.$route.params.nome);
    console.log(this.currentAutor);
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
