
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