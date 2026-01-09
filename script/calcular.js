
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

////////////////////////////////


function atualizarBarra(corrupcao, max) {
  const valor = Number(corrupcao.value) || 0;
  const limite = Number(max.value) || 1;

  const percentual = Math.max(0, Math.min(1, (valor / limite)));

  barra.style.width = percentual*100 + "%";

  if(percentual < 0.5){
    barra.style.background = `rgb(0,0,${255-510*percentual})`;
  }else if(percentual >= 0.5 && percentual < 1){
    barra.style.background = `rgb(${(2*percentual-0.5)*255}, 0, 0)`;
  }else if(percentual >= 1){
    barra.style.background = "rgb(255,0,0)";
  }
}

function calcularVida () {
  const vigor = document.getElementById("vigor").value;
  var vida = 0;
  if (vigor == 0) {
    vida = 5;
  }
  else if (vigor == 1){
      vida = "10";
  }
  else if (vigor == 2){
      vida = "20";
  }
  else if (vigor == 3){
      vida = "40";
  }
  else if (vigor == 4){
      vida = "60";
  }
  else if (vigor == 5){
      vida = "100";
  }
  else if (vigor == 6){
      vida = "140";
  }
  else if (vigor == 7){
      vida = "180";
  }
  else if (vigor == 8){
      vida = "230";
  }
  else if (vigor == 9){
      vida = "280";
  }
  else if (vigor == 10){
      vida = "330";
  }
  else if (vigor == 11){
      vida = "390";
  }
  else if (vigor == 12){
      vida = "450";
  }
  else if (vigor == 13){
      vida = "510";
  }
  else if (vigor == 14){
      vida = "570";
  }
  else if (vigor == 15){
      vida = "630";
  }
  else if (vigor == 16){
      vida = "700";
  }
  else if (vigor == 17){
      vida = "770";
  }
  else if (vigor == 18){
      vida = "840";
  }
  else if (vigor == 19){
      vida = "910";
  }
  else if (vigor == 20){
      vida = "980";
  }
  else if (vigor == 21){
      vida = "1050";
  }
  else if (vigor == 22){
      vida = "1120";
  }
  else if (vigor == 23){
      vida = "1190";
  }
  else if (vigor == 24){
      vida = "1260";
  }
  else if (vigor == 25){
      vida = "1330";
  }
  else if (vigor == 26){
      vida = "1440";
  }
  else if (vigor == 27){
      vida = "1470";
  }
  else if (vigor == 28){
      vida = "1540";
  }
  else if (vigor == 29){
      vida = "1610";
  }
  else if (vigor == 30){
      vida = "1680";
  }
  else {
      vida = "0";
  }

  const vida_extra = Number(document.getElementById("vida-outros").value) || 0;
  const vida_classe = Number(document.getElementById("vida-classe").value) || 0;
  document.getElementById("vida").value = Number(vida) + vida_extra + vida_classe;
}

function calcularEstamina() {
  const vida = document.getElementById("vida").value;
  const vida_num = Number(vida) || 0;

  var estamina = Math.floor(vida_num/2);

  const estamina_extra = Number(document.getElementById("estamina-outros").value) || 0;
  const estamina_classe = Number(document.getElementById("estamina-classe").value) || 0;

  document.getElementById("estamina").value = estamina + estamina_classe + estamina_extra;
}

