const formRegra = document.getElementById("form-regra-de-tres");
const resultadoRegra = document.getElementById("resultadoRegra");
// UMA VARIAVEL PARA O FORMULARIO EUMA PARA O RESULTADO

formRegra.addEventListener("submit", function (event) {

    event.preventDefault();

  const a = Number(document.getElementById("regra-a").value);
  const b = Number(document.getElementById("regra-b").value);
  const c = Number(document.getElementById("regra-c").value);
if   (a ===0){
    resultadoRegra.innerHTML = "O valor de referencia Nao pode ser zero"
    return;
}
//FORMLUMA DA REGRA DE TRES
 const x = ( b * c) / a;
 //EXIBIÇÃO DE RESULTADOS COM VARIAVEIS PARA CONCATENAR, LEMBRAR DO ASCENTO CRASEADO.
 //TO FIXED PARA ARREDONDAR PARA 2 NUMEROS DECIMAIS
 resultadoRegra.innerHTML = `<p>Resultado: = ${x.toFixed(2)}</p>`;

});
