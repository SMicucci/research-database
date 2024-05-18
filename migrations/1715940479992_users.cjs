/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pmg.createTable('user', {
    name: {type: 'varchar(64)', unique: true, notNull: true, primaryKey: true},
    email: {type: 'varchar(320)', unique: true, notNull: true},
    hashPassword: {type: 'varchar(1024)', unique: true, notNull: true},
    salt: {type: 'varchar(1024)', notNull: true},
  })
};
