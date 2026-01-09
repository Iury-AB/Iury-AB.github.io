
function calcularTotalAtributo(hab, grad, def, ot){
  const habilidade = Number(document.getElementById(hab).value) || 0;
  const graduacao = Number(document.getElementById(grad).value) || 0;
  const outros = Number(document.getElementById(ot).value) || 0;

  document.getElementById(def).value = habilidade + graduacao + outros
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

function despertar () {
  const corrupcao = Number(document.getElementById("corrupcao").value) || 0;
  const despertarArquetipo = document.getElementById("despertar");
  if (corrupcao >= 50) {
    despertarArquetipo.style.display = "flex";
  } else {
    despertarArquetipo.style.display = "none";
  }
}