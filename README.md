# Sistema de Cadastro de Contatos (SCC)

Projeto A3 de **Garantia da Qualidade de Software** (IBMR), Grupo 6. Na tela, a aplicação se chama "Minha Agenda de Contatos".

**Integrantes:**
- Carlos Henrique Braga Coelho
- Luiz Otávio Caldas Queiroz
- Sandro Moreira dos Santos
- Matheus Guimarães de Almeida
- João Ricardo D'Almeida Pedral Sampaio

## 1. Requisitos
- Navegador atualizado (testado no Microsoft Edge e no Google Chrome).
- Node.js 18 ou superior, só para executar os testes automatizados.

## 2. Executar a aplicação
1. Abra o arquivo `index.html` no navegador.
2. Cadastre contatos fictícios e experimente pesquisar, editar e excluir.

Não há backend. Os dados ficam no `LocalStorage` do navegador utilizado.

## 3. Funcionalidades implementadas
- Cadastro, listagem, pesquisa, edição e exclusão de contatos.
- Campos obrigatórios: nome, e-mail e telefone.
- Validação de e-mail (formato `nome@dominio.ext`).
- Validação de telefone brasileiro com DDD: fixo (10 dígitos, começando com 2 a 5) ou celular (11 dígitos, começando com 9).
- Bloqueio de e-mail duplicado, mesmo com diferença de maiúsculas.
- Pesquisa por nome, e-mail ou telefone (o telefone pode ser digitado com ou sem máscara).
- Confirmação antes da exclusão.
- Persistência dos dados com LocalStorage.
- Mensagens de sucesso e erro.

## 4. Executar os testes automatizados
Na pasta raiz do projeto, execute:

```bash
node --test tests/validation.test.js
```

Os testes usam o módulo nativo `node:test`, então não é preciso instalar bibliotecas.
Resultado atual: **30 testes, 30 aprovados** (a saída completa está em `evidencias/saida-testes-automatizados.txt`).

## 5. Roteiro de testes manuais
1. Adicione um contato válido e confira na listagem.
2. Tente adicionar com os campos vazios.
3. Tente um e-mail sem @ e um telefone curto.
4. Tente repetir um e-mail já cadastrado.
5. Pesquise por nome, por e-mail e por telefone.
6. Altere o telefone de um contato.
7. Remova um contato: primeiro cancele, depois confirme.
8. Recarregue a página e confira se os contatos continuam.

## 6. Conteúdos da disciplina no projeto
| Conteúdo | Onde está |
|---|---|
| Planejamento da qualidade | `documentacao/01-plano-de-testes.md` |
| Teste caixa preta, de integração e de sistema | Casos CT01 a CT19 em `documentacao/02-casos-de-teste.md` |
| Teste caixa branca | Função `isValidPhone`, seção 2 de `documentacao/02-casos-de-teste.md` |
| Teste unitário e automação | `tests/validation.test.js` |
| Regressão | CT15 e testes BUG01 a BUG07 |
| Gestão de defeitos | `documentacao/03-registro-de-defeitos.md` |
| Métricas e conclusão | `documentacao/04-relatorio-final.md` |

## 7. Organização dos arquivos
| Arquivo / pasta | Conteúdo |
|---|---|
| `index.html`, `styles.css` | Tela da aplicação |
| `app.js` | Integração entre formulário, listagem e LocalStorage |
| `validation.js` | Funções puras de validação, pesquisa e atualização (testáveis isoladamente) |
| `tests/validation.test.js` | Testes automatizados (unitários e de regressão dos defeitos) |
| `documentacao/01-plano-de-testes.md` | Requisitos, estratégia e plano de testes |
| `documentacao/02-casos-de-teste.md` | Casos de teste, caixa branca e resultados |
| `documentacao/03-registro-de-defeitos.md` | Defeitos encontrados, severidade, correção e reteste |
| `documentacao/04-relatorio-final.md` | Métricas, resumo da automação e conclusão |
| `evidencias/` | Saídas dos testes em texto; `1a-execucao/` guarda as da primeira execução. As capturas de tela estão no arquivo `A3-Grupo6-Relatorio-e-Evidencias.pdf`, entregue na plataforma da faculdade |

## 8. Limitações
- A validação verifica o formato do e-mail e do telefone, não se eles realmente existem.
- Telefones com código do país (+55) não são aceitos; o usuário deve informar só o DDD e o número.
- O LocalStorage é armazenamento local de demonstração e não substitui um banco de dados.
- As demais limitações estão em `documentacao/04-relatorio-final.md`.
- Use apenas dados fictícios na demonstração.
