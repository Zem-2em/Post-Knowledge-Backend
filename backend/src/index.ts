import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { Logger, ILogObj } from 'tslog'
import userRouter from './application/user/user.router'
import postRouter from './application/post/post.router'
import commentRouter from './application/comment/comment.router'

const logger: Logger<ILogObj> = new Logger()

dotenv.config()

export const app: Express = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/', (req: Request, res: Response) => {
  res.send('Panache')
})

app.listen(process.env.PORT, () => {
  logger.info(`⚡️ [server]: Server is running at port: %s`, process.env.PORT)
})

app.use('/', userRouter)
app.use('/', postRouter)
app.use('/', commentRouter)
