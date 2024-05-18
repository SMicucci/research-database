import crypto from 'crypto'

export const signinUser = async (req, res) => {
  console.log("\x1b[33m[signinUser]\x1b[0m")
  console.log('body: ',req.body)
  const salt = crypto.randomBytes(2048).toString('hex')
  const password = crypto.scryptSync(
    req.body.password, salt, 2048).toString('hex')
  const user = {
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    password: password,
  }
  console.log(user)
}

export const loginUser = async (req, res) => {
  console.log("\x1b[33m[loginUser]\x1b[0m")
}

export const signinPage = async (req, res) => {
  console.log("\x1b[33m[signinPage]\x1b[0m")
  res.render('user/signin')
}

export const loginPage = async (req, res) => {
  console.log("\x1b[33m[loginPage]\x1b[0m")
  res.render('user/login')
}
