/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('research', {
    id: 'id',
    name: {type: 'varchar(80)', unique: true, notNull: true},
    pmid: {type: 'bigint', unique: true, notNull: false},
    doi: {type: 'varchar(80)', unique: true, notNull: true},
  })
  /*
  pgm.createTable('comment', {
    id: 'id',
    researchId: {type: 'integer', references: 'research', notNull: true},
    summary: {type: 'text', notNull: true},
  })
  */
};
