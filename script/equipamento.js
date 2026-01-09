var contadorEquipamento = 0;

function calcularCustoEquipamento () {
  const equipamentos = document.querySelectorAll(".equipamento");
  
  var custoEquipamento = 0;
  equipamentos.forEach(equipamento => {
    const custo = Number(equipamento.value) || 0;
    custoEquipamento += custo;
  });

  const restante = document.getElementById("resta-equipamento");
  const pontosTotal = Number(document.getElementById("pontos-equipamento").value) || 0;
  restante.value = pontosTotal - custoEquipamento;
}

function calcularPontosEquipamento () {
  const nivel = Number(document.getElementById("nivel-equipamento").value) || 0;
  document.getElementById("pontos-equipamento").value = nivel * 5;
}

function adicionarEquipamento () {
  contadorEquipamento++;
  const listaEquipamento = document.getElementById("lista-equipamento");

  const novoEquipamento = document.createElement("div");
  novoEquipamento.className = "linha-equipamento";
  novoEquipamento.innerHTML = `
    <input type="number" id="custo-equipamento-${contadorEquipamento}" class="equipamento dependente" style="text-align: center;" placeholder="Custo">
    <input type="text" id="equipamento-${contadorEquipamento}" name="equipamento-nome" placeholder="Equipamento ${contadorEquipamento}">
  `;

  listaEquipamento.appendChild(novoEquipamento);
}

function removerEquipamento () {
  document.querySelectorAll('input[name="equipamento-nome"]').forEach(equipamento => {
    if (equipamento.value.trim() === "") {
      const linha = equipamento.closest(".linha-equipamento");
      linha.remove();
      contadorEquipamento--;
    }
  });

  const listaEquipamento = document.getElementById("lista-equipamento");
  const linhas = listaEquipamento.querySelectorAll(".linha-equipamento");
  linhas.forEach((linha, index) => {
    const custo = linha.querySelector(".equipamento");
    const nome = linha.querySelector('input[name="equipamento-nome"]');

    if (custo) {
      custo.id = `custo-equipamento-${index+1}`;
    }
    if (nome) {
      nome.id = `equipamento-${index+1}`;
      nome.placeholder = `Equipamento ${index+1}`;
    }
  });

  recalcularTudo();
}