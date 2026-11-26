# Relatório Final

**Grupo:** 6
**Aplicação:** Sistema de Cadastro de Contatos (SCC), exibido na tela como "Minha Agenda de Contatos"
**Disciplina:** Garantia da Qualidade de Software (IBMR)

**Integrantes:**
- Carlos Henrique Braga Coelho
- Luiz Otávio Caldas Queiroz
- Sandro Moreira dos Santos
- Matheus Guimarães de Almeida
- João Ricardo D'Almeida Pedral Sampaio

## 1. Resumo da execução

| Execução | Casos executados | Aprovados | Reprovados |
|---|---|---|---|
| 1ª execução (23/11) | 14 (CT01 a CT14) | 10 (71,4%) | 4 (28,6%): CT11 a CT14 |
| Casos novos da revisão (25/11), antes das correções | 4 (CT16 a CT19) | 2 (50%) | 2 (50%): CT18 e CT19 |
| Execução final (25/11) | 19 (CT01 a CT19) | 19 (100%) | 0 (0%) |
| Execução manual (25/11) | 18 (CT01 a CT14 e CT16 a CT19) | 18 (100%) | 0 (0%) |

Defeitos identificados: **7**. Defeitos corrigidos: **7**.

O plano está em `01-plano-de-testes.md`, os casos e as evidências em `02-casos-de-teste.md` (capturas no `A3-Grupo6-Relatorio-e-Evidencias.pdf`) e os defeitos em `03-registro-de-defeitos.md`.

## 2. Métricas de qualidade

| Métrica | Cálculo | Resultado | Interpretação |
|---|---|---|---|
| Taxa de aprovação (1ª execução) | 10 ÷ 14 × 100 | **71,4%** | Os casos do roteiro passaram, mas o teste exploratório revelou 4 falhas. |
| Taxa de reprovação (1ª execução) | 4 ÷ 14 × 100 | **28,6%** | Quatro cenários precisaram de correção e reteste. |
| Taxa de aprovação (casos novos, antes das correções) | 2 ÷ 4 × 100 | **50%** | A revisão encontrou mais duas falhas. |
| Taxa de aprovação (final) | 19 ÷ 19 × 100 | **100%** | Todos os casos foram aprovados na versão final. |
| Taxa de reprovação (final) | 0 ÷ 19 × 100 | **0%** | Nenhum caso reprovado na versão final. |
| Taxa de correção de defeitos | 7 ÷ 7 × 100 | **100%** | Todos os defeitos registrados foram corrigidos e retestados. |
| Defeitos por severidade | Alta: 1, Média: 3, Baixa: 3 | 7 no total | O mais grave (BUG07) salvava um telefone errado sem avisar. |

## 3. Teste automatizado

- **Ferramenta:** `node:test`, nativo do Node.js, sem instalar dependências.
- **Comando:** `node --test tests/validation.test.js`
- **O que cobre:** validação de nome, e-mail e telefone, duplicidade de e-mail, pesquisa, atualização de contato e testes de regressão para cada defeito (BUG01 a BUG07).
- **Abordagem:** para cada defeito, primeiro foi criado um teste que falhava; depois veio a correção. As saídas com as falhas estão em `evidencias/`.
- **Resultado final:** 30 testes, 30 aprovados, 0 reprovados (`evidencias/saida-testes-automatizados.txt`).

## 4. Conclusão

A aplicação foi submetida a testes unitários, de integração, de sistema, funcionais, negativos, de persistência, exploratórios, de caixa branca e de regressão. Na primeira execução, 10 de 14 casos foram aprovados. O exploratório revelou 4 falhas e o reteste revelou uma quinta. Uma revisão posterior encontrou mais duas. Foram 7 defeitos no total (1 de severidade alta, 3 de média e 3 de baixa), todos corrigidos e retestados. Na execução final, os 19 casos foram aprovados no Edge e no Chrome, e a execução manual confirmou 18 deles.

A qualidade foi considerada **satisfatória para o escopo proposto**: os requisitos testados foram atendidos e nenhum defeito registrado está pendente. Restam as limitações abaixo.

**Limitações conhecidas**
- A validação confere só o formato básico do e-mail e do telefone, não se eles existem. Alguns e-mails com símbolos indevidos, como `maria@email.com,`, ainda são aceitos.
- Telefones com +55 não são aceitos.
- Com a aplicação aberta em duas abas, a última gravação substitui a da outra aba.
- Se o navegador bloquear o LocalStorage ou ele estiver cheio, a tela mostra sucesso sem salvar. Dados corrompidos no LocalStorage podem ser descartados ou impedir a tela de abrir.
- Com uma pesquisa preenchida, um contato novo só aparece se combinar com o texto pesquisado.
- A tela não foi testada no Firefox nem em celular.

**Recomendação:** antes de um uso real, tratar a falha de gravação e o uso em duas abas, testar no Firefox e automatizar também os testes de tela.

**Lição aprendida:** o roteiro planejado passou por completo, mas o exploratório e a revisão encontraram falhas reais. O BUG06 foi causado pela correção do BUG02 e não apareceu no primeiro reteste, porque nenhum caso pesquisava letras e números juntos.
