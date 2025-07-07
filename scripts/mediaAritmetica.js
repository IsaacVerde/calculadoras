const formMedia = document.getElementById("form-media");
const resultadoMedia = document.getElementById("resultado-media");

formMedia.addEventListener("submit", function (event) {
  event.preventDefault();

  const n1 = Number(document.getElementById("n1").value);
  const n2 = Number(document.getElementById("n2").value);
  const n3 = Number(document.getElementById("n3").value);
  const n4 = Number(document.getElementById("n4").value);

  const media = (n1 + n2 + n3 + n4) / 4;

  // Verifica se o elemento de resultado existe antes de tentar usá-lo
  if (resultadoMedia) {
    resultadoMedia.innerHTML = `<p>Média Final : ${media.toFixed(2)}</p>`;
  }
});