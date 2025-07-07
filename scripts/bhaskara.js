// Seleciona os elementos usando os IDs corretos do seu HTML (com hífen)
const formBhaskara = document.getElementById("form-bhaskara");
const resultadoBhaskara = document.getElementById("resultado-bhaskara");

// Adiciona o evento de 'submit' à variável correta 'formBhaskara'
formBhaskara.addEventListener("submit", function (event) {
    event.preventDefault();

    // PEGANDO VALORES DOS INPUTS
    const a = Number(document.getElementById("a").value);
    const b = Number(document.getElementById("b").value);
    const c = Number(document.getElementById("c").value);

    // CALCULANDO O DELTA
    const delta = b * b - 4 * a * c;

    // VERIFICANDO O DELTA
    if (delta < 0) {
        // Usa a variável correta 'resultadoBhaskara' para exibir a mensagem
        resultadoBhaskara.innerHTML = "<p>Delta Negativo. Não Existem Raízes Reais.</p>";
        return;
    }

    // CALCULANDO AS RAIZES
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);

    // EXIBIÇÃO DE RESULTADOS
    // Usa a variável correta 'resultadoBhaskara' para exibir os resultados
    resultadoBhaskara.innerHTML = `
        <p>Δ = ${delta}</p>
        <p>x₁ = ${x1.toFixed(2)}</p>
        <p>x₂ = ${x2.toFixed(2)}</p>
    `;
});