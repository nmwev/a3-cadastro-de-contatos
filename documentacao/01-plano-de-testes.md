# Plano de Testes: Sistema de Cadastro de Contatos

**Disciplina:** Garantia da Qualidade de Software (IBMR)
**Grupo:** 6
**Aplicação:** Sistema de Cadastro de Contatos (SCC), exibido na tela como "Minha Agenda de Contatos"

**Integrantes:**
- Carlos Henrique Braga Coelho
- Luiz Otávio Caldas Queiroz
- Sandro Moreira dos Santos
- Matheus Guimarães de Almeida
- João Ricardo D'Almeida Pedral Sampaio

## 1. Visão geral do produto
**Objetivo:** permitir cadastrar, consultar, editar e excluir contatos (nome, e-mail e telefone).
**Usuário:** pessoa que organiza uma agenda simples de contatos.
**Escopo:** manutenção dos registros no próprio navegador. Não inclui envio de e-mail, ligação, sincronização com celular nem verificação de que o e-mail ou telefone realmente existem.

## 2. Requisitos

**Requisitos funcionais**
- RF01: Cadastrar contato com nome, e-mail e telefone.
- RF02: Listar os contatos cadastrados.
- RF03: Pesquisar por nome, e-mail ou telefone.
- RF04: Editar os dados de um contato.
- RF05: Excluir contato mediante confirmação.
- RF06: Impedir dois contatos com o mesmo e-mail.

**Requisitos não funcionais**
- RNF01: Interface simples e compreensível.
- RNF02: Validar campos obrigatórios e formatos de e-mail e telefone.
- RNF03: Manter os dados após recarregar a página (LocalStorage).
- RNF04: Exibir mensagens claras de sucesso e erro.
- RNF05: Funcionar nos navegadores desktop atuais.

## 3. Estratégia e níveis de teste

| Nível / tipo | Aplicação no cadastro de contatos |
|---|---|
| Teste unitário | Funções de `validation.js` testadas isoladamente: nome, e-mail, telefone, duplicidade, pesquisa e atualização. |
| Teste de integração | Interação entre formulário, `app.js`, listagem e LocalStorage. |
| Teste de sistema | Fluxos completos na tela: cadastrar, pesquisar, editar e excluir. |
| Teste de aceitação | Verificar se cada requisito (RF01 a RF06) é atendido. |
| Teste de regressão | Reexecutar todos os casos e testes automatizados após cada correção. |
| Caixa preta | Validar entradas e saídas pela tela, sem olhar o código. |
| Caixa branca | Exercitar as condições da função `isValidPhone` (ver `02-casos-de-teste.md`). |
| Teste exploratório | Testar combinações fora do roteiro para encontrar falhas não previstas. |

## 4. Plano de testes

**Objetivo:** verificar se cadastro, listagem, pesquisa, edição e exclusão funcionam conforme os requisitos, incluindo entradas inválidas, duplicidade e persistência.
**Escopo:** RF01 a RF06 e RNF02 a RNF04.
**Ambiente:** computador com Windows 11. Na 1ª execução, navegador Chromium com a aplicação servida localmente; na execução final, Microsoft Edge e Google Chrome (versão 158) com o `index.html` aberto direto do disco. Node.js 24 para os testes automatizados.
**Critério de entrada:** aplicação executável e todas as funcionalidades disponíveis.
**Critério de saída:** todos os casos executados com resultado registrado, defeitos encontrados corrigidos e retestados, e testes automatizados 100% aprovados.

**Dados de teste (todos fictícios)**

| Dado | Valor usado | Finalidade |
|---|---|---|
| Contato válido | Maria Silva, maria@email.com, (21) 98765-4321 | Cadastro com sucesso |
| Telefone fixo | (21) 3333-4444 | Aceitar 10 dígitos |
| Telefone sem máscara | 11987651234 | Aceitar só dígitos |
| Campos vazios | "" | Bloquear cadastro |
| E-mail sem @ | joaoemail.com | Rejeitar formato |
| E-mail com pontos seguidos | teste@email..com | Rejeitar formato |
| Telefone curto | 21 1234 | Rejeitar formato |
| Telefone com espaço a mais | (21) 9 8765-4321 | Aceitar sem perder dígito |
| Celular incompleto | (21) 9 8765-432 | Rejeitar formato |
| E-mail duplicado | MARIA@email.com | Bloquear duplicidade |
| Nome sem letras | @@ | Rejeitar nome |
| Pesquisa com letras e números | carlos2 | Não trazer contato sem relação |

**Funcionalidades, cenários e resultados esperados**

| Requisito | Cenário | Dados | Resultado esperado | Casos |
|---|---|---|---|---|
| RF01, RNF04 | Cadastro válido, com celular e com fixo | Maria Silva; João Souza | Contato salvo, com mensagem de sucesso | CT01, CT17 |
| RNF02, RNF04 | Campos vazios | "" | Cadastro bloqueado, com mensagem para cada campo | CT02 |
| RNF02, RNF04 | E-mail em formato inválido | joaoemail.com; teste@email..com | Cadastro bloqueado, com mensagem de e-mail | CT03, CT13 |
| RNF02, RNF04 | Telefone em formato inválido | 21 1234; (21) 9 8765-432 | Cadastro bloqueado, com mensagem de telefone | CT04, CT19 |
| RNF02 | Telefone com espaço a mais | (21) 9 8765-4321 | Número salvo completo | CT19 |
| RNF02, RNF04 | Nome sem letras | @@ | Cadastro bloqueado, com mensagem de nome | CT14 |
| RF06 | E-mail já cadastrado | MARIA@email.com | Cadastro bloqueado por duplicidade | CT05 |
| RF02, RF03 | Pesquisa por nome, e-mail e telefone | joão; ana@email.com; 98765-1234 | Só o contato correspondente | CT06, CT12, CT16 |
| RF03 | Pesquisa de texto que não existe | carlos2; maria1@email.com | Nenhum contato | CT18 |
| RF04 | Edição de um campo | (21) 99999-0000 | Só o campo alterado muda | CT07 |
| RF04, RF05 | Remover o contato que está em edição | Maria Silva | Contato removido e formulário de volta ao cadastro | CT11 |
| RF05 | Remover e cancelar; remover e confirmar | Ana Costa | Contato mantido; contato removido | CT08, CT09 |
| RF02, RNF03 | Recarregar a página | Contatos cadastrados | Contatos continuam na listagem | CT10 |
| Todos | Regressão após as correções | Os mesmos de cada caso | Todos os casos aprovados | CT15 |

Os detalhes e os resultados estão em `02-casos-de-teste.md`.
