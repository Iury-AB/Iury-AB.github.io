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