function calcularBonusClasse() {
  const classe = document.getElementById("classe").value;
  const corrupcao = Number(document.getElementById("corrupcao").value);
  var vidaBonus = 0;
  var estaminaBonus = 0;
  
  if (classe == "Atirador") {
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 3;
      estaminaBonus = estaminaBonus + 4;
    }
  }else if (classe == "Belico"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 45) {
        vidaBonus = vidaBonus + 5;
        estaminaBonus = estaminaBonus + 3;
    }
      if (corrupcao >= 55) {
        vidaBonus = vidaBonus + 5;
        estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 5;
      estaminaBonus = estaminaBonus + 3;
    }
  }else if (classe == "Guardiao"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 7;
      estaminaBonus = estaminaBonus + 2;
    }
  }else if (classe == "Ajudante"){
    if(corrupcao >= 15) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 25) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if(corrupcao >= 35) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 45) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 55) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
    if (corrupcao >= 65) {
      vidaBonus = vidaBonus + 2;
      estaminaBonus = estaminaBonus + 3;
    }
  }

  document.getElementById("vida-classe").value = vidaBonus;
  document.getElementById("estamina-classe").value = estaminaBonus;

}


function abrirMenu(menu) {
  document.querySelectorAll("#menu-ajustes .menu.show")
    .forEach(m => m.menu !== menu && m.classList.remove("show"));

  document.getElementById(menu).classList.toggle("show");
}

document.addEventListener("click", function (event) {

  // todos os menus abertos (principal + submenus)
  const menusAbertos = document.querySelectorAll(".menu.show");
  const botoesMenu = document.querySelectorAll(".botao-menu");

  // se não há menus abertos, não faz nada
  if (menusAbertos.length === 0) return;

  // clicou em QUALQUER botão de menu? não fecha
  for (const botao of botoesMenu) {
    if (botao.contains(event.target)) {
      return;
    }
  }

  // clicou dentro de QUALQUER menu aberto? não fecha
  for (const menu of menusAbertos) {
    if (menu.contains(event.target)) {
      return;
    }
  }

  // clicou fora de tudo → fecha todos os menus
  menusAbertos.forEach(menu => menu.classList.remove("show"));
});


function salvarConfig () {
  const dados = {};

  document.querySelectorAll(".config").forEach(el => {
    if (el.id){
      if(el.type == "text"){
        dados[el.id] = el.value;
      }
      else if(el.type="checkbox"){
        dados[el.id] = el.checked;
      }
    }
  });

  localStorage.setItem(`config-ficha-hoffens`, JSON.stringify(dados));
}

function carregarConfig() {
  const dados = JSON.parse(localStorage.getItem("config-ficha-hoffens"));
  if (!dados) return;

  Object.entries(dados).forEach(([id, value]) => {
    const field = document.getElementById(id);

    if (field.type == "text") {
      field.value = value;
    }
    else if (field.type == "checkbox") {
      field.checked = value;
    }
  });
}

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("config")) {
    salvarConfig();
  }
});

carregarConfig();


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

let contadorModificadores = [];

function adicionarModificadores(poder, efeito) {

  contadorModificadores[poder][efeito]++;

  const listaModificadores = document.getElementById(`efeito-${poder}-${efeito}`);
  if (contadorModificadores[poder][efeito] == 1) {
    const cabecalho = document.createElement("div");
    cabecalho.className = "modificadores-linha span-5";
    cabecalho.innerHTML = `
      <br>
      <label for="">Custo</label>
      <label for="">Tipo</label>
      <label for="">Modificador</label>
    `;
    listaModificadores.appendChild(cabecalho);
  }

  const novaLinha = document.createElement("div");
  novaLinha.className = "modificadores-linha span-5";
  novaLinha.innerHTML = `
    <br>
    <input type="number" id="custo-modificador-${poder}-${efeito}-${contadorModificadores[poder][efeito]}" name="custo-modificador" class="dependente">
    <select name="tipo-modificador" id="tipo-modificador-${poder}-${efeito}-${contadorModificadores[poder][efeito]}" class="dependente">
      <option value="por-nivel">Por Nível</option>
      <option value="fixo-por-nivel">Fixo por Nível</option>
      <option value="fixo">Fixo</option>
    </select>
    <input type="text" id="nome-modificador-${poder}-${efeito}-${contadorModificadores[poder][efeito]}" name="nome-modificador" placeholder="Modificador ${contadorModificadores[poder][efeito]} do efeito ${efeito}">
  `;

  listaModificadores.appendChild(novaLinha);
}

