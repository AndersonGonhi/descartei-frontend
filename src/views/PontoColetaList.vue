<!-- <template>
    <div>
      <h2>Listagem de Pontos de Coleta</h2>
      <form @submit.prevent="buscarPontos">
        <div>
          <label for="estado">Estado:</label>
          <input v-model="filtro.estado" id="estado" required />
        </div>
  
        <div>
          <label for="cidade">Cidade (opcional):</label>
          <input v-model="filtro.cidade" id="cidade" />
        </div>
  
        <button type="submit">Buscar</button>
      </form>
  
      <div v-if="pontos.length > 0">
        <h3>Resultados:</h3>
        <ul>
          <li v-for="ponto in pontos" :key="ponto._id">
            {{ ponto.nomeEntidade }} - {{ ponto.cidade }} ({{ ponto.estado }}) - Contato: {{ ponto.numeroContato }}
          </li>
        </ul>
      </div>
      <p v-else>Nenhum ponto de coleta encontrado</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        filtro: {
          estado: '',
          cidade: ''
        },
        pontos: []
      };
    },
    methods: {
      async buscarPontos() {
        try {
          const { estado, cidade } = this.filtro;
          const query = cidade ? `?estado=${estado}&cidade=${cidade}` : `?estado=${estado}`;
          const resposta = await axios.get(`http://localhost:5000/pontocoleta${query}`);
          this.pontos = resposta.data;
        } catch (error) {
          console.error('Erro ao buscar pontos', error);
          this.pontos = [];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
   -->