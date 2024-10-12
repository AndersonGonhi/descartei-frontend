<template>
  <div class="container">
    <!-- Cabeçalho com o logo e nome do projeto -->
    <header class="header">
      <div class="logo">
        <img style="height: 64px; width: 64px;" src="@/assets/lixeira.png" alt="Logo">
        <span class="logo-text">Descartei</span>
      </div>
    </header>

    <!-- Texto principal -->
    <main class="main-content">
      <h1 class="main-title">Descarte seu lixo de forma consciente.</h1>
      <p class="main-subtitle">Encontre ou cadastre pontos de coleta.</p>
      <!-- Botões de ação -->
      <div class="actions">
        <button @click="abrirModal" class="btn search-btn">
          Pesquisar pontos de coleta
        </button>
        <button @click="goToPontoColetaForm" class="btn register-btn">
          Cadastre um ponto de coleta
        </button>
      </div>

    </main>

    <!-- Aqui está o modal, que será exibido apenas quando `modalAberto` for verdadeiro -->
    <modal-pesquisa v-if="modalAberto" @fechar="fecharModal" />
  </div>
</template>

<script>
import ModalPesquisa from './ModalPesquisa.vue';
export default {
  name: 'Home',
  components: {
    ModalPesquisa,
  },
  data() {
    return {
      modalAberto: false, // Controle do estado de abertura do modal
    };
  },
  methods: {
    goToPontoColetaForm() {
      this.$router.push('/pontocoleta');
    },
    abrirModal() {
      console.log('Abriu');
      this.modalAberto = true; // Abre o modal ao clicar no botão "Pesquisar pontos de coleta"
    },
    fecharModal() {
      this.modalAberto = false; // Fecha o modal ao clicar no botão "Fechar"
    },
  },
};
</script>

<style scoped>
.container {
  background: url('@/assets/imghome.jpg') no-repeat right center;
  background-size: 600px;
  background-position: 95%;
  position: relative;
  width: 90%; 
  height: 90%; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header {
  display: flex;
  padding-left: 10%;
}

.logo {
  display: flex;
  align-items: center;
  padding-top: 18%;
}

.logo-text {
  font-size: 44px;
  font-weight: bold;
  color: #4e3d9a;
  margin-left: 10px;
  text-decoration: underline 2px #3bbf60;
}

.main-content {
  max-width: 40%;
  padding-left: 10%;
}

.main-title {
  padding-top: 60px;
  font-size: 56px;
  color: #4e3d9a;
  font-weight: bold;
}

.main-subtitle {
  font-size: 24px;
  text-align: center;
  color: #6b7280;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.btn {
  width: 70%;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn {
  background-color: #3bbf60;
  color: white;
}

.search-btn:hover {
  background-color: #34a556;
}

.register-btn {
  background-color: #4e3d9a;
  color: white;
}

.register-btn:hover {
  background-color: #392c87;
}
</style>
