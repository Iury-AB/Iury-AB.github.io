
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

