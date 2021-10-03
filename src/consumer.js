require('dotenv').config();
const amqp = require('amqplib');

const Listener = require('./Listener');
const MailSender = require('./MailSender');
const NotesService = require('./NotesService');

const consume = async () => {
  const noteService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(noteService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:notes', { durable: true });

  channel.consume('export:notes', listener.listen, { noAck: true });
};

consume();
