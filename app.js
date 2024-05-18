import express from 'express'
import morgan from 'morgan'
import bp from 'body-parser'
import fu from 'express-fileupload'

// ROUTERS
import researchRouter from './routes/researchRouter.js'
import userRouter from './routes/userRouter.js'

// CONNECTION STATIC PARAMS
const hostname = "http://127.0.0.1"
const port = 3000

const app = express()

// RENDER
app.set('view engine', 'ejs')

// MIDDLEWERE
app.use(morgan('short'))
app.use(fu())
app.use(bp.urlencoded({ extended: true }))

//static asset <not as much happy about btw>
app.use(express.static('./public'))

// Router
app.use('/research', researchRouter)
app.use('/user', userRouter)

//root
app.get('/', (req, res) => {
  res.redirect('/user/signin')
})

// route not defined
app.all('*', (req,res) => {
  res.status(404).send("<h1>Resource not found</h1>")
})

app.listen(port, () => {
  console.log(`listening on ${hostname}:${port}`)
})

