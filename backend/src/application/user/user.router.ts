import express, { Router } from 'express'
import { createUserController, findUserByPseudo } from './user.controller'

const userRouter: Router = express.Router()

userRouter.post('/user/create', createUserController)

userRouter.post('/user/login', findUserByPseudo)

export default userRouter
