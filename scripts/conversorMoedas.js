console.log("🔧 conversorMoedas.js carregado");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-conversor-moedas");
  const out  = document.getElementById("resultado-conversor-moedas");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    out.textContent = "⏳ Carregando...";

    const raw    = document.getElementById("valor-conversao").value;
    const origem = document.getElementById("moeda-origem").value;
    const destino= document.getElementById("moeda-destino").value;
    const valor  = parseFloat(raw);

    if (!valor || origem === destino) {
      out.textContent = "⚠️ Informe um valor válido e duas moedas diferentes.";
      return;
    }

    // endpoint Frankfurter
    const url = `https://api.frankfurter.app/latest?from=${origem}&to=${destino}`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      const data = await resp.json();

      // data.rates[destino] é a taxa de 1 unidade
      const taxa = data.rates[destino];
      if (typeof taxa !== "number") {
        out.textContent = "❌ Taxa não disponível para essa moeda.";
        return;
      }

      // calcula o valor convertido
      const convertido = valor * taxa;

      out.innerHTML = `
        <p>${valor.toLocaleString("pt-BR")} ${origem} = 
           ${convertido.toLocaleString("pt-BR", {
             style: "currency",
             currency: destino
           })}</p>
        <small>1 ${origem} = ${taxa.toFixed(4)} ${destino}</small>
      `;
    }
    catch (err) {
      console.error("❌ fetch error:", err);
      out.textContent = "❌ Erro ao acessar a API. Tente novamente mais tarde.";
    }
  });
});