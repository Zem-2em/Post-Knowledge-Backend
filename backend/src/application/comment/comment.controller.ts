import { Request, Response } from 'express'
import {
  Comment,
  prismaCreateComment,
  prismaDeleteComment,
  prismaFindCommentsByPostId,
  prismaUpdateComment,
} from '../../service/comment.datasource'

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = req.body as Comment

    const newComment = await prismaCreateComment(comment)

    res.status(201).json(newComment)
  } catch (error) {
    console.error(`Error creating comment: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while creating the comment.' })
  }
}

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)

    if (isNaN(postId)) {
      res.status(400).json({ error: 'Invalid post ID' })
      return
    }

    const comments = await prismaFindCommentsByPostId(postId)

    res.status(201).json(comments)
  } catch (error) {
    console.error(`Error fetching comments by post ID: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching comments by post ID.' })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const commentUpdate = req.body as Comment

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid comment ID' })
      return
    }

    const updatedComment = await prismaUpdateComment(id, commentUpdate)

    if (!updatedComment) {
      res.status(404).json({ error: 'Comment not found' })
      return
    }

    res.status(200).json(updatedComment)
  } catch (error) {
    console.error(`Error updating comment: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the comment.' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid comment ID' })
      return
    }

    const deletedComment = await prismaDeleteComment(id)

    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(`Error deleting comment: ${error}`)
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the comment.' })
  }
}
