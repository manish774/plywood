const Contact = require('../models/Contact');

const EMAIL_RE = /^\S+@\S+\.\S+$/;

async function createContact(req, res) {
  const { name, email, phone, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const contact = await Contact.create({ name, email, phone, message });
  res.status(201).json(contact);
}

async function listContacts(req, res) {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
}

module.exports = { createContact, listContacts };
