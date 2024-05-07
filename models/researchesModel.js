import { query, pool } from "../db/postgres.js";

export const allResearch = async () => {
  return (await query("select id, doi, pmid, name from research order by id asc")).rows
}

export const getResearch = async (id) => {
  return (await query("select * from research where id = $1", [id])).rows[0]
}

export const insertResearch = async (r) => {
  //{ name: '', pmid: '', doi: '', pdf_path: '', single: 'on', number: '', summary: '' }
  const val = [r.name, r.pmid, r.doi, r.pdf_path,r.single, r.number, r.summary]
  var ret
  const client = await pool.connect()
  const start = Date.now()
  try {
    await client.query("BEGIN")
    // transaction query
    ret = await client.query(
      "insert into research(name, pmid, doi, pdf_path, single, number, summary) values($1, $2, $3, $4, $5, $6, $7)",
      val)
    await client.query("END")
    const duration = Date.now() - start
    console.log(`transaction ended \x1b[95m${duration} ms\x1b[0m`)
  } catch (e) {
    await client.query("ROLLBACK")
    const duration = Date.now() - start
    console.log(`transaction rollback \x1b[95m${duration} ms\x1b[0m`)
    throw e
  } finally {
     client.release()
  }
  return ret.rows[0]
}

// check uniqueness of parameter
export const checkUnique = (column, param) => {
  // accept only unique columns
  if (column != 'name' || column != 'pmid' || column != 'doi' || column != 'pdf_path') {
    console.log('\x1b[31mNot valid column selected!\x1b[m')
    return false
  }
  return (await query("select * from research where $1 = $2", [column, param]).rowCount == 0
}
