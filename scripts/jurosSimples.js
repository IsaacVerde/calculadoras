const formJuros = document.getElementById("form-juros");
const resultadoDivJuros = document.getElementById("resultadoJuros"); // Renomeei para ficar mais claro

// >>> APENAS UM EVENT LISTENER PARA O FORMULÁRIO <<<
formJuros.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o recarregamento da página

  // --- 1. Captura dos dados da tela ---
  // Usar parseFloat é uma boa prática para números que podem ter decimais.
  const capital = parseFloat(document.getElementById("capitalJuros").value);
  const taxa = parseFloat(document.getElementById("taxaJuros").value);
  const tempo = parseFloat(document.getElementById("tempoJuros").value);

  // Verifica se os valores são números válidos antes de prosseguir
  if (isNaN(capital) || isNaN(taxa) || isNaN(tempo)) {
    resultadoDivJuros.innerHTML = "<p>Por favor, preencha todos os campos com números válidos.</p>";
    return; // Para a execução da função se houver erro
  }

  // --- 2. Verifica qual tipo de juros foi selecionado ---
  const tipoDeJuros = document.querySelector('input[name="tipoJuros"]:checked').value;

  // --- 3. Declaração das variáveis de resultado ---
  let montanteFinal;
  let jurosTotal;

  // --- 4. Lógica Condicional para decidir o cálculo ---
  if (tipoDeJuros === 'simples') {
    // Fórmula de Juros Simples
    jurosTotal = (capital * taxa * tempo) / 100;
    montanteFinal = capital + jurosTotal;

  } else { // O tipo de juros só pode ser 'compostos'
    // Fórmula de Juros Compostos
    // Convertendo a taxa para decimal para a fórmula
    const taxaDecimal = taxa / 100;
    montanteFinal = capital * Math.pow((1 + taxaDecimal), tempo);
    jurosTotal = montanteFinal - capital;
  }

  // --- 5. Exibição do resultado formatado ---
  resultadoDivJuros.innerHTML = `
    <p>Montante Final: ${montanteFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
    <p>Total em Juros: ${jurosTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
  `;
});