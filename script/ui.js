function abrirMenu(menu) {
  document.querySelectorAll("#menu-ajustes .menu.show")
    .forEach(m => m.menu !== menu && m.classList.remove("show"));

  document.getElementById(menu).classList.toggle("show");
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
