<template>
    <div class="modal-overlay">
      <div class="modal-conteudo">
        <h2>Buscar ponto de coleta</h2>
        <form @submit.prevent="enviarFormulario">
          <input v-model="estado" placeholder="Digite o estado" required />
          <input v-model="cidade" placeholder="Digite a cidade" required />
          <div class="buttons">
            <button type="submit" class="btn-buscar">Buscar</button>
            <button type="button" class="btn-fechar" @click="fecharModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cidade: '',
        estado: ''
      };
    },
    methods: {
      enviarFormulario() {
        // Verifica se os campos foram preenchidos
        if (this.cidade && this.estado) {
          // Redireciona para a página de resultados com os parâmetros da cidade e estado
          this.$router.push({
            name: 'resultados',
            query: { cidade: this.cidade, estado: this.estado }
          });
          this.fecharModal(); // Fecha o modal após o redirecionamento
        } else {
          alert('Por favor, preencha ambos os campos de cidade e estado.');
        }
      },
      fecharModal() {
        // Emitir o evento de fechar o modal para o componente pai
        this.$emit('fechar');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Certifica-se que o modal apareça acima de outros elementos */
  }
  
  .modal-conteudo {
    background: white;
    padding: 40px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #4e3d9a;
  }
  
  form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-buscar {
    background-color: #3bbf60;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .btn-fechar {
    background-color: #dc3545;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-buscar:hover {
    background-color: #34a556;
  }
  
  .btn-fechar:hover {
    background-color: #c82333;
  }
  </style>
  