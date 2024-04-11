import express, { Router } from 'express'
import {
  createPostController,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostPhotosById,
  updatePostVideosById,
  updatePostBodyById,
  updatePostRecordingsById,
} from './post.controller'
import upload from '../../../multer.config'

const postRouter: Router = express.Router()

postRouter.post(
  '/post/create',
  upload.fields([
    { name: 'photos' },
    { name: 'recordings' },
    { name: 'videos' },
    { name: 'picto' },
  ]),
  createPostController
)

postRouter.get('/post/findall', getAllPosts)

postRouter.get('/post/:id', getPostById)

postRouter.put(
  '/post/update/photos/:id',
  upload.single('photo'),
  updatePostPhotosById
)

postRouter.put(
  '/post/update/videos/:id',
  upload.single('video'),
  updatePostVideosById
)

postRouter.put(
  '/post/update/records/:id',
  upload.single('record'),
  updatePostRecordingsById
)

postRouter.put('/post/update/body/:id', updatePostBodyById)

postRouter.delete('/post/delete/:id', deletePostById)

export default postRouter
