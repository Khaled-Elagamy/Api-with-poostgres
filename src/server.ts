import express, { Request, Response, Application } from 'express'
import logger from './middleware/logger'
import helmet from 'helmet'
import errorMiddleware from './middleware/error'
import limiter from './middleware/Raterlimit'
import routes from './routes'
import config from './config'
import db from './database'

const app: Application = express()
const port = config.port || 3000

//Parser middleware
app.use(express.json())
//Security middleware
app.use(helmet())
//Logger middleware
app.use(logger)
//Rate limiter middleware
app.use(limiter)
//Error handler middleware
app.use(errorMiddleware)
//Routes
app.use('/api', routes)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release()
      console.log(res.rows)
    })
    .catch((err) => {
      client.release()
      console.log(err.stack)
    })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Get back to the documentation',
  })
})
app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`)
})

export default app
