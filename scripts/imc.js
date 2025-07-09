// scripts/imc.js

// 1. Seleciona os elementos do HTML com os quais vamos trabalhar
const formImc = document.getElementById('form-imc');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const resultadoDiv = document.getElementById('resultado-imc');

// 2. Adiciona um "escutador" para o evento de 'submit' (envio) do formulário
formImc.addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // 3. Pega os valores dos inputs e converte para números
    // O replace troca a vírgula (,) por ponto (.) para garantir que a altura funcione corretamente
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value.replace(',', '.'));

    // 4. Validação dos dados de entrada
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = `<p class="erro">Por favor, insira valores válidos e positivos para peso e altura.</p>`;
        resultadoDiv.className = 'erro'; // Adiciona classe para estilização de erro
        return; // Para a execução da função aqui
    }

    // 5. Calcula o IMC
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2); // Formata o resultado para ter 2 casas decimais

    // 6. Obtém a classificação e a classe CSS correspondente
    const classificacao = getClassificacaoIMC(imc);

    // 7. Exibe o resultado no HTML
    resultadoDiv.innerHTML = `
        <p>Seu IMC é <strong>${imcFormatado}</strong></p>
        <p>Classificação: <strong>${classificacao.texto}</strong></p>
    `;

    // Atualiza a classe da div de resultado para aplicar a cor correta
    resultadoDiv.className = `resultado ${classificacao.classe}`;
});

/**
 * Função auxiliar que retorna o texto da classificação e uma classe CSS
 * baseada no valor do IMC.
 * @param {number} imc - O valor do Índice de Massa Corporal.
 * @returns {object} - Um objeto com o texto da classificação e a classe CSS.
 */
function getClassificacaoIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'abaixo' };
    } else if (imc >= 18.5 && imc <= 24.9) {
        return { texto: 'Peso normal', classe: 'normal' };
    } else if (imc >= 25 && imc <= 29.9) {
        return { texto: 'Sobrepeso', classe: 'sobrepeso' };
    } else if (imc >= 30 && imc <= 34.9) {
        return { texto: 'Obesidade Grau I', classe: 'obesidade-1' };
    } else if (imc >= 35 && imc <= 39.9) {
        return { texto: 'Obesidade Grau II', classe: 'obesidade-2' };
    } else { // imc >= 40
        return { texto: 'Obesidade Grau III (Mórbida)', classe: 'obesidade-3' };
    }
}