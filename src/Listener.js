class Listener {
  constructor(noteService, mailSender) {
    this._noteService = noteService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      console.log(userId, targetEmail);
      const notes = await this._noteService.getNotes(userId);

      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
