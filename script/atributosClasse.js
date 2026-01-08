
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