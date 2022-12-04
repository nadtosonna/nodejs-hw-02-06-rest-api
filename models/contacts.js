const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data?.find((contact) => contact.id === id);
  return contact || null;
}

const updateListContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts?.splice(contactIndex, 1);
  await updateListContacts(contacts);
  return result;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
        id: ((contacts.length + 1).toString()),
    };
    contacts?.push(newContact);
    await updateListContacts(contacts);
    return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id, ...body };
  await updateListContacts(contacts);
  return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
