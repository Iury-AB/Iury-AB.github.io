
function exportarFicha() {
  removerVantagens();
  const dados = {};
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id  && !el.classList.contains("personalizacao") && el.id != "tableFilter" &&
        !el.classList.contains("config")) {
      dados[el.id] = el.value;
    }
  });

  const ficha = {
    dados,
    contadorVantagens,
    contadorPoderes,
    contadorEfeitos,
    contadorModificadores
  };

  const blob = new Blob(
    [JSON.stringify(ficha, null, 2)],
    { type: "application/json" }
  );

  const nome = document.getElementById("personagem").value;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ficha-${nome}.json`;
  link.click();
}

function importarFicha(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const json = JSON.parse(reader.result);
    const dados = json.dados;
    const nVantagens = json.contadorVantagens || 0;
    const nPoderes = json.contadorPoderes || 0;
    const nEfeitos = json.contadorEfeitos;
    const nModiifcadores = json.contadorModificadores;

    const nome = dados["personagem"];

    localStorage.setItem(`ficha:${nome}`, JSON.stringify(dados));
    localStorage.setItem(`contadorVantagens:${nome}`, nVantagens);
    localStorage.setItem(`contadorModificadores:${nome}`, JSON.stringify(nModiifcadores));
    localStorage.setItem(`contadorEfeitos:${nome}`, JSON.stringify(nEfeitos));
    localStorage.setItem(`contadorPoderes:${nome}`, nPoderes);

    carregarFicha(nome);
    const index = getIndex();
    if (!index.includes(nome)) {
      index.push(nome);
      saveIndex(index);
    }
    carregarIndex();
    document.getElementById("listaFichas").value = nome;
  };
  
  reader.readAsText(file);
}

function getIndex() {
  return JSON.parse(localStorage.getItem("fichas:index")) || [];
}

function saveIndex(index) {
  localStorage.setItem("fichas:index", JSON.stringify(index));
}

function carregarIndex() {
  const select = document.getElementById("listaFichas");
  const index = JSON.parse(localStorage.getItem("fichas:index")) || [];

  // limpa o select
  select.innerHTML = "";

  // opção padrão
  const placeholder = document.createElement("option");
  placeholder.value = "selecionar";
  placeholder.textContent = "— selecionar personagem —";
  select.appendChild(placeholder);

  // adiciona as fichas
  index.forEach(nome => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    select.appendChild(option);
  });
}

function salvarFicha() {
  removerVantagens();
  const dados = {};

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id && !el.classList.contains("personalizacao") && el.id != "tableFilter" &&
        !el.classList.contains("config")){
      dados[el.id] = el.value;
    }
  });

  const nome = document.getElementById("personagem").value;

  const index = getIndex();
  if (!index.includes(nome)) {
    index.push(nome);
    saveIndex(index);
  }
  carregarIndex();
  document.getElementById("listaFichas").value = nome;

  localStorage.setItem(`ficha:${nome}`, JSON.stringify(dados));
  localStorage.setItem(`contadorVantagens:${nome}`, contadorVantagens);
  localStorage.setItem(`contadorModificadores:${nome}`, JSON.stringify(contadorModificadores));
  localStorage.setItem(`contadorEfeitos:${nome}`, JSON.stringify(contadorEfeitos));
  localStorage.setItem(`contadorPoderes:${nome}`, contadorPoderes);

  document.getElementById("pagina").innerHTML = nome;
}

function carregarFicha(nome) {
  if (nome == "selecionar") {
    limparFicha();
    return;
  }
  const dados = JSON.parse(localStorage.getItem(`ficha:${nome}`));
  if (!dados) return;

  const nVantagens = JSON.parse(localStorage.getItem(`contadorVantagens:${nome}`));

  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  contadorVantagens = 0;

  for (let index = 0; index < nVantagens; index++) {
    adicionarVantagem();
  }

  const nPoderes = JSON.parse(localStorage.getItem(`contadorPoderes:${nome}`));
  const nEfeitos = JSON.parse(localStorage.getItem(`contadorEfeitos:${nome}`));
  const nModiifcadores = JSON.parse(localStorage.getItem(`contadorModificadores:${nome}`));

  const listaPoderes = document.getElementById("lista-poderes");
  listaPoderes.innerHTML = "";

  contadorPoderes = 0;
  contadorEfeitos = [];
  contadorModificadores = [];

  for (let i = 0; i < nPoderes; i++) {
    adicionarPoder();
    for (let j = 0; j < nEfeitos[i+1]; j++) {
      adicionarEfeito(i+1);
      for (let k = 0; k < nModiifcadores[i+1][j+1]; k++) {
        adicionarModificadores(i+1, j+1);
      }
    }
  }

  Object.keys(dados).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = dados[id];
  });

  document.getElementById("pagina").innerHTML = nome;
  document.getElementById("listaFichas").value = nome;
  recalcularTudo();
}

function deletarFicha() {

  const nome = document.getElementById("personagem").value;

  localStorage.removeItem(`ficha:${nome}`);
  localStorage.removeItem(`contadorVantagens:${nome}`);

  const index = getIndex().filter(n => n !== nome);
  saveIndex(index);

  carregarIndex();
}

function limparFicha() {
  // limpa inputs, selects e textareas
  document.querySelectorAll("input, textarea, select").forEach(el => {

    // não limpa botões, file inputs ou readonly calculados
    if (
      el.type === "button" ||
      el.type === "submit" ||
      el.type === "file" ||
      el.readOnly ||
      el.classList.contains("personalizacao") ||
      el.classList.contains("config")
    ) return;

    if (el.tagName === "SELECT") {
      el.selectedIndex = 0;
    } else {
      el.value = "";
    }
  });

  contadorVantagens = 0;
  const listaVantagens = document.getElementById("lista-vantagens");
  listaVantagens.innerHTML = "";

  contadorModificadores = [];
  contadorEfeitos = [];
  contadorPoderes = 0;
  const listaPoderes = document.getElementById("lista-poderes");
  listaPoderes.innerHTML = "";

  // limpa seleção de ficha
  const lista = document.getElementById("listaFichas");
  if (lista) lista.value = "selecionar";

  // recalcula campos automáticos
  if (typeof recalcularTudo === "function") {
    recalcularTudo();
  }

  document.getElementById("pagina").innerHTML = "Ficha de Personagem";
}

carregarIndex();