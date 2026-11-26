# Casos de Teste e Evidências

As capturas de tela estão no arquivo `A3-Grupo6-Relatorio-e-Evidencias.pdf`, entregue na plataforma da faculdade, identificadas pelos nomes citados aqui. As saídas dos testes (arquivos `.txt`) estão na pasta `evidencias/`.

**Execuções realizadas**

| Execução | Data | O que foi executado |
|---|---|---|
| 1ª execução | 23/11/2026 | CT01 a CT10 (roteiro) e CT11 a CT14 (exploratório), antes das correções. |
| Reteste | 23/11/2026 | CT01 a CT12 repetidos depois das correções do BUG01 ao BUG05. |
| Revisão | 25/11/2026 | Casos novos CT16 a CT19, antes da correção do BUG06 e do BUG07. |
| Execução final | 25/11/2026 | CT01 a CT19 na versão final, no Microsoft Edge e no Google Chrome. |
| Execução manual | 25/11/2026 | CT01 a CT14 e CT16 a CT19 na versão final, executados à mão por um integrante do grupo. Todos aprovados. |

**Como foi executado:** na execução final, o `index.html` foi aberto direto do disco e um roteiro automatizado de apoio digitou os dados, clicou nos botões e respondeu à janela de confirmação. As capturas são do Edge. A saída de cada caso está em `saida-execucao-final-edge.txt` e `saida-execucao-final-chrome.txt`. Na execução manual, um integrante digitou os dados e respondeu à janela de confirmação, sem novas capturas; no CT18 foi usada só a pesquisa `carlos2`. Na 1ª execução, parte do preenchimento e a resposta da confirmação (CT08 e CT09) também foram feitas por script.

**Sobre o visual das capturas:** depois das correções de 23/11, a tela mudou de cores, fonte e textos (título, rótulos, botões e mensagens de sucesso), sem mudar as regras. As capturas de 23/11 mostram a primeira versão da tela (1ª execução) ou a nova (reteste), e não fazem parte da entrega. As capturas "antes" do BUG01 ao BUG05 foram refeitas em 25/11, reproduzindo cada defeito com o código que tinha o erro e o visual atual (`saida-reproducao-BUG01-a-BUG05.txt`).

## 1. Casos de teste

O resultado obtido é o da execução final. Nos casos reprovados, o que aconteceu antes da correção também está descrito.

