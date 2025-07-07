// Alterna visibilidade das seções
function mostrarCalculadora(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
    sec.classList.remove("ativa");
  });

  const alvo = document.getElementById(id);
  if (alvo) {
    alvo.style.display = "block";
    alvo.classList.add("ativa");
  }
}

// Menu lateral (ícones)
const botoes = document.querySelectorAll('.icone');
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const alvo = botao.getAttribute('data-target');
    window.location.hash = alvo; // Atualiza a URL para o hash
  });
});

// Categorias (accordion do menu)
const categorias = document.querySelectorAll('.categoria-btn');
categorias.forEach(btn => {
  btn.addEventListener('click', () => {
    const grupo = btn.parentElement;
    grupo.classList.toggle('ativo');
  });
});

// Cards da tela inicial
document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cards-container");

  const calculadoras = [
    { id: "bhaskara", nome: "Bhaskara", icon: "fa-square-root-variable" },
    { id: "media", nome: "Média Aritmética", icon: "fa-calculator" },
    { id: "porcentagem", nome: "Porcentagem", icon: "fa-percent" },
    { id: "regra", nome: "Regra de Três", icon: "fa-divide" },
    { id: "ponderada", nome: "Média Ponderada", icon: "fa-scale-balanced" },
    { id: "juros-simples", nome: "Juros Simples", icon: "fa-money-bill-trend-up" },
    { id: "juros-compostos", nome: "Juros Compostos", icon: "fa-chart-line" },
  ];

  calculadoras.forEach(calc => {
    const card = document.createElement("div");
    card.className = "card-calculadora";
    card.innerHTML = `
      <i class="fas ${calc.icon}" style="font-size:32px;"></i>
      <h3>${calc.nome}</h3>
    `;
    card.setAttribute("data-target", calc.id);
    card.addEventListener("click", () => {
      window.location.hash = calc.id; // Atualiza o hash na URL
    });
    cardsContainer.appendChild(card);
  });

  // Exibir a calculadora correspondente ao hash ou tela inicial
  const hashInicial = location.hash.replace("#", "") || "home";
  mostrarCalculadora(hashInicial);
});

// Escutar mudanças no hash da URL (voltar/avançar do navegador)
window.addEventListener("hashchange", () => {
  const id = location.hash.replace("#", "") || "home";
  mostrarCalculadora(id);
});