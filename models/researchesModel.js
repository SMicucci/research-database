import { query, transaction } from "../db/postgres.js";

// get all table, only few columns
export const allResearch = async () => {
  return (await query("select * from research order by id asc")).rows
}

// get specific row based on id
export const getResearch = async (id) => {
  return (await query("select * from research where id = $1", [id])).rows[0]
}

// transaction to insert new research
export const insertResearch = async (r) => {
  if (r.pmid) {
    return (await transaction(
      "insert into research(name, pmid, doi) values($1, $2, $3) returning *",
      [r.name, r.pmid, r.doi]))
      .rows[0]
  } else {
    return (await transaction(
      "insert into research(name, doi) values($1, $2) returning *",
      [r.name, r.doi]))
      .rows[0]
  }
}

// Probably this is removed
// transaction to update new research
export const updateValue = async (id, col, value) => {
  // sanityze col value
  //console.log(Object.keys((await allResearch())[0]))
  if (col !== 'name' && col !== 'pmid' && col !== 'doi' && col !== 'pdf') {
    console.log('\t\x1b[31mNot valid column selected!\x1b[m')
  } else {
    return (await transaction(`update research set ${col} = $1 where id = $2 returning ${col}`, [value, id])).rows[0]
  }
}

// transaction to remove a research
export const dropResearch = async (id) => {
  return (await transaction("delete from research where id = $1 returning *", [id])).rows[0]
}

// check uniqueness
export const paramExist = async (column, param) => {
  // sanityze column to avoid injection
  if (column != 'name' && column != 'pmid' && column != 'doi') {
    console.log('\t\x1b[31mINJECTION ATTEMPT!\x1b[m')
    console.log('\t\x1b[36mInput sanityzed\x1b[m ', '\t\x1b[93m[', column, ']\x1b[m')
    return true
  }
  const res = await query(`select * from research where ${column} = $1`, [param])
  return res.rowCount != 0 // if exist return true, else return false
}
