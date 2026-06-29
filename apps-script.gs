/*
  CÓDIGO PARA O GOOGLE APPS SCRIPT
  =================================
  Como usar — veja o passo a passo completo no LEIAME.md.
  Resumo:
  1. Crie uma Planilha Google nova.
  2. Nela, vá em Extensões > Apps Script.
  3. Apague o conteúdo padrão e cole este arquivo inteiro.
  4. Clique em "Implantar" > "Nova implantação" > tipo "App da Web".
     - Executar como: Eu (sua conta)
     - Quem pode acessar: Qualquer pessoa
  5. Copie a URL gerada e cole em APPS_SCRIPT_URL no index.html.
*/

function doGet(e) {
  const acao = e.parameter.acao;
  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  if (acao === "bolao_listar") return responder(lerAba(planilha, "Bolao"));
  if (acao === "amigo_listar") return responder(lerAba(planilha, "AmigoOculto"));

  return responder({ erro: "ação desconhecida" });
}

function doPost(e) {
  const dados = JSON.parse(e.postData.contents);
  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  if (dados.acao === "login") {
    escreverLinha(planilha, "Logins", [new Date(), dados.nome, dados.email, dados.via]);
  }
  if (dados.acao === "bolao_salvar") {
    escreverLinha(planilha, "Bolao", [new Date(), dados.nome, dados.email, dados.jogo, dados.palpite]);
  }
  if (dados.acao === "amigo_cadastrar") {
    escreverLinha(planilha, "AmigoOculto", [new Date(), dados.nome, dados.email, dados.valor, dados.data]);
  }

  return responder({ ok: true });
}

function escreverLinha(planilha, nomeAba, linha) {
  let aba = planilha.getSheetByName(nomeAba);
  if (!aba) aba = planilha.insertSheet(nomeAba);
  aba.appendRow(linha);
}

function lerAba(planilha, nomeAba) {
  const aba = planilha.getSheetByName(nomeAba);
  if (!aba) return [];
  const valores = aba.getDataRange().getValues();

  if (nomeAba === "Bolao") {
    return valores.map(l => ({ nome: l[1], jogo: l[3], palpite: l[4] }));
  }
  if (nomeAba === "AmigoOculto") {
    return valores.map(l => ({ nome: l[1], valor: l[3], data: l[4] }));
  }
  return [];
}

function responder(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
