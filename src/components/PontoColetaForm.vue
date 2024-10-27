<template>
  <div class="form-page">
    <header class="form-header">
      <div class="logo-container">
        <img src="../assets/lixeira.png" alt="Logo" class="logo" />
        <span class="logo-text">Descartei</span>
      </div>
      <a @click="goBack" class="back-link">
        <span class="back-arrow">&larr;</span> Voltar para home
      </a>
    </header>

    <div class="form-container">
      <h2>Cadastro do ponto de coleta</h2>
      <form @submit.prevent="cadastrarPonto">
        <!-- Seção: Dados da Entidade -->
        <h3>Dados da entidade</h3>
        <div class="form-group">
          <label for="nomeEntidade">Nome da entidade</label>
          <input v-model="ponto.nomeEntidade" id="nomeEntidade" required />
        </div>

        <!-- Endereço e Número -->
        <div class="form-group half-width">
          <label for="endereco">Endereço</label>
          <input v-model="ponto.endereco" id="endereco" required />
        </div>

        <div class="form-group half-width">
          <label for="numero">Número</label>
          <input v-model="ponto.numero" id="numero" required />
        </div>

        <!-- Estado e Cidade -->
        <div class="form-group half-width">
          <label class="labelcidadeestado" for="estado">Estado</label>
          <select v-model="ponto.estado" @change="filterCidades" id="estado" required>
            <option value="">Selecione um estado</option>
            <option v-for="estado in estadosCidades" :key="estado.estado" :value="estado.estado">
              {{ estado.estado }}
            </option>
          </select>
        </div>

        <div class="form-group half-width">
          <label class="labelcidadeestado" for="cidade">Cidade</label>
          <select v-model="ponto.cidade" id="cidade" :disabled="!ponto.estado" required>
            <option value="">Selecione uma cidade</option>
            <option v-for="cidade in filteredCidades" :key="cidade" :value="cidade">
              {{ cidade }}
            </option>
          </select>
        </div>

        <!-- Número para Contato -->
        <div class="form-group">
          <label for="numeroContato">Número para contato</label>
          <input
            v-model="ponto.numeroContato"
            id="numeroContato"
            required
            @input="formatarNumero"
            maxlength="15"
            placeholder="(XX) XXXXXXXX"
          />
        </div>

        <h3>Itens de coleta</h3>
        <!-- Itens de Coleta -->
        <div class="itens-coleta">
          <div
            class="item-coleta"
            :class="{ selected: ponto.itensColeta.includes('Resíduos Orgânicos') }"
            @click="toggleItemColeta('Resíduos Orgânicos')"
          >
            <img src="../assets/organico.png" alt="Resíduos Orgânicos" />
            <p>Resíduos Orgânicos</p>
          </div>

          <div
            class="item-coleta"
            :class="{ selected: ponto.itensColeta.includes('Papéis e Papelão') }"
            @click="toggleItemColeta('Papéis e Papelão')"
          >
            <img src="../assets/papelao.png" alt="papelao" />
            <p>Papéis e Papelão</p>
          </div>

          <div
            class="item-coleta"
            :class="{ selected: ponto.itensColeta.includes('Resíduos Eletrônicos') }"
            @click="toggleItemColeta('Resíduos Eletrônicos')"
          >
            <img src="../assets/eletronico.png" alt="Eletrônicos" />
            <p>Eletrônicos</p>
          </div>

          <div
            class="item-coleta"
            :class="{ selected: ponto.itensColeta.includes('Óleo de Cozinha') }"
            @click="toggleItemColeta('Óleo de Cozinha')"
          >
            <img src="../assets/oleo.png" alt="Óleo de Cozinha" />
            <p>Óleo de Cozinha</p>
          </div>
        </div>

        <button type="submit" class="submit-btn">Cadastrar ponto de coleta</button>
      </form>

      <p v-if="mensagemSucesso" class="success-message">{{ mensagemSucesso }}</p>
    </div>
  </div>
</template>

<script>
// Importações e código Vue.js
import axios from 'axios';
import estados from '../assets/estados.json';

export default {
  name: 'PontoColetaForm',
  data() {
    return {
      ponto: {
        nomeEntidade: '',
        endereco: '',
        numero: '',
        estado: '',
        cidade: '',
        numeroContato: '',
        itensColeta: []
      },
      mensagemSucesso: '',
      estadosCidades: estados,
      filteredCidades: []
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    filterCidades() {
      const estadoSelecionado = this.estadosCidades.find(
        estado => estado.estado === this.ponto.estado
      );
      this.filteredCidades = estadoSelecionado ? estadoSelecionado.cidades : [];
    },
    toggleItemColeta(item) {
      const index = this.ponto.itensColeta.indexOf(item);
      if (index > -1) {
        this.ponto.itensColeta.splice(index, 1);
      } else {
        this.ponto.itensColeta.push(item);
      }
    },
    formatarNumero() {
      let contato = this.ponto.numeroContato.replace(/\D/g, '');
      if (contato.length > 0) {
        contato = `(${contato.slice(0, 2)}) ${contato.slice(2)}`;
      }
      if (contato.length > 10) {
        contato = `${contato.slice(0, 9)} ${contato.slice(9, 13)}`;
      }
      this.ponto.numeroContato = contato;
    },
    async cadastrarPonto() {
      try {
        const resposta = await axios.post('http://localhost:5000/pontocoleta', this.ponto);
        this.mensagemSucesso = 'Ponto cadastrado com sucesso!';
        this.resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar ponto', error);
      }
    },
    resetForm() {
      this.ponto = {
        nomeEntidade: '',
        endereco: '',
        numero: '',
        estado: '',
        cidade: '',
        numeroContato: '',
        itensColeta: []
      };
      this.filteredCidades = [];
    }
  }
};
</script>


<style scoped>
/* Estilos da página de formulário */
.form-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f6f9;
  min-height: 100vh;
}

.form-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  padding-left: 30px;
  height: 64px;
  width: 64px;
}

.logo-text {
  font-size: 34px;
  font-weight: bold;
  color: #4e3d9a;
  margin-left: 10px;
}

.back-link {
  color: #4e3d9a;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  height: 25px;
}

.back-link:hover {
  color: #2a9446;
}

.form-container {
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: #4e3d9a;
  text-align: center;
  margin-bottom: 30px;
}

h3 {
  font-size: 18px;
  font-weight: bold;
  color: #4e3d9a;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.half-width {
  width: 400px;
  display: grid;
}

#estado, #cidade {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

#numeroContato {
  width: 50%;
  display: flex;
}

.labelcidadeestado {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.submit-btn {
  background-color: #3bbf60;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #34a556;
}

.success-message {
  margin-top: 20px;
  color: #3bbf60;
  font-weight: bold;
  text-align: center;
}

.itens-coleta {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
  padding-bottom: 15px;
}

.item-coleta {
  cursor: pointer;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 10px;
  text-align: center;
  width: 120px;
  transition: transform 0.2s;
}

.item-coleta img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.item-coleta p {
  font-size: 14px;
  color: #333;
}

.item-coleta.selected {
  background-color: #3bbf60;
  color: white;
  transform: scale(1.05);
}

</style>
