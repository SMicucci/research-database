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
  return (await transaction(
    "insert into research(name, pmid, doi, single, number, summary) values($1, $2, $3, $4, $5, $6) returning *",
    [r.name, r.pmid, r.doi, r.single, r.number, r.summary]))
    .rows[0]
}

// transaction to update new research
export const updateValue = async (id, col, value) => {
  // sanityze col value
  if (col !== 'name' && col !== 'pmid' && col !== 'doi' && col !== 'single' && col !== 'number' && col !== 'summary' ) {
    console.log('\t\x1b[31mNot valid column selected!\x1b[m')
  } else {
    return (await transaction(`update research set ${col} = $1 where id = $2 returning ${col}`, [value, id])).rows[0]
  }
}

export const dropResearch = async (id) => {
  return (await transaction("delete from research where id = $1 returning *", [id])).rows[0]
}

// check uniqueness of parameter
export const paramExist = async (column, param) => {
  // sanityze column input to avoid injection
  if (column !== 'name' && column !== 'pmid' && column !== 'doi') {
    console.log('\t\x1b[31mNot valid column selected!\x1b[m')
    return true // weak way to suggest an error, don't want to mess with trow exception rn
  }
  const res = await query(`select * from research where ${column} = $1`, [param])
  return res.rowCount != 0 // if exist return true, else return false
}
