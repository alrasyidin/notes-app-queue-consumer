const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();

    // this.getNotes = this.getNotes.bind(this);
  }

  async getNotes(userId) {
    const query = {
      text: `
            SELECT n.* 
            from notes n
            LEFT JOIN collaborations c ON c.note_id = n.id
            WHERE n.owner = $1 OR c.id = $1
            GROUP BY n.id
          `,
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = NotesService;
