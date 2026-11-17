# 📅 Meu Planner Diário

Uma aplicação web interativa de **Planner Diário** construída passo a passo para praticar os fundamentos do desenvolvimento Front-End (**HTML5**, **CSS3** e **JavaScript** puro).

---

## ✨ Funcionalidades

- **Organização por Períodos do Dia**: Separe suas tarefas entre **Manhã**, **Tarde** e **Noite**.
- **Foco Principal do Dia**: Campo dedicado para destacar a prioridade número 1 de hoje.
- **Barra de Progresso Automática**: Calcula em tempo real a porcentagem de tarefas concluídas.
- **Data Atual Automática**: Exibe o dia da semana e a data de hoje usando a API `Date` do JavaScript.
- **Botão "Limpar Concluídas"**: Remove rapidamente todas as tarefas já finalizadas para iniciar um novo ciclo.
- **Tema Claro e Escuro**: Alternância instantânea usando Variáveis CSS (`--cor-*`).
- **Salvamento Automático (`localStorage`)**: Suas tarefas, o foco do dia e o tema escolhido ficam salvos no navegador mesmo após fechar ou atualizar a página.

---

## 🗂️ Estrutura dos Arquivos

| Arquivo | Papel no Projeto |
| :--- | :--- |
| `index.html` | **Esqueleto (Estrutura)**: Define o cabeçalho, formulário, barra de progresso e as 3 colunas de listas (`<ul>`). |
| `style.css` | **Visual (Estilização)**: Define as variáveis de cores (Claro/Escuro), o layout em 3 colunas com `CSS Grid` e a responsividade para celulares. |
| `script.js` | **Cérebro (Lógica)**: Escuta os cliques, cria/remove tarefas no DOM, calcula a porcentagem e salva os dados no `localStorage` com `JSON`. |

---

## 🚀 Como Executar

Não é necessário instalar nenhuma dependência. Basta abrir o arquivo `index.html` em qualquer navegador moderno!
