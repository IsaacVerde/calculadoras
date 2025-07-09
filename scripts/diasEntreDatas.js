// scripts/diasEntreDatas.js
{ // Bloco de escopo para segurança
    
    // 1. Seleciona os elementos
    const formDatas = document.getElementById('form-dias-entre-datas');
    const dataInicioInput = document.getElementById('data-inicio');
    const dataFinalInput = document.getElementById('data-final');
    const resultadoDiv = document.getElementById('resultado-dias-entre-datas');

    // 2. Adiciona o listener para o envio do formulário
    formDatas.addEventListener('submit', function(event) {
        event.preventDefault();

        // 3. Pega os valores e cria objetos Date
        const dataInicioStr = dataInicioInput.value;
        const dataFinalStr = dataFinalInput.value;

        // Validação simples para ver se as datas foram preenchidas
        if (!dataInicioStr || !dataFinalStr) {
            resultadoDiv.innerHTML = `<p style="color: #dc3545;">Por favor, preencha ambas as datas.</p>`;
            return;
        }

        // O input 'date' retorna 'AAAA-MM-DD'. O JavaScript entende isso, mas para evitar problemas
        // com fuso horário, criamos as datas em UTC (Tempo Universal Coordenado).
        const dataInicio = new Date(dataInicioStr + 'T00:00:00Z');
        const dataFinal = new Date(dataFinalStr + 'T00:00:00Z');

        // 4. Calcula a diferença em milissegundos
        const diferencaEmMs = Math.abs(dataFinal - dataInicio);

        // 5. Converte milissegundos para dias
        // 1000 ms/s * 60 s/min * 60 min/h * 24 h/dia
        const msPorDia = 1000 * 60 * 60 * 24;
        const diferencaEmDias = Math.floor(diferencaEmMs / msPorDia);

        // Bônus: Calcula em semanas e meses (aproximado)
        const diferencaEmSemanas = (diferencaEmDias / 7).toFixed(1);
        const diferencaEmMeses = (diferencaEmDias / 30.44).toFixed(1); // Média de dias no mês

        // 6. Exibe o resultado
        resultadoDiv.innerHTML = `
            <h3>Diferença Total:</h3>
            <p><strong>${diferencaEmDias}</strong> dias</p>
            <p><small>ou aproximadamente ${diferencaEmSemanas} semanas</small></p>
            <p><small>ou aproximadamente ${diferencaEmMeses} meses</small></p>
        `;
    });

} // Fim do bloco