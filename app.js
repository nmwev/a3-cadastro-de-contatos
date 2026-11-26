// Lógica da tela: liga o formulário, a listagem e o LocalStorage às funções de validation.js.
(() => {
  const STORAGE_KEY = "scc_contacts_v1";
  const form = document.getElementById("contact-form");
  const list = document.getElementById("contact-list");
  const feedback = document.getElementById("feedback");
  const search = document.getElementById("search");
  const idField = document.getElementById("contact-id");
  const formTitle = document.getElementById("form-title");
  const saveButton = document.getElementById("save-button");
  const cancelEdit = document.getElementById("cancel-edit");
  const count = document.getElementById("contact-count");

  let contacts = loadContacts();

  // Lê os contatos salvos; se o conteúdo estiver corrompido, começa com lista vazia.
  function loadContacts() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  function value(id) {
    return document.getElementById(id).value.trim();
  }

  function showMessage(message, type = "success") {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
  }

  function clearMessage() {
    feedback.textContent = "";
    feedback.className = "feedback";
  }

  function getFormContact() {
    return { name: value("name"), email: value("email"), phone: value("phone") };
  }

  // Volta o formulário para o modo "cadastrar".
  function resetForm() {
    form.reset();
    idField.value = "";
    formTitle.textContent = "Novo contato";
    saveButton.textContent = "Adicionar à agenda";
    cancelEdit.hidden = true;
  }

  // Exibe o telefone com máscara: (21) 98765-4321 ou (21) 3333-4444.
  function formatPhone(phone) {
    const d = ContactValidation.normalizePhone(phone);
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return phone;
  }

  function renderContacts() {
    const filtered = ContactValidation.filterContacts(contacts, search.value);

    count.textContent = String(contacts.length);
    if (!filtered.length) {
      list.innerHTML = `<tr><td colspan="4" class="empty">${contacts.length ? "Nenhum contato encontrado com esse texto." : "Sua agenda ainda está vazia."}</td></tr>`;
      return;
    }

    list.innerHTML = filtered.map(contact => `
      <tr>
        <td><strong>${escapeHTML(contact.name)}</strong></td>
        <td>${escapeHTML(contact.email)}</td>
        <td>${escapeHTML(formatPhone(contact.phone))}</td>
        <td>
          <div class="row-actions">
            <button class="action-btn" data-action="edit" data-id="${escapeHTML(contact.id)}">Alterar</button>
            <button class="action-btn delete" data-action="delete" data-id="${escapeHTML(contact.id)}">Remover</button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  // Evita que o texto digitado seja interpretado como HTML (proteção contra injeção).
  function escapeHTML(input) {
    return String(input ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[char]);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    clearMessage();

    const contact = getFormContact();
    const editingId = idField.value || null;
    const errors = ContactValidation.validateContact(contact, contacts, editingId);

    if (errors.length) {
      showMessage(errors.join(" "), "error");
      return;
    }

    if (editingId) {
      const result = ContactValidation.updateContact(contacts, editingId, contact);
      if (!result.updated) {
        // BUG01: o contato foi excluído enquanto estava em edição.
        resetForm();
        showMessage("Este contato não existe mais (foi excluído). Nenhuma alteração foi salva.", "error");
        return;
      }
      contacts = result.contacts;
      showMessage("Alterações gravadas.");
    } else {
      contacts.push({ id: crypto.randomUUID(), ...contact });
      showMessage("Contato adicionado à agenda.");
    }

    saveContacts();
    resetForm();
    renderContacts();
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const contact = contacts.find(item => item.id === button.dataset.id);
    if (!contact) return;

    if (button.dataset.action === "edit") {
      idField.value = contact.id;
      document.getElementById("name").value = contact.name;
      document.getElementById("email").value = contact.email;
      document.getElementById("phone").value = contact.phone;
      formTitle.textContent = "Alterando contato";
      saveButton.textContent = "Gravar alterações";
      cancelEdit.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
      clearMessage();
    }

    if (button.dataset.action === "delete") {
      const confirmed = window.confirm(`Remover ${contact.name} da agenda?`);
      if (!confirmed) return;
      contacts = contacts.filter(item => item.id !== contact.id);
      // BUG01: se o contato excluído estava aberto para edição, o formulário volta ao modo cadastro.
      if (idField.value === contact.id) resetForm();
      saveContacts();
      renderContacts();
      showMessage("Contato removido da agenda.");
    }
  });

  cancelEdit.addEventListener("click", () => {
    resetForm();
    clearMessage();
  });

  document.getElementById("clear-form").addEventListener("click", () => {
    setTimeout(() => {
      idField.value = "";
      formTitle.textContent = "Novo contato";
      saveButton.textContent = "Adicionar à agenda";
      cancelEdit.hidden = true;
      clearMessage();
    }, 0);
  });

  search.addEventListener("input", renderContacts);
  renderContacts();
})();
