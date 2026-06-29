# Entretenimento Família Wang — Como configurar

Você recebeu 4 arquivos: `index.html`, `manifest.json`, `sw.js`, `apps-script.gs`.
Coloque os 3 primeiros na mesma pasta. O `.gs` não vai na pasta — ele é colado direto no Google Apps Script (passo 2).

## 1. Login oficial do Google (sem senha)

Em vez de pedir e-mail/senha do Google (o que seria igual a um golpe de phishing), o app usa o
botão oficial "Entrar com Google". Ele só recebe nome, e-mail e foto — nunca a senha.

1. Acesse https://console.cloud.google.com/ e crie um projeto (gratuito).
2. Vá em "APIs e Serviços" > "Tela de consentimento OAuth" e configure como "Externo", com o nome do app.
3. Vá em "Credenciais" > "Criar credenciais" > "ID do cliente OAuth" > tipo "Aplicativo da Web".
4. Em "Origens JavaScript autorizadas", coloque o endereço onde o app vai ficar hospedado (ex: `https://seudominio.com` ou, em testes locais, `http://localhost`).
5. Copie o "Client ID" gerado e cole no `index.html`, na linha:
   ```
   const GOOGLE_CLIENT_ID = "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com";
   ```

Enquanto isso não for feito, o app mostra um botão alternativo "Entrar só com meu nome", que funciona localmente sem login do Google.

## 2. Planilha Google compartilhada (login, palpites, amigo oculto)

1. Crie uma Planilha Google nova (sheets.new).
2. Menu "Extensões" > "Apps Script".
3. Apague o código de exemplo e cole o conteúdo do arquivo `apps-script.gs`.
4. Clique em "Implantar" (canto superior direito) > "Nova implantação".
5. Tipo: "App da Web". Executar como: "Eu". Quem pode acessar: "Qualquer pessoa".
6. Autorize as permissões pedidas (é a sua própria planilha).
7. Copie a URL que termina em `/exec` e cole no `index.html`:
   ```
   const APPS_SCRIPT_URL = "https://script.google.com/macros/s/SEU_ID_AQUI/exec";
   ```

A planilha vai ganhar automaticamente as abas "Logins", "Bolao" e "AmigoOculto" conforme a família for usando o app.

## 3. Foto da família

A foto já está aplicada (`familia-wang.png`), aparecendo maior, na frente do círculo, com uma animação de zoom ao carregar a tela. Para trocar por outra foto no futuro, basta substituir o arquivo `familia-wang.png` (mantendo o fundo transparente, se possível) por outro com o mesmo nome, ou trocar o nome do arquivo na linha:
```html
<img class="foto-familia-frente" src="familia-wang.png" alt="Família Wang">
```
Se quiser ajustar o tamanho do "zoom", altere `width:280px` na classe `.foto-familia-frente` no CSS.

## 4. Dados dos jogos da Copa do Mundo 2026

O app já busca os jogos automaticamente da base pública e gratuita **openfootball/worldcup.json**
(sem necessidade de chave de API): cobre a Copa 2026 inteira, com placares atualizados conforme
o repositório é atualizado (não é em tempo real durante a partida — atualiza algumas vezes ao dia).

Se no futuro vocês quiserem placares ao vivo minuto a minuto, é possível trocar essa fonte por uma
API paga como API-Football ou Sportmonks, mas isso exige uma chave própria e, geralmente, um pequeno
servidor para esconder essa chave (ela não pode ficar exposta dentro do HTML).

## 5. Hospedar como PWA

Qualquer hospedagem de arquivos estáticos serve: GitHub Pages, Netlify, Vercel, ou até o Google Drive
com um serviço como Netlify Drop. O importante é que os 3 arquivos (`index.html`, `manifest.json`, `sw.js`)
estejam na mesma pasta e acessíveis por **HTTPS** (obrigatório para o "Entrar com Google" e para o PWA
funcionar). Depois de hospedado, ao abrir o link no celular, aparecerá a opção "Adicionar à tela inicial".

## Sobre o "Bolão"

A aba foi montada como um bolão de **pontos e diversão**, sem dinheiro envolvido — cada um registra seu
palpite de placar e depois vocês comparam com o resultado real. Não inclui apostas com valores em dinheiro,
odds ou qualquer mecanismo de transação financeira.