| ID | Tipo | Cenário / dados | Resultado esperado | Resultado obtido | 1ª execução do caso | Execução final | Evidência |
|---|---|---|---|---|---|---|---|
| CT01 | Funcional / caixa preta | Cadastrar Maria Silva, maria@email.com, (21) 98765-4321 | Contato salvo e exibido na listagem | Contato salvo e exibido; mensagem "Contato adicionado à agenda." | Aprovado | Aprovado | `CT01-cadastro-valido.jpg` |
| CT02 | Funcional / negativo | Salvar com todos os campos vazios | Cadastro bloqueado, com mensagem para cada campo | Bloqueado; "Informe o nome. Informe o e-mail. Informe o telefone." | Aprovado | Aprovado | `CT02-campos-obrigatorios.jpg` |
| CT03 | Validação | E-mail `joaoemail.com` (sem @) | Cadastro bloqueado; pede e-mail válido | Bloqueado; "Informe um e-mail válido, por exemplo nome@email.com." | Aprovado | Aprovado | `CT03-email-invalido.jpg` |
| CT04 | Validação | Telefone `21 1234` (curto) | Cadastro bloqueado; pede telefone com DDD | Bloqueado; "Informe um telefone válido com DDD, por exemplo (21) 98765-4321." | Aprovado | Aprovado | `CT04-telefone-invalido.jpg` |
| CT05 | Integridade | Com Maria cadastrada, cadastrar outro contato com `MARIA@email.com` | Cadastro bloqueado por duplicidade | Bloqueado; "Já existe um contato cadastrado com este e-mail." | Aprovado | Aprovado | `CT05-email-duplicado.jpg` |
| CT06 | Funcional | Com Maria, João e Ana cadastrados, pesquisar "joão" | Exibe só João Souza | Listagem mostrou só João Souza | Aprovado | Aprovado | `CT06-pesquisa-por-nome.jpg` |
| CT07 | Funcional | Editar o telefone de Maria para (21) 99999-0000 | Telefone alterado; nome e e-mail mantidos | Telefone alterado; nome e e-mail mantidos; "Alterações gravadas." | Aprovado | Aprovado | `CT07-editar-telefone.jpg` |
| CT08 | Funcional / negativo | Remover Ana e **cancelar** a confirmação | Contato permanece cadastrado | Janela "Remover Ana Costa da agenda?" cancelada; os 3 contatos continuaram | Aprovado | Aprovado | `CT08-excluir-cancelado.jpg` e `saida-execucao-final-edge.txt` |
| CT09 | Funcional | Remover Ana e **confirmar** | Contato removido da listagem | Ana saiu da listagem; "Contato removido da agenda." | Aprovado | Aprovado | `CT09-excluir-confirmado.jpg` e `saida-execucao-final-edge.txt` |
| CT10 | Persistência | Recarregar a página após cadastrar | Contatos continuam na listagem | Contatos continuaram na listagem | Aprovado | Aprovado | `CT10-persistencia-recarregar.jpg` |
| CT11 | Exploratório / integração | Clicar em "Alterar" em Maria, mudar o nome e, sem gravar, remover Maria | Contato removido; formulário volta ao modo de cadastro; não é possível gravar a alteração de um contato removido | Antes: o formulário seguia em edição e gravar mostrava sucesso sem salvar nada. Final: formulário limpo e em "Novo contato" | **Reprovado** (BUG01) | Aprovado | `BUG01-antes-1-formulario-segue-em-edicao.jpg`, `BUG01-antes-2-sucesso-falso.jpg` e `BUG01-depois-formulario-volta-ao-cadastro.jpg` |
| CT12 | Exploratório | Com Ana salva como `11987651234`, pesquisar `98765-1234` | Encontra Ana Costa | Antes: nenhum contato. Final: mostrou só Ana Costa | **Reprovado** (BUG02) | Aprovado | `BUG02-antes-pesquisa-nao-encontra.jpg` e `BUG02-depois-pesquisa-telefone-encontra.jpg` |
| CT13 | Exploratório / validação | E-mail `teste@email..com` | Cadastro bloqueado | Antes: aceito. Final: "Informe um e-mail válido, por exemplo nome@email.com." | **Reprovado** (BUG03) | Aprovado | `BUG03-antes-email-aceito.jpg` e `CT13-email-pontos-seguidos.jpg` |
| CT14 | Exploratório / validação | Nome `@@`, com e-mail e telefone válidos | Cadastro bloqueado com mensagem clara | Antes: aceito. Final: "O nome deve ter pelo menos 2 caracteres e conter letras." | **Reprovado** (BUG04) | Aprovado | `BUG04-antes-nome-aceito.jpg` e `CT14-nome-sem-letras.jpg` |
| CT15 | Regressão | Depois de todas as correções, repetir CT01 a CT14 e CT16 a CT19 | Todos continuam funcionando | Todos aprovados no Edge e no Chrome | Não se aplica | Aprovado | `saida-execucao-final-edge.txt`, `saida-execucao-final-chrome.txt`, as capturas de cada caso e `CT15-regressao-final.jpg` (listagem no fim da execução) |
| CT16 | Funcional | Pesquisar `ana@email.com` | Exibe só Ana Costa | Listagem mostrou só Ana Costa | Aprovado | Aprovado | `CT16-pesquisa-por-email.jpg` |
| CT17 | Validação | Cadastrar João Souza com telefone fixo (21) 3333-4444 | Contato salvo | Contato salvo e exibido | Aprovado | Aprovado | `CT17-telefone-fixo.jpg` |
| CT18 | Exploratório | Pesquisar `carlos2` e `maria1@email.com`, que não existem na agenda | Nenhum contato encontrado | Antes: trouxe os 3 contatos. Final: "Nenhum contato encontrado com esse texto." | **Reprovado** (BUG06) | Aprovado | `BUG06-antes-pesquisa-traz-todos.jpg` e `BUG06-depois-pesquisa-nao-traz-ninguem.jpg` |
| CT19 | Exploratório / validação | Telefone com espaço a mais, `(21) 9 8765-4321`, e depois o mesmo número sem o último dígito | O completo é salvo sem perder dígito; o incompleto é bloqueado | Antes: salvou (21) 9876-5432. Final: salvou (21) 98765-4321 e bloqueou o incompleto | **Reprovado** (BUG07) | Aprovado | `BUG07-antes-telefone-cortado.jpg`, `BUG07-depois-telefone-completo.jpg` e `BUG07-depois-telefone-incompleto-rejeitado.jpg` |

