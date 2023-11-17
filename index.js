const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const allContats = await contacts.listContacts();
        return console.log(allContats);
      break;

    case 'get':
          const idContact = await contacts.getContactById(id);
          return console.log(idContact);
      break;

    case 'add':
          const newContact = await contacts.addContact(name, email, phone);
          return console.log(newContact);
      break;

    case 'remove':
          const removedContact = await contacts.removeContact(id);
          return console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// node index.js --action="list";

// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6;

// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22;

// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH

