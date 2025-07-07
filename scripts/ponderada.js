const formPonderada = document.getElementById("form-ponderada");
const resultadoPonderada = document.getElementById("resultadoPonderada");

formPonderada.addEventListener("submit", function (event) {
  event.preventDefault();

  const n1 = Number(document.getElementById("n1Ponderada").value);
  const p1 = Number(document.getElementById("p1Ponderada").value);
  const n2 = Number(document.getElementById("n2Ponderada").value);
  const p2 = Number(document.getElementById("p2Ponderada").value);


  const somaPesos = p1 + p2;

  if(somaPesos === 0){
    resultadoPonderada.innerHTM = "A soma dos pesos não pode ser zero";
    return;
  }

  const mediaPonderada = (n1 * p1 + n2 * p2)/ somaPesos;

  resultadoPonderada.innerHTML =`<p> Média Ponderada: ${mediaPonderada.toFixed(2)}</p>`;


});
