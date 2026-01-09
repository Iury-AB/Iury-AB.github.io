
function calcularTotalAtributo(hab, grad, def, ot){
  const habilidade = Number(document.getElementById(hab).value) || 0;
  const graduacao = Number(document.getElementById(grad).value) || 0;
  const outros = Number(document.getElementById(ot).value) || 0;

  document.getElementById(def).value = habilidade + graduacao + outros
}

function copiaValor(fonte, destino) {
  const valorFonte = Number(document.getElementById(fonte).value) || 0;
  document.getElementById(destino).value = valorFonte;
}

function npLimit(limitWith, limitedStat){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const res = document.getElementById(limitWith).value;

  document.getElementById(limitedStat).value = parseInt(2*NP-res);
}

function limitePericia(pericia){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const hab = Number(document.getElementById(`${pericia}-hab`).value) || 0;
  const outros = Number(document.getElementById(`${pericia}-outros`).value) || 0;

  let limite = NP+10 - hab - outros;
  document.getElementById(`${pericia}-max`).value = limite;
}

function limiteCombate(acerto){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const hab = Number(document.getElementById(`${acerto}-hab`).value) || 0;
  const outros = Number(document.getElementById(`${acerto}-outros`).value) || 0;

  let limite = NP*2 - hab - outros;
  document.getElementById(`${acerto}-max`).value = limite;
}

function limitResistencia(){
  const NP = Number(document.getElementById("nivelPoder").value) || 0;
  const aparar = Number(document.getElementById("aparar-total").value) || 0;
  const esquiva = Number(document.getElementById("esquiva-total").value) || 0;
  let valorDefesa = 0;
  if (esquiva > aparar) {
    valorDefesa= esquiva;
  }
  else{
    valorDefesa = aparar;
  }

  document.getElementById("resistencia-max").value = 2*NP-valorDefesa;
}

function recalcularTudo() {
  filtrarTabela("skills-table");
  calcularTotalAtributo("agilidade","esquiva-grad","esquiva-total","esquiva-outros");
  calcularTotalAtributo("luta","aparar-grad","aparar-total","aparar-outros");
  calcularTotalAtributo("vigor","fortitude-grad","fortitude-total","fortitude-outros");
  calcularTotalAtributo("vigor","resistencia-grad","resistencia-total","resistencia-outros");
  calcularTotalAtributo("prontidao","vontade-grad","vontade-total","vontade-outros");
  npLimit("resistencia-total","esquiva-max");
  npLimit("resistencia-total","aparar-max");
  npLimit("fortitude-total","vontade-max");
  npLimit("vontade-total","fortitude-max");
  npLimit("fortitude-total","vontade-max");
  limitResistencia();
  
  const pericias = {
    acrobacia: "agilidade",
    atletismo: "forca",

    ccc1: "luta",        // Combate Corpo-a-Corpo
    ccc2: "luta",
    ccc3: "luta",

    cad1: "destreza",   // Combate à Distância
    cad2: "destreza",
    cad3: "destreza",

    enganacao: "presenca",

    especialidade1: "intelecto",
    especialidade2: "intelecto",
    especialidade3: "intelecto",
    especialidade4: "intelecto",

    furtividade: "agilidade",
    intimidacao: "presenca",
    intuicao: "prontidao",
    investigacao: "intelecto",
    percepcao: "prontidao",
    persuasao: "presenca",
    prestidigitacao: "destreza",
    tecnologia: "intelecto",
    tratamento: "intelecto",
    veiculos: "destreza"
  };

  Object.entries(pericias).forEach(([pericia, atributo]) => {
    copiaValor(atributo, `${pericia}-hab`);

    if(["ccc1","ccc2","ccc3","cad1","cad2","cad3"].includes(pericia)){
      limiteCombate(pericia);
    } else {
      limitePericia(pericia);
    }
    
    calcularTotalAtributo(
      `${pericia}-hab`,
      `${pericia}-grad`,
      `${pericia}-total`,
      `${pericia}-outros`,
      atributo
    );
  });

  const corrupcao = document.getElementById("corrupcao");
  const max = document.getElementById("corrupcao-maximo");

  despertar();
  atualizarBarra(corrupcao, max);
  calcularBonusClasse();
  calcularVida();
  calcularEstamina();
  contarVantagens();
  calcularCustoHabilidades();
  calcularCustoDefesas();
  calcularCustoVantagens();
  calcularCustoPericias();
  calcularCustoPoderes();
  calcularTotalPontos();
}

function despertar () {
  const corrupcao = Number(document.getElementById("corrupcao").value) || 0;
  const despertarArquetipo = document.getElementById("despertar");
  if (corrupcao >= 50) {
    despertarArquetipo.style.display = "flex";
  } else {
    despertarArquetipo.style.display = "none";
  }
}

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("dependente")) {
    recalcularTudo();
  }
});


