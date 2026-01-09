
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("dependente")) {
    recalcularTudo();
  }
});

document.addEventListener("input", function (e) {
  if (e.target.classList.contains("config")) {
    salvarConfig();
  }
});

carregarConfig();

carregarIndex();
