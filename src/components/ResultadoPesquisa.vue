<template>
  <div class="resultados-container">
    <!-- Cabeçalho com o logo e o botão para voltar à home -->
    <header class="header">
      <div class="logo">
        <img src="@/assets/lixeira.png" alt="Logo" class="logo__imagem">
        <span class="logo__texto">Descartei</span>
      </div>
      <div class="back-home">
        <router-link to="/" class="btn-voltar">
          <span>&larr;</span> Voltar para home
        </router-link>
      </div>
    </header>

    <!-- Conteúdo dos pontos de coleta -->
    <main class="resultados-conteudo">
      <h2>{{ pontos.length }} ponto(s) encontrado(s)</h2>
      <div v-if="carregando">Carregando...</div>
      <div v-if="erro" class="erro">{{ erro }}</div>
      <div v-else class="pontos-lista">
        <div v-for="ponto in pontos" :key="ponto._id" class="ponto-item">
          <h3 class="ponto-item__nome">{{ ponto.nome }}</h3>
          <p class="ponto-item__endereco">
            {{ ponto.endereco }}, {{ ponto.numero }}, {{ ponto.cidade }} - {{ ponto.estado }}
          </p>
          <p class="ponto-item__contato">Contato: {{ ponto.numeroContato }}</p>
          <p class="ponto-item__itens">
            Itens de Coleta: {{ ponto.itensColeta.join(', ') }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      pontos: [],
      carregando: true,
      erro: null,
    };
  },
  async created() {
    const { cidade, estado } = this.$route.query;

    try {
      const response = await axios.get(`http://localhost:5000/pontocoleta?cidade=${cidade}&estado=${estado}`);
      this.pontos = response.data;

      if (this.pontos.length === 0) {
        this.erro = "Nenhum ponto de coleta encontrado para a localização fornecida.";
      }
    } catch (err) {
      this.erro = "Erro ao carregar os pontos de coleta. Tente novamente mais tarde.";
      console.error(err);
    } finally {
      this.carregando = false;
    }
  },
};
</script>

<style scoped>
/* Estilos gerais */
.resultados-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo__imagem {
  height: 64px;
  width: 64px;
}

.logo__texto {
  font-size: 34px;
  font-weight: bold;
  color: #4e3d9a;
  margin-left: 10px;
}

.back-home .btn-voltar {
  color: #4e3d9a;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
}

.back-home .btn-voltar:hover {
  color: #2a9446;
}

/* Conteúdo principal */
.resultados-conteudo {
  text-align: center;
}

.resultados-conteudo h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.erro {
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
}

/* Lista de pontos */
.pontos-lista {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Item do ponto de coleta */
.ponto-item {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 280px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: left;
}

.ponto-item__nome {
  font-size: 20px;
  color: #4e3d9a;
  margin-bottom: 10px;
}

.ponto-item__endereco,
.ponto-item__contato,
.ponto-item__itens {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.ponto-item__itens {
  font-style: italic;
}
</style>
