# Registro de Defeitos

Todos os defeitos abaixo foram **reproduzidos** durante os testes e têm captura de tela no arquivo `A3-Grupo6-Relatorio-e-Evidencias.pdf`, entregue na plataforma da faculdade.
Para cada um foi criado um teste automatizado que falhava antes da correção. As saídas com as falhas estão listadas em `02-casos-de-teste.md`, seção 3.

| ID | Descrição do defeito | Como reproduzir (na versão com o defeito) | Severidade | Correção e reteste | Estado |
|---|---|---|---|---|---|
| BUG01 | Ao editar um contato e excluí-lo antes de salvar, o botão de salvar mostrava "Contato atualizado com sucesso.", mas nada era salvo. | Editar Maria, excluir Maria, mudar o nome e salvar | **Média** | Ao remover o contato em edição, o formulário volta ao modo de cadastro. A função `updateContact` também passou a informar quando o contato não existe. Reteste: CT11 aprovado. | Corrigido |
| BUG02 | A pesquisa não encontrava o contato pelo telefone do jeito que ele aparece na tela, se ele foi salvo sem máscara. | Cadastrar telefone 11987651234 e pesquisar "98765-1234" | **Média** | A pesquisa passou a comparar o telefone só pelos dígitos. Reteste: CT12 aprovado. | Corrigido |
| BUG03 | O sistema aceitava e-mail com pontos seguidos ou ponto nas pontas. | Cadastrar e-mail teste@email..com | **Baixa** | A validação passou a rejeitar ".." e ponto no início ou no fim do usuário e do domínio. Reteste: CT13 aprovado. | Corrigido |
| BUG04 | O sistema aceitava nome sem nenhuma letra, como `@@` ou `123`. | Cadastrar nome "@@" | **Baixa** | O nome passou a exigir pelo menos uma letra. Reteste: CT14 aprovado. | Corrigido |
| BUG05 | Encontrado no reteste do BUG04: para o nome `@@`, a mensagem dizia só "deve ter pelo menos 2 caracteres", e ele já tinha 2. | Cadastrar nome "@@" depois da correção do BUG04 | **Baixa** | A mensagem passou a ser "O nome deve ter pelo menos 2 caracteres e conter letras." Reteste: CT14 aprovado. | Corrigido |
| BUG06 | Regressão causada pela correção do BUG02: pesquisar um texto com letras e números trazia contatos que não tinham nada a ver, porque só o número era comparado com o telefone. | Com Maria, João e Ana cadastrados, pesquisar "carlos2" | **Média** | O telefone só entra na comparação quando o texto não tem letras nem outros símbolos. Reteste: CT18 aprovado; CT12 repetido e aprovado. | Corrigido |
| BUG07 | O campo de telefone cortava o número em 15 caracteres. Um celular digitado com um espaço a mais perdia o último dígito e era salvo como se fosse fixo, com mensagem de sucesso. | Cadastrar telefone "(21) 9 8765-4321" | **Alta** | O limite do campo passou para 20 caracteres e o fixo precisa começar com 2, 3, 4 ou 5 depois do DDD. Reteste: CT19 aprovado; CT17 repetido e aprovado. | Corrigido |

O BUG06 e o BUG07 foram encontrados em 25/11/2026, em uma revisão do projeto feita depois das primeiras correções.

**Critério de severidade usado**
- **Alta:** impede o uso de uma funcionalidade principal ou corrompe dados salvos.
- **Média:** a funcionalidade falha num cenário real ou o usuário perde uma alteração sem perceber.
- **Baixa:** dado inválido aceito ou mensagem confusa, sem perda de dados.

**Evidências**

As capturas "antes" do BUG01 ao BUG05 foram refeitas em 25/11/2026: cada defeito foi reproduzido com o código que tinha o erro e o visual atual da tela (`saida-reproducao-BUG01-a-BUG05.txt`). Por isso, no BUG01 a mensagem aparece com o texto atual, "Alterações gravadas.". As capturas originais, de 23/11, não fazem parte da entrega. As capturas "antes" do BUG06 e do BUG07 foram feitas antes da correção. As capturas "depois" são da versão final.

| Defeito | Antes da correção | Depois da correção |
|---|---|---|
| BUG01 | `BUG01-antes-1-formulario-segue-em-edicao.jpg` e `BUG01-antes-2-sucesso-falso.jpg` | `BUG01-depois-formulario-volta-ao-cadastro.jpg` |
| BUG02 | `BUG02-antes-pesquisa-nao-encontra.jpg` | `BUG02-depois-pesquisa-telefone-encontra.jpg` |
| BUG03 | `BUG03-antes-email-aceito.jpg` | `CT13-email-pontos-seguidos.jpg` |
| BUG04 | `BUG04-antes-nome-aceito.jpg` | `CT14-nome-sem-letras.jpg` |
| BUG05 | `BUG05-antes-mensagem-confusa.jpg` | `CT14-nome-sem-letras.jpg` |
| BUG06 | `BUG06-antes-pesquisa-traz-todos.jpg` | `BUG06-depois-pesquisa-nao-traz-ninguem.jpg` |
| BUG07 | `BUG07-antes-telefone-cortado.jpg` | `BUG07-depois-telefone-completo.jpg` e `BUG07-depois-telefone-incompleto-rejeitado.jpg` |
