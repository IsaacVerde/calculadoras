// scripts/conversorBases.js
{ // Usando um bloco para evitar conflito de escopo global
    
    // 1. Seleciona os elementos da calculadora de bases
    const valorInput = document.getElementById('valor-base');
    const baseOrigemSelect = document.getElementById('base-origem');
    const baseDestinoSelect = document.getElementById('base-destino');
    const resultadoDiv = document.getElementById('resultado-conversor-bases');

    // Função principal que realiza a conversão
    function converterBases() {
        const valor = valorInput.value.trim();
        const baseOrigem = parseInt(baseOrigemSelect.value);
        const baseDestino = parseInt(baseDestinoSelect.value);

        // Se o campo estiver vazio, limpa o resultado
        if (valor === "") {
            resultadoDiv.innerHTML = "";
            return;
        }

        // Validação de entrada (simples)
        // Regex para verificar se o input é válido para a base de origem
        const validadores = {
            2: /^[01]+$/,
            10: /^[0-9]+$/,
            16: /^[0-9a-fA-F]+$/
        };

        if (!validadores[baseOrigem].test(valor)) {
            resultadoDiv.innerHTML = `<p style="color: #dc3545;">Valor inválido para a base ${baseOrigemSelect.options[baseOrigemSelect.selectedIndex].text}.</p>`;
            return;
        }

        // 1. Converte o valor da base de origem para a base Decimal (10)
        // parseInt() faz exatamente isso: converte uma string de uma base X para um número decimal.
        const valorEmDecimal = parseInt(valor, baseOrigem);

        // Se a conversão falhar (ex: valor inválido não pego pelo regex)
        if (isNaN(valorEmDecimal)) {
             resultadoDiv.innerHTML = `<p style="color: #dc3545;">Erro na conversão.</p>`;
             return;
        }

        // 2. Converte o valor Decimal para a base de destino
        // .toString(base) faz o inverso: converte um número decimal para uma string em uma base Y.
        const valorConvertido = valorEmDecimal.toString(baseDestino).toUpperCase();

        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <p style="font-size: 1.1em;">Resultado:</p>
            <h2 style="font-family: 'Courier New', Courier, monospace; word-wrap: break-word;">${valorConvertido}</h2>
        `;
    }

    // 2. Adiciona os "escutadores" de eventos
    // Eles chamarão a função 'converterBases' sempre que o usuário interagir com os campos.
    valorInput.addEventListener('input', converterBases);
    baseOrigemSelect.addEventListener('change', converterBases);
    baseDestinoSelect.addEventListener('change', converterBases);

} // Fim do bloco de escopo