// scripts/tmb.js (CORRIGIDO)

// 1. Seleciona os elementos do HTML com nomes de variáveis ÚNICOS
const formTmb = document.getElementById('form-tmb');
const sexoTmbSelect = document.getElementById('sexo-tmb'); // Nome alterado
const pesoTmbInput = document.getElementById('peso-tmb'); // Nome alterado
const alturaTmbInput = document.getElementById('altura-tmb'); // Nome alterado
const idadeTmbInput = document.getElementById('idade-tmb'); // Nome alterado
const resultadoTmbDiv = document.getElementById('resultado-tmb'); // Nome alterado

// 2. Adiciona o escutador de evento ao formulário
formTmb.addEventListener('submit', function(event) {
    event.preventDefault();

    // 3. Pega os valores dos inputs usando as novas variáveis
    const sexo = sexoTmbSelect.value;
    const peso = parseFloat(pesoTmbInput.value);
    const altura = parseFloat(alturaTmbInput.value);
    const idade = parseInt(idadeTmbInput.value);

    // 4. Validação dos dados
    if (isNaN(peso) || isNaN(altura) || isNaN(idade) || peso <= 0 || altura <= 0 || idade <= 0) {
        // Usando a nova variável para o resultado
        resultadoTmbDiv.innerHTML = `<p>Por favor, preencha todos os campos com valores válidos e positivos.</p>`;
        resultadoTmbDiv.style.color = '#dc3545';
        return;
    }

    // 5. Calcula a TMB
    let tmb;
    if (sexo === 'homem') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
        tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    // 6. Exibe o resultado formatado
    resultadoTmbDiv.style.color = 'initial';
    resultadoTmbDiv.innerHTML = `
        <p>Sua Taxa Metabólica Basal é de aproximadamente:</p>
        <h2><strong>${tmb.toFixed(0)} kcal</strong> por dia</h2>
        <small>Este é o gasto calórico do seu corpo em repouso.</small>
    `;
});