import { Request, Response } from 'express'
import {
  prismaAddBodyToPost,
  prismaAddPhotoToPost,
  prismaAddRecordingToPost,
  prismaAddVideoToPost,
  prismaCreatePost,
  prismaDeletePostById,
  prismaFindAllPosts,
  prismaFindPostById,
} from '../../service/post.datasource'

export const createPostController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      area,
      picto,
      authorId,
      visibility,
      themeColor,
    } = req.body

    const post = {
      title,
      body: [],
      date: new Date(date).toISOString(),
      area,
      videos: [],
      recordings: [],
      photos: [],
      picto,
      description,
      authorId: parseInt(authorId, 10),
      visibility: visibility === 'true',
      themeColor,
    }

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }
      if (files.picto && files.picto[0]) post.picto = files.picto[0].path
    }

    const newPost = await prismaCreatePost(post)
    res.status(201).json(newPost)
  } catch (error) {
    console.error(`Error creating post: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while creating the post.' })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await prismaFindAllPosts()
    res.status(201).json(allPosts)
  } catch (error) {
    console.error(`Error fetching all posts: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching all posts.' })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)

    if (isNaN(postId)) {
      res.status(400).json({ error: 'Invalid post ID' })
      return
    }

    const post = await prismaFindPostById(postId)

    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    res.status(201).json(post)
  } catch (error) {
    console.error(`Error fetching post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the post by ID.' })
  }
}

export const updatePostPhotosById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' })
    }

    const { id, url, position, size, rotation } = req.body
    const { path: filePath } = req.file ?? {}
    if (url.startsWith('blob') && !filePath) {
      return res
        .status(400)
        .json({ error: 'Still a preview and photo not received' })
    }

    const photo = {
      ...(id && { id: parseInt(id) }),
      url: url.startsWith('blob') ? filePath : url,
      position: JSON.parse(position),
      size: JSON.parse(size),
      rotation: parseInt(rotation),
    }
    await prismaAddPhotoToPost(postId, photo)
    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error(`Error updating post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the post.' })
  }
}

export const updatePostVideosById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' })
    }

    const { id, url, position, size, rotation } = req.body
    const { path: filePath } = req.file ?? {}
    if (url.startsWith('blob') && !filePath) {
      return res
        .status(400)
        .json({ error: 'Still a preview and video not received' })
    }

    const video = {
      ...(id && { id: parseInt(id) }),
      url: url.startsWith('blob') ? filePath : url,
      position: JSON.parse(position),
      size: JSON.parse(size),
      rotation: parseInt(rotation),
    }
    await prismaAddVideoToPost(postId, video)
    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error(`Error updating post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the post.' })
  }
}

export const updatePostRecordingsById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' })
    }

    const { id, url, position, size, rotation } = req.body
    const { path: filePath } = req.file ?? {}
    if (url.startsWith('blob') && !filePath) {
      return res
        .status(400)
        .json({ error: 'Still a preview and video not received' })
    }

    const recording = {
      ...(id && { id: parseInt(id) }),
      url: url.startsWith('blob') ? filePath : url,
      position: JSON.parse(position),
      size: JSON.parse(size),
      rotation: parseInt(rotation),
    }
    await prismaAddRecordingToPost(postId, recording)
    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error(`Error updating post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the post.' })
  }
}

export const updatePostBodyById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' })
    }
    const { body } = req.body
    await prismaAddBodyToPost(postId, body)
    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    console.error(`Error updating post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the post.' })
  }
}

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10)

    if (isNaN(postId)) {
      res.status(400).json({ error: 'Invalid post ID' })
      return
    }

    const deletedPost = await prismaDeletePostById(postId)

    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(`Error deleting post by ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the post by ID.' })
  }
}
