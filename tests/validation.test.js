// Testes automatizados usando o test runner nativo do Node.js (sem dependências externas).
// Execução: node --test tests/validation.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const V = require("../validation.js");

// ---------- Nome ----------
test("aceita nome válido", () => {
  assert.equal(V.isValidName("Maria Silva"), true);
});

test("rejeita nome vazio ou só com espaços", () => {
  assert.equal(V.isValidName(""), false);
  assert.equal(V.isValidName("   "), false);
});

test("rejeita nome com menos de 2 caracteres", () => {
  assert.equal(V.isValidName("A"), false);
});

// ---------- E-mail ----------
test("aceita e-mail em formato válido", () => {
  assert.equal(V.isValidEmail("maria@email.com"), true);
  assert.equal(V.isValidEmail("joao.silva@empresa.com.br"), true);
});

test("rejeita e-mail sem @, sem domínio ou com espaço", () => {
  assert.equal(V.isValidEmail(""), false);
  assert.equal(V.isValidEmail("mariaemail.com"), false);
  assert.equal(V.isValidEmail("maria@"), false);
  assert.equal(V.isValidEmail("maria@email"), false);
  assert.equal(V.isValidEmail("maria silva@email.com"), false);
});

test("normaliza e-mail para minúsculas e sem espaços nas pontas", () => {
  assert.equal(V.normalizeEmail("  Maria@Email.COM "), "maria@email.com");
});

// ---------- Telefone ----------
test("normaliza telefone mantendo apenas dígitos", () => {
  assert.equal(V.normalizePhone("(21) 98765-4321"), "21987654321");
});

test("aceita celular (11 dígitos) e fixo (10 dígitos) com DDD", () => {
  assert.equal(V.isValidPhone("21987654321"), true);
  assert.equal(V.isValidPhone("(21) 98765-4321"), true);
  assert.equal(V.isValidPhone("2133334444"), true);
});

test("rejeita telefone vazio, curto, com letras ou DDD inválido", () => {
  assert.equal(V.isValidPhone(""), false);
  assert.equal(V.isValidPhone("98765432"), false);
  assert.equal(V.isValidPhone("21ABCDE4321"), false);
  assert.equal(V.isValidPhone("01987654321"), false);
});

test("rejeita celular de 11 dígitos que não começa com 9 após o DDD", () => {
  assert.equal(V.isValidPhone("21887654321"), false);
});

test("rejeita telefone com letra mesmo tendo a quantidade certa de dígitos", () => {
  assert.equal(V.isValidPhone("21987654321a"), false);
});

test("rejeita DDD com segundo dígito 0", () => {
  assert.equal(V.isValidPhone("2033334444"), false);
});

test("rejeita telefone com 12 dígitos", () => {
  assert.equal(V.isValidPhone("219876543210"), false);
});

// ---------- Validação do contato completo ----------
test("contato válido não gera erros", () => {
  const errors = V.validateContact(
    { name: "Maria Silva", email: "maria@email.com", phone: "21987654321" }, []
  );
  assert.deepEqual(errors, []);
});

test("rejeita ausência de campos obrigatórios", () => {
  const errors = V.validateContact({ name: "", email: "", phone: "" }, []);
  assert.equal(errors.length, 3);
});

test("detecta e-mail duplicado mesmo com diferença de maiúsculas", () => {
  const existing = [{ id: "1", name: "Maria", email: "maria@email.com", phone: "21987654321" }];
  const errors = V.validateContact(
    { name: "Outra Maria", email: "MARIA@email.com", phone: "21912345678" }, existing
  );
  assert.ok(errors.some(error => error.includes("Já existe")));
});

test("permite manter o próprio e-mail durante a edição", () => {
  const existing = [{ id: "1", name: "Maria", email: "maria@email.com", phone: "21987654321" }];
  const errors = V.validateContact(
    { name: "Maria Silva", email: "maria@email.com", phone: "21987654321" }, existing, "1"
  );
  assert.deepEqual(errors, []);
});

// ---------- Pesquisa ----------
test("pesquisa encontra por nome sem diferenciar maiúsculas", () => {
  const contacts = [
    { id: "1", name: "Maria Silva", email: "maria@email.com", phone: "21987654321" },
    { id: "2", name: "João Souza", email: "joao@email.com", phone: "21912345678" }
  ];
  const result = V.filterContacts(contacts, "maria");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "1");
});

test("pesquisa encontra por e-mail", () => {
  const contacts = [
    { id: "1", name: "Maria Silva", email: "contato1@email.com", phone: "21987654321" },
    { id: "2", name: "João Souza", email: "joao@email.com", phone: "2133334444" }
  ];
  const result = V.filterContacts(contacts, "CONTATO1@email");
  assert.deepEqual(result.map(contact => contact.id), ["1"]);
});

test("pesquisa com texto vazio retorna todos os contatos", () => {
  const contacts = [{ id: "1", name: "A B", email: "a@b.com", phone: "21987654321" }];
  assert.equal(V.filterContacts(contacts, "").length, 1);
});

// ---------- Testes de regressão dos defeitos encontrados (BUG01 a BUG07) ----------
test("BUG01: atualizar contato que não existe mais não informa sucesso falso", () => {
  const contacts = [{ id: "2", name: "João", email: "joao@email.com", phone: "2133334444" }];
  const result = V.updateContact(contacts, "1", { name: "Maria Editada" });
  assert.equal(result.updated, false);
  assert.deepEqual(result.contacts, contacts);
});

test("BUG01: atualizar contato existente altera só os campos enviados", () => {
  const contacts = [{ id: "1", name: "Maria", email: "maria@email.com", phone: "21987654321" }];
  const result = V.updateContact(contacts, "1", { phone: "21999990000" });
  assert.equal(result.updated, true);
  assert.equal(result.contacts[0].phone, "21999990000");
  assert.equal(result.contacts[0].email, "maria@email.com");
});

test("BUG02: pesquisa por telefone no formato exibido na tela encontra o contato", () => {
  const contacts = [{ id: "1", name: "Ana Costa", email: "ana@email.com", phone: "11987651234" }];
  assert.equal(V.filterContacts(contacts, "98765-1234").length, 1);
  assert.equal(V.filterContacts(contacts, "(11) 98765").length, 1);
});

test("BUG02: pesquisa por texto sem dígitos não encontra contato pelo telefone", () => {
  const contacts = [{ id: "1", name: "Ana Costa", email: "ana@email.com", phone: "11987651234" }];
  assert.equal(V.filterContacts(contacts, "-").length, 0);
});

test("BUG03: rejeita e-mail com pontos seguidos ou ponto nas pontas", () => {
  assert.equal(V.isValidEmail("teste@email..com"), false);
  assert.equal(V.isValidEmail(".teste@email.com"), false);
  assert.equal(V.isValidEmail("teste.@email.com"), false);
  assert.equal(V.isValidEmail("teste@.email.com"), false);
});

test("BUG04: rejeita nome sem letras", () => {
  assert.equal(V.isValidName("@@"), false);
  assert.equal(V.isValidName("123"), false);
  assert.equal(V.isValidName("José D'Ávila"), true);
});

test("BUG05: mensagem de nome sem letras explica o problema correto", () => {
  const errors = V.validateContact({ name: "@@", email: "a@b.com", phone: "21987654321" }, []);
  assert.ok(errors.some(error => error.includes("letras")));
});

test("BUG06: pesquisa com letras e números não traz contatos pelo telefone", () => {
  const contacts = [
    { id: "1", name: "Maria Silva", email: "maria@email.com", phone: "21987654321" },
    { id: "2", name: "Ana Costa", email: "ana@email.com", phone: "11987651234" }
  ];
  assert.equal(V.filterContacts(contacts, "carlos2").length, 0);
  assert.equal(V.filterContacts(contacts, "maria1@email.com").length, 0);
});

test("BUG07: rejeita celular incompleto (10 dígitos começando com 9)", () => {
  assert.equal(V.isValidPhone("(21) 9 8765-432"), false);
  assert.equal(V.isValidPhone("(21) 9 8765-4321"), true);
});

test("BUG07: fixo precisa começar com 2, 3, 4 ou 5 depois do DDD", () => {
  assert.equal(V.isValidPhone("2123334444"), true);
  assert.equal(V.isValidPhone("2153334444"), true);
  assert.equal(V.isValidPhone("2113334444"), false);
  assert.equal(V.isValidPhone("2163334444"), false);
});
