<template>
  <div class="resultados-container">
    <!-- Cabeçalho com o logo e o botão para voltar à home -->
    <header class="header">
      <div class="logo">
        <img style="height: 64px; width: 64px;" src="@/assets/lixeira.png" alt="Logo">
        <span class="logo-text">Descartei</span>
      </div>
      <div class="back-home">
        <router-link to="/" class="btn-voltar">
          <span>&larr;</span> Voltar para home
        </router-link>
      </div>
    </header>

    <!-- Conteúdo dos pontos de coleta -->
    <main class="resultados-content">
      <h2>{{ pontos.length }} ponto(s) encontrado(s)</h2>
      <div v-if="carregando">Carregando...</div>
      <div v-if="erro" class="erro">{{ erro }}</div>
      <div v-else class="pontos-lista">
        <div v-for="ponto in pontos" :key="ponto.id" class="ponto-item">
          <img :src="ponto.imagem" alt="Imagem do ponto de coleta" class="ponto-img" />
          <h3 class="ponto-nome">{{ ponto.nome }}</h3>
          <p class="ponto-tipo">{{ ponto.tipo }}</p>
          <p class="ponto-endereco">{{ ponto.endereco }}</p>
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
      carregando: true,  // Estado de carregamento
      erro: null         // Estado para erros
    };
  },
  async created() {
    const { cidade, estado } = this.$route.query;

    try {
      // Fazendo requisição à API com os parâmetros de cidade e estado
      const response = await axios.get(`http://localhost:5000/pontocoleta?cidade=${cidade}&estado=${estado}`);
      
      // Atualizando os dados dos pontos de coleta com a resposta da API
      this.pontos = response.data;

      // Verifica se nenhum ponto foi encontrado
      if (this.pontos.length === 0) {
        this.erro = "Nenhum ponto de coleta encontrado para a localização fornecida.";
      }

    } catch (err) {
      // Tratamento de erros
      this.erro = "Erro ao carregar os pontos de coleta. Tente novamente mais tarde.";
      console.error(err);
    } finally {
      // Quando a requisição for concluída, removemos o estado de carregamento
      this.carregando = false;
    }
  }
};
</script>

<style scoped>
.resultados-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

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

.logo-text {
  font-size: 34px;
  font-weight: bold;
  color: #4e3d9a;
  margin-left: 10px;
}

.back-home {
  font-size: 16px;
}

.btn-voltar {
  color: #4e3d9a;
  height: 25px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.btn-voltar:hover {
  color: #2a9446;
}

.resultados-content {
  text-align: center;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.erro {
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
}

.pontos-lista {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.ponto-item {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.ponto-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

.ponto-nome {
  font-size: 20px;
  color: #4e3d9a;
  margin-bottom: 10px;
}

.ponto-tipo {
  font-size: 16px;
  color: #3bbf60;
  margin-bottom: 10px;
}

.ponto-endereco {
  font-size: 14px;
  color: #555;
}
</style>
