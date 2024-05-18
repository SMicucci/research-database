import { query, transaction } from "../db/postgres.js";
import crypto from 'crypto'

export const createUser = async (user) => {
  var record = {
    name: user.name,
    email: user.email,
  }
  console.log(user)
}

export const controlUser = async (user) => {
  const checkName = await paramExist('name', user.name)
  const checkEmail = await paramExist('email', user.email)
  const checkPasswd = false
  console.log(user)
}

export const paramExist = async (column, param) => {
  // sanityze column to avoid injection
  if (column != 'name' && column != 'email') {
    console.log('\t\x1b[31mINJECTION ATTEMPT!\x1b[m')
    console.log('\t\x1b[36mInput sanityzed\x1b[m ',
      '\t\x1b[93m[', column, ']\x1b[m')
    return true
  }
  const res = await query(`select name from user where ${column}=$1`, [param])
  return (res.rowCount == 0)
}