let contadorEfeitos = [];

function adicionarEfeito(poder) {
  contadorEfeitos[poder]++;
  contadorModificadores[poder][contadorEfeitos[poder]] = 0;

  const listaEfeitos = document.getElementById(`lista-efeitos-${poder}`);

  const novoEfeito = document.createElement("div");
  novoEfeito.className = "efeitos-linha";
  novoEfeito.id = `efeito-${poder}-${contadorEfeitos[poder]}`;
  novoEfeito.innerHTML = `
    <button class="botao-img" onclick="adicionarModificadores(${poder},${contadorEfeitos[poder]})" title="Adicionar Modificador ao Efeito ${contadorEfeitos[poder]} do Poder ${poder}">
      <img src="img/modificador.png" alt="Adicionar modificador">
    </button>
    <button class="botao-rolar" onclick="rolarPoderPersonalizado(${poder}, ${contadorEfeitos[poder]})">
      <img src="img/d20.png" alt="Rolar teste de Poder" id="teste-efeito-${poder}-${contadorEfeitos[poder]}">
    </button>
    <input type="number" name="lvl-efeito" id="lvl-efeito-${poder}-${contadorEfeitos[poder]}" class="dependente">
    <input type="number" name="custo-efeito" id="custo-efeito-${poder}-${contadorEfeitos[poder]}" class="dependente">
    <input type="text" name="nome-efeito" id="nome-efeito-${poder}-${contadorEfeitos[poder]}" placeholder="Efeito ${contadorEfeitos[poder]}">
    <div class="small-number">
      <input type="number" id="pontos-efeito-${poder}-${contadorEfeitos[poder]}" name="pontos-efeito"  style="font-size: 20px;" readonly>
    </div>
  `;

  listaEfeitos.appendChild(novoEfeito);
  trocaTema();
}

function removerEfeitos(poder) {
  const poderLinha = document.getElementById(`poder-${poder}`);

  poderLinha.querySelectorAll('input[name="nome-efeito"]').forEach(efeito => {
    let efeitoN = efeito.id.at(-1) ;
    const linha = efeito.closest(".efeitos-linha");
    if (efeito.value.trim() === "") {
      if (linha) {
        linha.remove();
        contadorEfeitos[poder]--;
      }
    } else if (linha){
      linha.querySelectorAll('input[name="nome-modificador"]').forEach(modificador => {
        if (modificador.value.trim() == "") {
          const modificadorLinha = modificador.closest(".modificadores-linha");
          if (modificadorLinha) {
            modificadorLinha.remove();
            contadorModificadores[poder][efeitoN]--;
          }
        }
      });
      if (contadorModificadores[poder][efeitoN] == 0) {
        const cabecalho = linha.querySelector(".modificadores-linha");
        if (cabecalho) {
          cabecalho.remove();
        }
      }
    }
  });

  const linhas = poderLinha.querySelectorAll(".efeitos-linha");

  linhas.forEach((linhaEfeito, indexEfeito) => {

    const lvl = linhaEfeito.querySelector('input[name="lvl-efeito"]');
    const custo = linhaEfeito.querySelector('input[name="custo-efeito"]');
    const nome = linhaEfeito.querySelector('input[name="nome-efeito"]');

    if (lvl) {
      lvl.id = `lvl-efeito-${poder}-${indexEfeito}`;
    }

    if (custo) {
      custo.id = `custo-efeito-${poder}-${indexEfeito}`;
    }

    if (nome) {
      nome.id = `nome-efeito-${poder}-${indexEfeito}`;
      nome.placeholder = `Efeito ${indexEfeito}`;
    }

    const linhasModif = linhaEfeito.querySelectorAll(".modificadores-linha");

    linhasModif.forEach((linhaModificador, indexModificador) => {

      const custoM = linhaModificador.querySelector('input[name="custo-modificador"]');
      const tipoM = linhaModificador.querySelector('select[name="tipo-modificador"]');
      const nomeM = linhaModificador.querySelector('input[name="nome-modificador"]');

      if(custoM) {
        custoM.id = `custo-modificador-${poder}-${indexEfeito}-${indexModificador}`;
      }

      if (tipoM) {
        tipoM.id = `tipo-modificador-${poder}-${indexEfeito}-${indexModificador}`;
      }

      if (nomeM) {
        nomeM.id = `nome-modificador-${poder}-${indexEfeito}-${indexModificador}`;
        nomeM.placeholder = `Modificador ${indexModificador} do efeito ${indexEfeito}`;
      }
    });
  });
}

