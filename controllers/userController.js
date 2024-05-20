import crypto from 'crypto'
import fs from 'fs'
import {paramExist} from '../models/researchesModel.js'

export const signupUser = async (req, res) => {
  console.log("\x1b[33m[signinUser]\x1b[0m")
  console.log('body: ',req.body)
  const salt = crypto.randomBytes(2048)
  const password = crypto.scryptSync(
    req.body.password, salt, 2048)
  const user = {
    name: req.body.name,
    email: req.body.email,
    salt: salt.toString('base64'),
    password: password.toString('base64'),
  }
  res.status(200)
  res.end()
}

export const loginUser = async (req, res) => {
  console.log("\x1b[33m[loginUser]\x1b[0m")
}

export const signupPage = async (req, res) => {
  console.log("\x1b[33m[signinPage]\x1b[0m")
  // header, just fun
  console.log('header:')
  console.log('Host: ',req.get('Host'))
  console.log('User-Agent: ',req.get('User-Agent'))
  console.log('Connection: ',req.get('Connection'))
  // end header
  if (Object.keys(req.query) == 0) {
    res.render('user/signin')
  } else {
    var valid = {}
    if (req.query.name)
      valid.name = await paramExist('name', req.query.name)
    if (req.query.email)
      valid.email = await paramExist('email', req.query.email)
    if (req.query.password)
      valid.password = await validatePassword(req.query.password)
    res.status(200).json(valid)
  }
}

export const loginPage = async (req, res) => {
  console.log("\x1b[33m[loginPage]\x1b[0m")
  res.render('user/login')
}

const validatePassword = async (value) => {
  var samples
  fs.readFile('../db/leakedpassword.txt',
    (err, data) => {
      if (err)
        throw err
      samples = data.split('\n')
      console.log(samples)
    })
  return await samples.indexOf(value) != -1
}
