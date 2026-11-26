// Funções puras de validação e pesquisa. Mantidas separadas da tela para facilitar testes unitários.
(function (root) {
  // Remove espaços das pontas e deixa o e-mail em minúsculas, para comparar duplicidade.
  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  // Mantém apenas os dígitos do telefone: "(21) 98765-4321" vira "21987654321".
  function normalizePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
  }

  // Nome obrigatório com pelo menos 2 caracteres e pelo menos uma letra.
  // Correção do BUG04: antes aceitava nomes só com símbolos ou números, como "@@".
  function isValidName(name) {
    const text = String(name || "").trim();
    return text.length >= 2 && /\p{L}/u.test(text);
  }

  // Formato básico: texto@dominio.extensao, sem espaços.
  // Correção do BUG03: antes aceitava pontos seguidos ("email..com") e ponto nas pontas.
  function isValidEmail(email) {
    const text = String(email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(text)) return false;
    const [local, domain] = text.split("@");
    const badDots = part => part.startsWith(".") || part.endsWith(".") || part.includes("..");
    return !badDots(local) && !badDots(domain);
  }

  // Telefone brasileiro com DDD: fixo com 10 dígitos (começando com 2 a 5)
  // ou celular com 11 dígitos (começando com 9).
  // Correção do BUG07: um celular incompleto, com 10 dígitos, era aceito como se fosse fixo.
  function isValidPhone(phone) {
    const original = String(phone || "");
    // Só são permitidos dígitos e os caracteres de máscara: espaço, parênteses e hífen.
    if (/[^\d\s()-]/.test(original)) return false;

    const digits = normalizePhone(original);
    const validDDD = /^[1-9][1-9]/.test(digits);
    if (!validDDD) return false;
    if (digits.length === 10) return /[2-5]/.test(digits[2]);
    if (digits.length === 11) return digits[2] === "9";
    return false;
  }

  // Valida o contato completo e devolve a lista de mensagens de erro (vazia = válido).
  function validateContact(contact, contacts = [], editingId = null) {
    const errors = [];

    if (!String(contact.name || "").trim()) errors.push("Informe o nome.");
    // Correção do BUG05: a mensagem antiga citava só o tamanho e confundia quando o nome era "@@".
    else if (!isValidName(contact.name)) errors.push("O nome deve ter pelo menos 2 caracteres e conter letras.");

    if (!String(contact.email || "").trim()) errors.push("Informe o e-mail.");
    else if (!isValidEmail(contact.email)) errors.push("Informe um e-mail válido, por exemplo nome@email.com.");

    if (!String(contact.phone || "").trim()) errors.push("Informe o telefone.");
    else if (!isValidPhone(contact.phone)) errors.push("Informe um telefone válido com DDD, por exemplo (21) 98765-4321.");

    // Bloqueia dois contatos com o mesmo e-mail (ignorando o próprio registro em edição).
    const email = normalizeEmail(contact.email);
    const duplicate = contacts.some(item =>
      normalizeEmail(item.email) === email && String(item.id) !== String(editingId)
    );
    if (email && duplicate) errors.push("Já existe um contato cadastrado com este e-mail.");

    return errors;
  }

  // Filtra contatos por nome, e-mail ou telefone, sem diferenciar maiúsculas.
  // Correção do BUG02: o telefone é comparado só pelos dígitos, então "98765-1234"
  // encontra o contato mesmo que ele tenha sido salvo como "11987651234".
  function filterContacts(contacts, query) {
    const text = String(query || "").trim().toLowerCase();
    if (!text) return contacts;
    // Correção do BUG06: o telefone só entra na comparação quando o texto não tem letras
    // nem outros símbolos. Antes, "carlos2" trazia todo contato com 2 no telefone.
    const looksLikePhone = /^[\d\s()-]+$/.test(text);
    const digits = looksLikePhone ? normalizePhone(text) : "";
    return contacts.filter(contact => {
      const matchesText = [contact.name, contact.email].some(field =>
        String(field || "").toLowerCase().includes(text)
      );
      const matchesPhone = digits !== "" && normalizePhone(contact.phone).includes(digits);
      return matchesText || matchesPhone;
    });
  }

  // Atualiza um contato pelo id, devolvendo a nova lista e se a atualização aconteceu.
  // Correção do BUG01: se o contato foi excluído durante a edição, "updated" volta false
  // e a tela não exibe uma mensagem falsa de sucesso.
  function updateContact(contacts, id, changes) {
    const exists = contacts.some(item => String(item.id) === String(id));
    if (!exists) return { updated: false, contacts };
    const updatedList = contacts.map(item =>
      String(item.id) === String(id) ? { ...item, ...changes } : item
    );
    return { updated: true, contacts: updatedList };
  }

  const api = {
    normalizeEmail, normalizePhone, isValidName, isValidEmail, isValidPhone,
    validateContact, filterContacts, updateContact
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ContactValidation = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
