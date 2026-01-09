function personalizar () {
  trocaTema();
  trocaCor();
}

function salvarPersonalizacao () {
  const dados = {};

  document.querySelectorAll(".personalizacao:checked").forEach(el => {
    if (el.id){
      dados[el.name] = el.value;
    }
  });

  localStorage.setItem(`tema-ficha-hoffens`, JSON.stringify(dados));
}

function carregarPersonalizacao() {
  const dados = JSON.parse(localStorage.getItem("tema-ficha-hoffens"));
  if (!dados) return;

  Object.entries(dados).forEach(([name, value]) => {
    const radio = document.querySelector(
      `.personalizacao[name="${name}"][value="${value}"]`
    );

    if (radio) {
      radio.checked = true;
    }
  });

  const fundoSalvo = localStorage.getItem("fundo-personalizado");
  if (fundoSalvo) {
    document.body.style.backgroundImage = `url("${fundoSalvo}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  personalizar();
}

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("personalizacao")) {
    personalizar();salvarPersonalizacao();
  }
});

function trocaTema () {
  const selecionado = document.querySelector('input[name="tema"]:checked');

  var root = document.querySelector(':root');

  if (selecionado.value == "escuro") {
    root.style.setProperty('--cor-tema-menu', '#202020');
    root.style.setProperty('--cor-tema-menu-extra', '#303030');
    root.style.setProperty('--cor-tema-fundo', '#181818');
    root.style.setProperty('--cor-tema-letras', 'rgb(255, 255, 255)');
    root.style.setProperty('--cor-borda', 'rgb(88, 88, 88)');

    document.querySelectorAll("img").forEach(imagem => {
      imagem.classList.remove("nao-invertido");
      imagem.classList.add("invertido");
    });
  }
  else if(selecionado.value == "claro") {
    root.style.setProperty('--cor-tema-menu', '#ffffffff');
    root.style.setProperty('--cor-tema-menu-extra', '#ebebebff');
    root.style.setProperty('--cor-tema-fundo', '#f0f0f0ff');
    root.style.setProperty('--cor-tema-letras', '#181818');
    root.style.setProperty('--cor-borda', 'rgba(179, 179, 179, 1)');

    document.querySelectorAll("img").forEach(imagem => {
      imagem.classList.remove("invertido");
      imagem.classList.add("nao-invertido");
    });
  }
}

function trocaCor () {
  const selecionado = document.querySelector('input[name="cor"]:checked');

  var root = document.querySelector(':root');

  if (selecionado.value == "azul-claro") {
    root.style.setProperty('--cor-primaria', '#7ab3e1');
    root.style.setProperty('--cor-secundaria', '#5a7bfe');
    root.style.setProperty('--cor-campo', '#7bb5ee80');
    root.style.setProperty('--cor-sub', '#7bb5ee');
  }
  else if (selecionado.value == "laranja") {
    root.style.setProperty('--cor-primaria', '#ffa76dff');
    root.style.setProperty('--cor-secundaria', '#ff893aff');
    root.style.setProperty('--cor-campo', '#ffa76d80');
    root.style.setProperty('--cor-sub', '#ff9955ff');
  }
  else if (selecionado.value == "amarelo") {
    root.style.setProperty('--cor-primaria', '#ffee2eff');
    root.style.setProperty('--cor-secundaria', '#f7bd00ff');
    root.style.setProperty('--cor-campo', '#eee04780');
    root.style.setProperty('--cor-sub', '#ecde40ff');
  }
  else if (selecionado.value == "vermelho") {
    root.style.setProperty('--cor-primaria', '#ff414eff');
    root.style.setProperty('--cor-secundaria', '#f51a29ff');
    root.style.setProperty('--cor-campo', '#ff677142');
    root.style.setProperty('--cor-sub', '#ff3442ff');
  }
  else if (selecionado.value == "verde") {
    root.style.setProperty('--cor-primaria', '#0dc700ff');
    root.style.setProperty('--cor-secundaria', '#108009');
    root.style.setProperty('--cor-campo', '#11800979');
    root.style.setProperty('--cor-sub', '#20b416ff');
  }
  else if (selecionado.value == "roxo") {
    root.style.setProperty('--cor-primaria', '#dc2ff3ff');
    root.style.setProperty('--cor-secundaria', '#982296');
    root.style.setProperty('--cor-campo', '#bd34baa1');
    root.style.setProperty('--cor-sub', '#ad0babff');
  }
  else if (selecionado.value == "rosa") {
    root.style.setProperty('--cor-primaria', '#ff68d2ff');
    root.style.setProperty('--cor-secundaria', '#ff2ca0ff');
    root.style.setProperty('--cor-campo', '#ffa4dc75');
    root.style.setProperty('--cor-sub', '#ff6c9fff');
  }
}

function trocarFundo(event) {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64 = e.target.result;

    document.body.style.backgroundImage = `url("${base64}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top";
    document.body.style.backgroundRepeat = "no-repeat";

    localStorage.setItem("fundo-personalizado", base64);
  };

  reader.readAsDataURL(arquivo);
}

function removerFundo () {
  document.body.style.backgroundImage='';
  localStorage.removeItem("fundo-personalizado");
}

carregarPersonalizacao();
personalizar();