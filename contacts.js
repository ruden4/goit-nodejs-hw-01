const fs = require('fs/promises');
const path = require('node:path'); 

const contactsPath = path.join(__dirname,'/db/contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const data = await listContacts();
    const currentContact = data.find(({ id }) => id === contactId);
    return currentContact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();

    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return result;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    
    const newContact = {
        id: String(Date.now()),
        name,
        email,
        phone,
    }

    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact||null;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}