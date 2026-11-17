// ============================================================================
// 1. SELECIONANDO OS ELEMENTOS DO HTML (DOM)
// ============================================================================
const inputTarefa = document.getElementById('input-tarefa');
const selectPeriodo = document.getElementById('select-periodo');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnLimpar = document.getElementById('btn-limpar');
const btnTema = document.getElementById('btn-tema');
const inputFoco = document.getElementById('foco-dia');
const spanDataHoje = document.getElementById('data-hoje');

const textoProgresso = document.getElementById('texto-progresso');
const barraPreenchimento = document.getElementById('barra-preenchimento');

// Nomes das "gavetas" (chaves) que usaremos no localStorage
const CHAVE_TAREFAS = 'planner_tarefas';
const CHAVE_FOCO = 'planner_foco';
const CHAVE_TEMA = 'planner_tema';

// ============================================================================
// 2. EXIBIR A DATA DE HOJE AUTOMATICAMENTE
// Usa o objeto nativo Date do JavaScript formatado para o português do Brasil.
// ============================================================================
function exibirDataDeHoje() {
  const hoje = new Date();
  const opcoesFormato = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  spanDataHoje.textContent = hoje.toLocaleDateString('pt-BR', opcoesFormato);
}

// ============================================================================
// 3. FUNÇÃO PARA CALCULAR E ATUALIZAR A BARRA DE PROGRESSO
// ============================================================================
function atualizarProgresso() {
  const todasTarefas = document.querySelectorAll('.item-tarefa');
  const tarefasConcluidas = document.querySelectorAll('.item-tarefa.concluida');

  const total = todasTarefas.length;
  const concluidas = tarefasConcluidas.length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  textoProgresso.textContent = `${porcentagem}% (${concluidas}/${total})`;
  barraPreenchimento.style.width = `${porcentagem}%`;
}

// ============================================================================
// 4. FUNÇÕES DO LOCALSTORAGE (Salvar e Carregar dados no navegador)
// ============================================================================
function salvarTarefasNoStorage() {
  const listaParaSalvar = [];
  const periodos = ['manha', 'tarde', 'noite'];

  periodos.forEach(function (periodo) {
    const listaUl = document.getElementById(`lista-${periodo}`);
    const itens = listaUl.querySelectorAll('.item-tarefa');

    itens.forEach(function (item) {
      const texto = item.querySelector('span').textContent;
      const concluida = item.classList.contains('concluida');

      listaParaSalvar.push({
        texto: texto,
        periodo: periodo,
        concluida: concluida,
      });
    });
  });

  localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(listaParaSalvar));
}

function carregarDadosDoStorage() {
  // 1. Carrega o Tema (Claro ou Escuro)
  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  if (temaSalvo === 'escuro') {
    document.body.classList.add('modo-escuro');
    btnTema.textContent = 'Modo Diurno';
  }

  // 2. Carrega o Foco Principal do Dia
  const focoSalvo = localStorage.getItem(CHAVE_FOCO);
  if (focoSalvo !== null) {
    inputFoco.value = focoSalvo;
  }

  // 3. Carrega a Lista de Tarefas
  const tarefasSalvasTexto = localStorage.getItem(CHAVE_TAREFAS);

  if (tarefasSalvasTexto !== null) {
    const listaTarefas = JSON.parse(tarefasSalvasTexto);

    listaTarefas.forEach(function (tarefa) {
      criarElementoTarefa(tarefa.texto, tarefa.periodo, tarefa.concluida, false);
    });
  } else {
    criarElementoTarefa('Revisar a pauta da manhã com calma', 'manha', true, false);
    criarElementoTarefa('Concentrar 1h no bloco de estudo principal', 'tarde', false, false);
    criarElementoTarefa('Planejar as prioridades do dia seguinte', 'noite', false, false);
    salvarTarefasNoStorage();
  }

  atualizarProgresso();
}

// ============================================================================
// 5. FUNÇÕES DE TAREFAS (Criar, Adicionar e Limpar Concluídas)
// ============================================================================
function criarElementoTarefa(texto, periodo, jaConcluida = false, salvarAgora = true) {
  const item = document.createElement('li');
  item.className = 'item-tarefa';
  if (jaConcluida) {
    item.classList.add('concluida');
  }

  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = jaConcluida;

  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;

  checkbox.addEventListener('change', function () {
    item.classList.toggle('concluida', checkbox.checked);
    atualizarProgresso();
    salvarTarefasNoStorage();
  });

  label.appendChild(checkbox);
  label.appendChild(spanTexto);

  const btnRemover = document.createElement('button');
  btnRemover.type = 'button';
  btnRemover.className = 'btn-remover';
  btnRemover.textContent = '✕';
  btnRemover.title = 'Remover tarefa';

  btnRemover.addEventListener('click', function () {
    item.remove();
    atualizarProgresso();
    salvarTarefasNoStorage();
  });

  item.appendChild(label);
  item.appendChild(btnRemover);

  const listaDestino = document.getElementById(`lista-${periodo}`);
  listaDestino.appendChild(item);

  atualizarProgresso();

  if (salvarAgora) {
    salvarTarefasNoStorage();
  }
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  const periodo = selectPeriodo.value;

  if (texto === '') {
    inputTarefa.focus();
    return;
  }

  criarElementoTarefa(texto, periodo);

  inputTarefa.value = '';
  inputTarefa.focus();
}

function limparTarefasConcluidas() {
  const concluidas = document.querySelectorAll('.item-tarefa.concluida');
  concluidas.forEach(function (item) {
    item.remove();
  });

  atualizarProgresso();
  salvarTarefasNoStorage();
}

// ============================================================================
// 6. EVENTOS (Interações do Usuário)
// ============================================================================
btnAdicionar.addEventListener('click', adicionarTarefa);
btnLimpar.addEventListener('click', limparTarefasConcluidas);

inputTarefa.addEventListener('keydown', function (evento) {
  if (evento.key === 'Enter') {
    adicionarTarefa();
  }
});

inputFoco.addEventListener('input', function () {
  localStorage.setItem(CHAVE_FOCO, inputFoco.value);
});

btnTema.addEventListener('click', function () {
  const estaNoModoEscuro = document.body.classList.toggle('modo-escuro');

  if (estaNoModoEscuro) {
    btnTema.textContent = 'Modo Diurno';
    localStorage.setItem(CHAVE_TEMA, 'escuro');
  } else {
    btnTema.textContent = 'Modo Noturno';
    localStorage.setItem(CHAVE_TEMA, 'claro');
  }
});

// ============================================================================
// 7. INICIALIZAÇÃO
// ============================================================================
exibirDataDeHoje();
carregarDadosDoStorage();
