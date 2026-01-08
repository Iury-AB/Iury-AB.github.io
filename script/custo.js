
function calcularCustoHabilidades () {
  let custoHabilidade = 0;
  document.querySelectorAll(".habilidade").forEach(habilidade => {
    const nivel = Number(habilidade.value) || 0;
    custoHabilidade += nivel * 2;
  });

  document.getElementById("total-pontos-habilidades").value = custoHabilidade;
}

function calcularCustoDefesas () {
  let custoDefesas = 0;
  document.querySelectorAll(".defesa").forEach(defesa => {
    const nivel = Number(defesa.value) || 0;
    custoDefesas += nivel;
  });

  document.getElementById("total-pontos-defesas").value = custoDefesas;
}

function custoPoder (poder) {
  let custoPoder = 0;
  const poderEl = document.getElementById(`poder-${poder}`);
  if(!poderEl) return 0;
  
  const listaEfeitos = poderEl.querySelector(".lista-efeitos");
  const efeitos = listaEfeitos.querySelectorAll(".efeitos-linha");
  
  efeitos.forEach(efeito => {
    
    const nivel = Number(efeito.querySelector("input[name='lvl-efeito']").value) || 0;
    var custoPorNivel = Number(efeito.querySelector("input[name='custo-efeito']").value) || 0;
    var fixo = 0;
    
    const modificadores = efeito.querySelectorAll(".modificadores-linha");
    modificadores.forEach(modificador => {
      
      const tipoModif = modificador.querySelector("select[name='tipo-modificador']");
      if(!tipoModif) return;
      const custoModif = Number(modificador.querySelector("input[name='custo-modificador']").value) || 0;

      if (tipoModif.value =="por-nivel") {
        custoPorNivel += custoModif;
      } else {
        fixo += custoModif;
      }
    });
    const custoEfeito = custoPorNivel * nivel + fixo;
    efeito.querySelector("input[name='pontos-efeito']").value = custoEfeito;

    custoPoder += custoEfeito;
  });

  return custoPoder;
}

function calcularCustoPoderes () {
  let custoPoderes = 0;
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const custo = custoPoder(poder);
    document.getElementById(`pontos-poder-${poder}`).value = custo;
    custoPoderes += custo;
  }
  document.getElementById("total-pontos-poderes").value = custoPoderes;
}

function calcularCustoPericias () {
  let custoPericias = 0;
  document.querySelectorAll(".pericia").forEach(pericia => {
    const nivel = Number(pericia.value) || 0;
    custoPericias += Math.ceil(nivel/2);
  });

  document.getElementById("total-pontos-pericias").value = custoPericias;
}

function calcularTotalPontos () {
  let custoPontos = 0;

  const pontosHab = Number(document.getElementById("total-pontos-habilidades").value);
  const pontosVan = Number(document.getElementById("total-pontos-vantagens").value);
  const pontosPer = Number(document.getElementById("total-pontos-pericias").value);
  const pontosDef = Number(document.getElementById("total-pontos-defesas").value);

  custoPontos = pontosHab + pontosVan + pontosDef + pontosPer;

  const totalPersonagem = document.getElementById("total-personagem");
  totalPersonagem.value = custoPontos;

  const pontosTotal = document.getElementById("totalPontos");

  document.getElementById("total-pontos").value = Number(pontosTotal.value) || 0;

  var pontosRestantes = Number(pontosTotal.value) - Number(totalPersonagem.value);

  document.getElementById("restando-pontos").value = pontosRestantes;
}