let contadorPoderes = 0;

function adicionarPoder() {
  contadorPoderes++;
  contadorEfeitos[contadorPoderes] = 0;
  contadorModificadores[contadorPoderes] = [];

  const listaPoderes = document.getElementById("lista-poderes");

  const novoPoder = document.createElement("div");
  novoPoder.className = "poder-linha";
  novoPoder.id = `poder-${contadorPoderes}`;

  novoPoder.innerHTML = `
    <div class="span-2" style="display: flex;">
      <button title="Ocultar Efeitos do Poder" class="botao-img mostrar-poder" onclick="ocultarDetalhesPoder(${contadorPoderes})" id="mostrar-poder-${contadorPoderes}">
        <img src="img/mais.png" alt="Mostrar Efeitos" class="toggle-show">
      </button>
      <input type="text" id="nome-poder-${contadorPoderes}" placeholder="Nome do Poder ${contadorPoderes}" class="nome-poder">
      <button class="botao-img apagar-poder" title="Apagar Poder ${contadorPoderes}" onclick="removerPoder(${contadorPoderes})" id="apagar-poder-${contadorPoderes}">
        <img src="img/delete.png" alt="Apagar Poder">
      </button>
    </div>
    
    <div class="efeitos-modificadores">
      <div class="efeitos-linha">
        <label for="">Modif.</label>
        <br>
        <label for="">LVL</label>
        <label for="">Custo</label>
        <label for="">Efeito</label>
        <br>
      </div>

      <div id="lista-efeitos-${contadorPoderes}" style="max-height: 200px; overflow-y: auto;" class="lista-efeitos">
      </div>

      <div style="justify-self: center; display: flex;">
        <button class="botao-img adicionar-efeito" title="Adicionar Efeito ao Poder ${contadorPoderes}" onclick="adicionarEfeito(${contadorPoderes})" style="width: 50%;" id="adicionar-efeito-${contadorPoderes}">
          <img src="img/adicionar.png" alt="Adicionar Efeito">
        </button>

        <button class="botao-img remover-efeito" title="Remover Efeitos e Modificadores Vazios do Poder ${contadorPoderes}" onclick="removerEfeitos(${contadorPoderes})" style="width: 50%;" id="remover-efeito-${contadorPoderes}">
          <img src="img/remover.png" alt="Remover Efeitos Vazios">
        </button>
      </div>
    </div>

    <div class="descricao-poder">
      <label for="">
        Descrição
      </label>
      <textarea name="descricao-poder" id="descricao-poder-${contadorPoderes}" placeholder="Descrição do poder ${contadorPoderes}"></textarea>
      <div class="small-number" style="display: flex; align-items: center;">
        <label for="pontos-poder-${contadorPoderes}">Total de Pontos:</label>
        <input type="number" id="pontos-poder-${contadorPoderes}" style="font-size: 20px; width: 20px" readonly>
      </div>
    </div>
  `;

  listaPoderes.appendChild(novoPoder);
  trocaTema();
}

