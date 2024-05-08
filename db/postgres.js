// load variables to access RBDSM
import dotenv from 'dotenv'
dotenv.config()

// start client pool
import pg from 'pg'
const pool = new pg.Pool()

// pool query with logger 
export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log(`query executed \x1b[95m${duration} ms\x1b[0m\n\t\x1b[92m${text}\x1b[0m\n\trows:\x1b[33m${res.rowCount}\x1b[0m`)
  return res
}

// pool transaction with logger
export const transaction = async (text, params) => {
  const client = await pool.connect()
  var res
  const start = Date.now()
  // start transaction
  try {
    await client.query('BEGIN')
    res = await client.query(text, params)
    await client.query('COMMIT')
    const duration = Date.now() - start
    console.log(`transaction executed \x1b[95m${duration}\x1b[0m\n\t\x1b[92m${text}\x1b[0m`)
  } 
  // transaction reverse in case of error
  catch (e) {
    await client.query('ROLLBACK')
    const duration = Date.now() - start
    console.log(`transaction denied \x1b[31m${duration}\x1b[0m\n\t\x1b[91m${text}\x1b[0m`)
    throw e
  }
  // resource release after transaction
  finally {
    client.release()
    return res
  }
}
