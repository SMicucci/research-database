import { query, pool } from "../db/postgres.js";

export const allResearch = async () => {
  return (await query("select id, doi, pmid, name from research order by id asc")).rows
}

export const getResearch = async (id) => {
  return (await query("select * from research where id = $1", [id])).rows[0]
}

export const insertResearch = async (r) => {
  //const id = (await query('select max(id) from research')).rows[0]
  //console.log('max(id):',id)
  const val = [r.doi, r.pmid, r.pdf_path, r.name, r.summary, r.single, r.number]
  var ret
  const client = pool.client()
  try {
    await client.query('BEGIN')
    // transaction query
    ret = await client.query('insert into research(doi, pmid, pdf_path, name, summary, single, number) value($1, $2, $3, $4, $5, $6, $7)',val)
    ret = ret.rows[0]
    await client.query('END')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.realise()
  }
  return ret
}

export const maxResearch = async () => {
  return (await query('select max(id) from research')).rows[0]
}
