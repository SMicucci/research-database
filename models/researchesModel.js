import { query, transaction } from "../db/postgres.js";

// get all table, only few columns
export const allResearch = async () => {
  return (await query("select id, doi, pmid, name from research order by id asc")).rows
}

// get specific row based on id
export const getResearch = async (id) => {
  return (await query("select * from research where id = $1", [id])).rows[0]
}

// transaction to insert new research
export const insertResearch = async (r) => {
  //{ name: '', pmid: '', doi: '', pdf_path: '', single: 'on', number: '', summary: '' }
  const val = [r.name, r.pmid, r.doi, r.single, r.number, r.summary]
  return await transaction(
    "insert into research(name, pmid, doi, single, number, summary) values($1, $2, $3, $4, $5, $6)",
    val)
}

// check uniqueness of parameter
export const paramExist = async (column, param) => {
  // accept only unique columns
  if (column !== 'name' && column !== 'pmid' && column !== 'doi' && column !== 'pdf_path') {
    console.log('\t\x1b[31m!Not valid column selected!\x1b[m\n')
    return true // weak way to suggest an error, don't want to mess with trow exception rn
  }
  const res = await query("select * from research where $1 = $2", [column, param])
  return res.rowCount != 0 // if exist return true, else return false
}

export const getId = async (name, doi, pmid) => {
  const res = await query("select id from research where name = $1 and doi = $2 and pmid = $3",[name, doi, pmid])
  return res.rows[0].id
}