A 1ª execução de CT16 a CT19 está em `saida-execucao-antes-BUG06-BUG07.txt`.

No reteste do CT14 apareceu a mensagem confusa do BUG05 (`BUG05-antes-mensagem-confusa.jpg`).

## 2. Teste caixa branca: função `isValidPhone`

Decisões do código (`validation.js`), o dado usado em cada caminho e o teste automatizado que o executa:

| # | Condição no código | Dado de teste | Retorno | Teste em `tests/validation.test.js` |
|---|---|---|---|---|
| 1 | Tem caractere que não é dígito, espaço, parêntese ou hífen | `21987654321a` | `false` | rejeita telefone com letra mesmo tendo a quantidade certa de dígitos |
| 2 | DDD vazio ou com 0 em algum dos dois dígitos | `""`, `01987654321`, `2033334444` | `false` | rejeita telefone vazio, curto, com letras ou DDD inválido; rejeita DDD com segundo dígito 0 |
| 3 | 10 dígitos e o 3º é 2, 3, 4 ou 5 (fixo) | `2133334444` | `true` | aceita celular (11 dígitos) e fixo (10 dígitos) com DDD |
| 4 | 10 dígitos e o 3º não é 2 a 5 | `(21) 9 8765-432` | `false` | BUG07: rejeita celular incompleto |
| 5 | 11 dígitos e o 3º é 9 (celular) | `21987654321` | `true` | aceita celular (11 dígitos) e fixo (10 dígitos) com DDD |
| 6 | 11 dígitos e o 3º não é 9 | `21887654321` | `false` | rejeita celular de 11 dígitos que não começa com 9 após o DDD |
| 7 | Outra quantidade de dígitos | `98765432`, `219876543210` | `false` | rejeita telefone vazio, curto, com letras ou DDD inválido; rejeita telefone com 12 dígitos |

## 3. Teste automatizado

Ferramenta: `node:test` (nativo do Node.js). Comando: `node --test tests/validation.test.js`.
Resultado final: **30 testes, 30 aprovados, 0 reprovados** (`evidencias/saida-testes-automatizados.txt`).

Saídas das etapas anteriores:

| Momento | Resultado | Arquivo |
|---|---|---|
| Antes do exploratório | 16 de 16 aprovados | `1a-execucao/saida-testes-16-aprovados.txt` |
| Testes do BUG01 ao BUG04, antes da correção | 5 reprovados de 22 | `1a-execucao/saida-testes-falhando-BUG01-a-BUG04.txt` |
| Teste do BUG05, antes da correção | 1 reprovado de 23 | `1a-execucao/saida-testes-falhando-BUG05.txt` |
| Testes do BUG06 e do BUG07, antes da correção | 4 reprovados de 30 | `saida-testes-falhando-BUG06-BUG07.txt` |

Os três arquivos da pasta `1a-execucao` guardam só as linhas de resultado da saída.
