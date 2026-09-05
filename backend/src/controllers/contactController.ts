import type { Request, Response } from 'express';
import Contact from '../models/Contact';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

interface CreateContactBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  itemName?: string;
  itemId?: string;
}

interface AcknowledgeContactBody {
  message?: string;
}

async function createContact(req: Request<unknown, unknown, CreateContactBody>, res: Response): Promise<void> {
  const { name, email, phone, message, itemName, itemId } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' });
    return;
  }
  if (!message || !message.trim()) {
    res.status(400).json({ error: 'message is required' });
    return;
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
    itemName,
    item: itemId || null,
    user: req.user ? req.user.id : null,
  });
  res.status(201).json(contact);
}

async function listContacts(req: Request, res: Response): Promise<void> {
  const contacts = await Contact.find().populate('user', 'name email phone').sort({ createdAt: -1 });
  res.json(contacts);
}

async function listMyContacts(req: Request, res: Response): Promise<void> {
  const contacts = await Contact.find({ user: req.user?.id }).sort({ createdAt: -1 });
  res.json(contacts);
}

async function acknowledgeContact(
  req: Request<{ id: string }, unknown, AcknowledgeContactBody>,
  res: Response
): Promise<void> {
  const { message } = req.body;

  if (!message || !message.trim()) {
    res.status(400).json({ error: 'message is required' });
    return;
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ error: 'Query not found' });
    return;
  }

  contact.status = 'acknowledged';
  contact.adminReply = message;
  contact.repliedAt = new Date();
  await contact.save();

  res.json(contact);
}

export { createContact, listContacts, listMyContacts, acknowledgeContact };
