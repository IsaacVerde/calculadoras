// scripts/conversorTempo.js
{ // Bloco de escopo
    
    // --- LÓGICA 1: H:M:S -> SEGUNDOS ---
    const formHmsParaSegundos = document.getElementById('form-hms-para-segundos');
    const horasInput = document.getElementById('input-horas');
    const minutosInput = document.getElementById('input-minutos');
    const segundosInput = document.getElementById('input-segundos');
    const resultadoParaSegundosDiv = document.getElementById('resultado-para-segundos');

    formHmsParaSegundos.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const horas = parseInt(horasInput.value) || 0;
        const minutos = parseInt(minutosInput.value) || 0;
        const segundos = parseInt(segundosInput.value) || 0;

        const totalSegundos = (horas * 3600) + (minutos * 60) + segundos;
        
        resultadoParaSegundosDiv.textContent = `Total: ${totalSegundos.toLocaleString('pt-BR')} segundos`;
    });


    // --- LÓGICA 2: SEGUNDOS -> H:M:S ---
    const formSegundosParaHms = document.getElementById('form-segundos-para-hms');
    const totalSegundosInput = document.getElementById('input-total-segundos');
    const resultadoParaHmsDiv = document.getElementById('resultado-para-hms');

    formSegundosParaHms.addEventListener('submit', function(event) {
        event.preventDefault();

        const totalSegundos = parseInt(totalSegundosInput.value) || 0;

        if (totalSegundos < 0) {
            resultadoParaHmsDiv.textContent = "Insira um valor positivo.";
            return;
        }

        // Calcula horas
        const horas = Math.floor(totalSegundos / 3600);
        const segundosRestantes = totalSegundos % 3600;
        
        // Calcula minutos
        const minutos = Math.floor(segundosRestantes / 60);
        
        // Calcula segundos finais
        const segundos = segundosRestantes % 60;

        // Formata para ter sempre dois dígitos (ex: 01:05:09)
        const horasFormatadas = String(horas).padStart(2, '0');
        const minutosFormatados = String(minutos).padStart(2, '0');
        const segundosFormatados = String(segundos).padStart(2, '0');
        
        resultadoParaHmsDiv.textContent = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
    });

} // Fim do bloco de escopo