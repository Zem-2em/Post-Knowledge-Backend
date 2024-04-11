import express, { Router } from 'express'
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
} from './comment.controller'

const commentRouter: Router = express.Router()

commentRouter.post('/comment/create', createComment)

commentRouter.get('/comments/post/:postId', getCommentsByPostId)

commentRouter.put('/comment/update/:id', updateComment)

commentRouter.delete('/comment/delete/:id', deleteComment)

export default commentRouter