function removerPoder (poder) {
  const poderRemover = document.getElementById(`poder-${poder}`);
  if(poderRemover) {
    poderRemover.remove();
    contadorModificadores.splice(poder,1);
    contadorEfeitos.splice(poder,1);
    contadorPoderes--;
  }

  const poderes = document.querySelectorAll(".poder-linha");
  
  poderes.forEach((linhaPoder, indexPoder) => {
    const mostrarPoder = linhaPoder.querySelector(".mostrar-poder");
    const nomePoder = linhaPoder.querySelector(".nome-poder");
    const apagarPoder = linhaPoder.querySelector(".apagar-poder");
    const listaEfeitos = linhaPoder.querySelector(".lista-efeitos");
    const addEfeito = linhaPoder.querySelector(".adicionar-efeito");
    const remEfeito = linhaPoder.querySelector(".remover-efeito");
    const descricaoPoder = linhaPoder.querySelector("textarea[name='descricao-poder']");

    linhaPoder.id = `poder-${indexPoder+1}`;
    
    if (mostrarPoder) {
      mostrarPoder.id = `mostrar-poder-${indexPoder+1}`;
      mostrarPoder.onclick = () => ocultarDetalhesPoder(indexPoder+1);
    }
    if (nomePoder) {
      nomePoder.id = `nome-poder-${indexPoder+1}`;
      nomePoder.placeholder = `Nome do Poder ${indexPoder+1}`;
    }
    if (apagarPoder) {
      apagarPoder.id = `apagar-poder-${indexPoder+1}`;
      apagarPoder.onclick = () => removerPoder(indexPoder+1);
      apagarPoder.title = `Apagar Poder ${indexPoder+1}`;
    }
    if (listaEfeitos) {
      listaEfeitos.id = `lista-efeitos-${indexPoder+1}`;
    }
    if (addEfeito) {
      addEfeito.id = `adicionar-efeito-${indexPoder+1}`;
      addEfeito.title = `Adicionar Efeito ao Poder ${indexPoder+1}`;
      addEfeito.onclick = () => adicionarEfeito(indexPoder+1);
    }
    if (remEfeito) {
      remEfeito.id = `remover-efeito-${indexPoder+1}`;
      remEfeito.title = `Remover Efeitos e Modificadores Vazios do Poder ${indexPoder+1}`;
      remEfeito.onclick = () => removerEfeitos(indexPoder+1);
    }
    if (descricaoPoder) {
      descricaoPoder.id = `descricao-poder-${indexPoder+1}`;
      descricaoPoder.placeholder = `Descrição do poder ${indexPoder+1}`
    }

    const linhasEf = linhaPoder.querySelectorAll(".efeitos-linha");

    linhasEf.forEach((linhaEfeito, indexEfeito) => {

      const lvl = linhaEfeito.querySelector('input[name="lvl-efeito"]');
      const custo = linhaEfeito.querySelector('input[name="custo-efeito"]');
      const nome = linhaEfeito.querySelector('input[name="nome-efeito"]');

      if (lvl) {
        lvl.id = `lvl-efeito-${indexPoder+1}-${indexEfeito}`;
      }

      if (custo) {
        custo.id = `custo-efeito-${indexPoder+1}-${indexEfeito}`;
      }

      if (nome) {
        nome.id = `nome-efeito-${indexPoder+1}-${indexEfeito}`;
        nome.placeholder = `Efeito ${indexEfeito}`;
      }

      const linhasModif = linhaEfeito.querySelectorAll(".modificadores-linha");

      linhasModif.forEach((linhaModificador, indexModificador) => {

        const custoM = linhaModificador.querySelector('input[name="custo-modificador"]');
        const tipoM = linhaModificador.querySelector('select[name="tipo-modificador"]');
        const nomeM = linhaModificador.querySelector('input[name="nome-modificador"]');

        if(custoM) {
          custoM.id = `custo-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
        }

        if (tipoM) {
          tipoM.id = `tipo-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
        }

        if (nomeM) {
          nomeM.id = `nome-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
          nomeM.placeholder = `Modificador ${indexModificador} do efeito ${indexEfeito}`;
        }
      });
    });
  });
}

function mudarArquetipo(arquetipo, campo) {
  const imagemArquetipo = document.getElementById(`${campo}-simbolo`);

  if (arquetipo == "elemental") {
    imagemArquetipo.src = "img/elemental_sem_fundo.png";
  } else if (arquetipo == "criacao") {
    imagemArquetipo.src = "img/Criacao_sem_fundo.png";
  } else if (arquetipo == "espacial") {
    imagemArquetipo.src = "img/Espacial_sem_fundo.png";
  } else if (arquetipo == "corporeo") {
    imagemArquetipo.src = "img/Corporeo_sem_fundo.png";
  } else if (arquetipo == "destruicao") {
    imagemArquetipo.src = "img/Destruicao_sem_fundo.png";
  } else if (arquetipo == "nulo") {
    imagemArquetipo.src = "img/nulo_SEM_FUNDO.png";
  } else if (arquetipo == "inversao") {
    imagemArquetipo.src = "img/Inversao_sem_fundo.png";
  }
  
}

function ocultarDetalhesPoder(poderId) {
  const poderEl = document.getElementById(`poder-${poderId}`);
  if (!poderEl) return;

  const botao = document.getElementById(`mostrar-poder-${poderId}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (imgBotao.classList.contains("show")) {
    botao.title = "Mostrar Efeitos do Poder";
  } else {
    botao.title = "Ocultar Efeitos do Poder";
  }

  const elementos = poderEl.querySelectorAll(
    ".efeitos-modificadores, .descricao-poder"
  );

  elementos.forEach(el => {
    el.classList.toggle("hide");
  });
}


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

function enviarRequest(dados, server, canal) {

  const discord = document.getElementById("conectar-discord");
  if (!discord.checked) return;
  
  fetch(server+canal, {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then(json => alert(JSON.stringify(json, null, 2)));

}

function testeAtributo(id, nome) {
  var atributo = Number(document.getElementById(id).value) || 0;
  var rolagem = Math.floor(Math.random() * 20) + 1;

  var resultado = rolagem + atributo;

  const jogador = document.getElementById("usuario-discord").value || "---";
  const servidorDiscord = document.getElementById("servidor-discord").value;

  var dados = {
    [`resultado.${nome}`]: resultado,
    [`Hab.${nome}`]: atributo,
    "discordID": servidorDiscord,
    "Jogador": jogador
  };

  const bot = document.getElementById("bot-discord").value;

  if (servidorDiscord != "") enviarRequest(dados, bot, "/habilidade");
}

function rolarPericiaPersonalizada (pericia) {
  const nomePericia = document.getElementById(pericia).value || "Perícia";
  testeAtributo(pericia+"-total", nomePericia);
}

function rolarPoderPersonalizado (poder, efeito) {
  const nomePoder = document.getElementById(`nome-poder-${poder}`).value || "Teste de Poder";
  const nomeEfeito = document.getElementById(`nome-efeito-${poder}-${efeito}`).value || "Efeito";
  const nomeTeste = `${nomePoder} [${nomeEfeito}]`;
  testeAtributo(`lvl-efeito-${poder}-${efeito}`, nomeTeste);
}


function filtrarTabela(tabela) {
  const filtro = document.getElementById("tableFilter").value.toLowerCase();
  const linhas = document.querySelectorAll(`#${tabela} tbody tr`);

  linhas.forEach(linha => {
    if (linha.classList.contains("header-row")) {
      linha.style.display = "";
      return;
    }

    const texto = linha.textContent.toLowerCase();
    linha.style.display = texto.includes(filtro) ? "" : "none";
  });
}

let contadorVantagens = 0;

function adicionarVantagem() {
  contadorVantagens++;
  
  const listaVantagens = document.getElementById("lista-vantagens");

  const novaLinha = document.createElement("div");
  novaLinha.className = "vantagens-linha";
  novaLinha.innerHTML = `
    <input type="number" id="vantagem${contadorVantagens}-lvl" title="Nível da Vantagem" class="dependente vantagem">
    <select name="tipo" id="vantagem${contadorVantagens}-tipo" class="dependente tipo-vantagem">
      <option value="nenhum"> — Tipo — </option>
      <option value="classe">Classe</option>
      <option value="combate">Combate</option>
      <option value="geral">Geral</option>
      <option value="pericia">Pericia</option>
      <option value="sorte">Sorte</option>
    </select>
    <input type="text" id="vantagem${contadorVantagens}-nome" title="Vantagem ${contadorVantagens}" class="nome-vantagem">
    <button class="botao-img" onclick="mostrarVantagem(${contadorVantagens})" title = "Ocultar Descrição da Vantagem ${contadorVantagens}" id="mostrar-vantagem-${contadorVantagens}">
      <img src="img/mais.png" alt="Mostrar Descrição da Vantagem" class="vantagens-toggle toggle-show">
    </button>
    <textarea name="descricao-vantagem" id="descricao-vantagem-${contadorVantagens}" rows="5" class="span-5" placeholder="Descrição da Vantagem ${contadorVantagens}"></textarea>
  `;
    
  listaVantagens.appendChild(novaLinha);
  trocaTema();
}

function removerVantagens() {
  document.querySelectorAll(".nome-vantagem").forEach(vantagem => {
    if (vantagem.value.trim() === "") {
      const linha = vantagem.closest(".vantagens-linha");
      if (linha) {
        linha.remove();
        contadorVantagens--;
      }
    }
  });

  const linhas = document.querySelectorAll(".vantagens-linha");

  linhas.forEach((linha, index) => {
    const numero = index;

    const lvl = linha.querySelector('input[id$="-lvl"]');
    const tipo = linha.querySelector('select[id$="-tipo"]');
    const nome = linha.querySelector('input[id$="-nome"]');

    if (lvl) {
      lvl.id = `vantagem${numero}-lvl`;
    }

    if (tipo) {
      tipo.id = `vantagem${numero}-tipo`;
    }

    if (nome) {
      nome.id = `vantagem${numero}-nome`;
      nome.title = `Vantagem ${numero}`;
    }
  });

  recalcularTudo();
}

function calcularCustoVantagens () {
  let custoVantagens = 0;
  document.querySelectorAll(".vantagem").forEach(vantagem => {
    const nivel = Number(vantagem.value) || 0;
    custoVantagens += nivel;
  });

  document.getElementById("total-pontos-vantagens").value = custoVantagens;
}

function contarVantagens() {
  const totalClasse = document.getElementById("vantagens-classe");
  const totalCombate = document.getElementById("vantagens-combate");
  const totalGeral = document.getElementById("vantagens-geral");
  const totalPericia = document.getElementById("vantagens-pericia");
  const totalSorte = document.getElementById("vantagens-sorte");

  var classe = 0;
  var combate = 0;
  var geral = 0;
  var pericia = 0;
  var sorte = 0;

  document.querySelectorAll(".tipo-vantagem").forEach(vantagem => {
    if (vantagem.value == "classe") {
      classe++;
    } else if (vantagem.value == "combate") {
      combate++;
    } else if (vantagem.value == "geral") {
      geral++;
    } else if (vantagem.value == "pericia") {
      pericia++;
    } else if(vantagem.value == "sorte") {
      sorte++;
    }
  });

  totalClasse.value = classe;
  totalCombate.value = combate;
  totalGeral.value = geral;
  totalPericia.value = pericia;
  totalSorte.value = sorte;
}

function mostrarVantagem(vantagem) {
  const descricao = document.getElementById(`descricao-vantagem-${vantagem}`);
  if (!descricao) return;

  const botao = document.getElementById(`mostrar-vantagem-${vantagem}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (imgBotao.classList.contains("show")) {
    botao.title = "Mostrar Descrição da Vantagem";
  } else {
    botao.title = "Ocultar Descrição da Vantagem";
  }

  descricao.classList.toggle("hide");
}

