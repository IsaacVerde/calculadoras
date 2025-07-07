document.addEventListener("DOMContentLoaded", () => {
  const formParcelas      = document.getElementById("form-parcelas");
  const resultadoParcelas = document.getElementById("resultadoParcelas");

  function limpaNumero(str) {
    return str.replace(/\./g, "").replace(",", ".");
  }

  formParcelas.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1) Captura raw dos campos
    const rawValor      = document.getElementById("valorTotal").value;
    const rawTaxa       = document.getElementById("taxaParcelas").value;
    const rawParcelas   = document.getElementById("numeroParcelas").value;

    // 2) Converte usando limpaNumero
    const valorTotal    = parseFloat(limpaNumero(rawValor));
    const taxaParcelas  = parseFloat(limpaNumero(rawTaxa));
    const numeroParcelas= parseInt(rawParcelas, 10);

    // DEBUG: confira no console
    console.log({ valorTotal, taxaParcelas, numeroParcelas });

    if (isNaN(valorTotal) || isNaN(taxaParcelas) || isNaN(numeroParcelas)
        || valorTotal <= 0 || numeroParcelas <= 0) {
      resultadoParcelas.innerHTML = "<p>Preencha valores válidos.</p>";
      return;
    }

    // 3) Cálculo PRICE
    const i     = taxaParcelas / 100;
    const n     = numeroParcelas;
    const fator = Math.pow(1 + i, n);
    const parcela   = (valorTotal * i * fator) / (fator - 1);
    const totalPago = parcela * n;

    // 4) Exibe resultado
    resultadoParcelas.innerHTML = `
      <p>Valor da Parcela: 
        ${parcela.toLocaleString("pt-BR", {
          style: "currency", currency: "BRL"
        })}
      </p>
      <p>Total Pago em ${n} parcelas: 
        ${totalPago.toLocaleString("pt-BR", {
          style: "currency", currency: "BRL"
        })}
      </p>
    `;
  });
});