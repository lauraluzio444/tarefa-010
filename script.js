document.getElementById("converterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const value = parseFloat(document.getElementById("value").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (isNaN(value)) {
    alert("Por favor, insere um número válido.");
    return;
  }

  const resultado = converterTemperatura(value, from, to);
  mostrarResultado(resultado, to);
});

document.getElementById("value").addEventListener("input", () => {
  document.body.style.backgroundColor = "#fff"; // reset cor ao digitar
});

function usarPrompt() {
  const valor = prompt("Insere a temperatura:");
  const de = prompt("De (C, F, K):");
  const para = prompt("Para (C, F, K):");

  const value = parseFloat(valor);
  if (isNaN(value) || !["C", "F", "K"].includes(de) || !["C", "F", "K"].includes(para)) {
    alert("Dados inválidos.");
    return;
  }

  const resultado = converterTemperatura(value, de, para);
  mostrarResultado(resultado, para);
}

function converterTemperatura(valor, de, para) {
  let resultado = valor;

  if (de === para) return resultado;

  // Celsius para outros
  if (de === "C" && para === "F") resultado = (valor * 9/5) + 32;
  else if (de === "C" && para === "K") resultado = valor + 273.15;

  // Fahrenheit para outros
  else if (de === "F" && para === "C") resultado = (valor - 32) * 5/9;
  else if (de === "F" && para === "K") resultado = (valor - 32) * 5/9 + 273.15;

  // Kelvin para outros
  else if (de === "K" && para === "C") resultado = valor - 273.15;
  else if (de === "K" && para === "F") resultado = (valor - 273.15) * 9/5 + 32;

  return Math.round(resultado * 100) / 100;
}

function mostrarResultado(valor, unidade) {
  document.getElementById("resultado").innerText = `Resultado: ${valor} °${unidade}`;
  mudarCorFundo(valor, unidade);
}

function mudarCorFundo(valor, unidade) {
  let tempC;

  if (unidade === "C") tempC = valor;
  else if (unidade === "F") tempC = (valor - 32) * 5/9;
  else if (unidade === "K") tempC = valor - 273.15;

  if (tempC < 10) document.body.style.backgroundColor = "#87CEFA"; // azul
  else if (tempC > 25) document.body.style.backgroundColor = "#FF6347"; // vermelho
  else document.body.style.backgroundColor = "#FFD700"; // amarelo
}
