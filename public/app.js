const API_URL = "/api/contacts";

const contactForm = document.getElementById("contactForm");
const contactIdInput = document.getElementById("contactId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");
const refreshButton = document.getElementById("refreshButton");
const contactsTable = document.getElementById("contactsTable");
const contactsCount = document.getElementById("contactsCount");
const emptyState = document.getElementById("emptyState");
const statusText = document.getElementById("statusText");

let contacts = [];

const setStatus = (message, isError = false) => {
  statusText.textContent = message;
  statusText.className = isError
    ? "min-w-32 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-center text-sm font-bold text-rose-600"
    : "min-w-32 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-sm font-bold text-emerald-700";
};

const resetForm = () => {
  contactForm.reset();
  contactIdInput.value = "";
  formTitle.textContent = "Add Contact";
  submitButton.textContent = "Save Contact";
};

const renderContacts = () => {
  contactsTable.innerHTML = "";
  contactsCount.textContent =
    contacts.length === 1 ? "1 saved contact" : `${contacts.length} saved contacts`;
  emptyState.classList.toggle("hidden", contacts.length > 0);

  contacts.forEach((contact) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const actionsCell = document.createElement("td");
    const actions = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    row.className = "border-b border-slate-200";
    nameCell.className = "px-4 py-3 text-sm";
    emailCell.className = "px-4 py-3 text-sm";
    phoneCell.className = "px-4 py-3 text-sm";
    actionsCell.className = "px-4 py-3 text-sm";

    nameCell.textContent = contact.name;
    emailCell.textContent = contact.email;
    phoneCell.textContent = contact.phone;

    actions.className = "flex gap-2";

    editButton.className =
      "min-h-9 rounded-md bg-blue-50 px-3 font-bold text-blue-700 hover:bg-blue-100";
    editButton.type = "button";
    editButton.dataset.action = "edit";
    editButton.dataset.id = contact._id;
    editButton.textContent = "Edit";

    deleteButton.className =
      "min-h-9 rounded-md bg-rose-50 px-3 font-bold text-rose-600 hover:bg-rose-100";
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = contact._id;
    deleteButton.textContent = "Delete";

    actions.append(editButton, deleteButton);
    actionsCell.appendChild(actions);
    row.append(nameCell, emailCell, phoneCell, actionsCell);

    contactsTable.appendChild(row);
  });
};

const loadContacts = async () => {
  try {
    setStatus("Loading");
    const response = await fetch(API_URL);
    contacts = await response.json();
    renderContacts();
    setStatus("Ready");
  } catch (error) {
    setStatus("API error", true);
  }
};

const saveContact = async (event) => {
  event.preventDefault();

  const id = contactIdInput.value;
  const contactData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
  };

  try {
    setStatus("Saving");

    const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Could not save contact");
    }

    resetForm();
    await loadContacts();
    setStatus(id ? "Updated" : "Created");
  } catch (error) {
    setStatus(error.message, true);
  }
};

const editContact = (id) => {
  const contact = contacts.find((item) => item._id === id);

  if (!contact) {
    return;
  }

  contactIdInput.value = contact._id;
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
  formTitle.textContent = "Edit Contact";
  submitButton.textContent = "Update Contact";
};

const deleteContact = async (id) => {
  const shouldDelete = window.confirm("Delete this contact?");

  if (!shouldDelete) {
    return;
  }

  try {
    setStatus("Deleting");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Could not delete contact");
    }

    await loadContacts();
    setStatus("Deleted");
  } catch (error) {
    setStatus(error.message, true);
  }
};

contactsTable.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const id = button.dataset.id;

  if (button.dataset.action === "edit") {
    editContact(id);
  }

  if (button.dataset.action === "delete") {
    deleteContact(id);
  }
});

contactForm.addEventListener("submit", saveContact);
resetButton.addEventListener("click", resetForm);
refreshButton.addEventListener("click", loadContacts);

loadContacts();
