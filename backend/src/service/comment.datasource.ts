import prisma from '../../prisma/prisma'

export interface Comment {
  text: string
  videos?: string[]
  recordings?: string[]
  photos?: string[]
  authorId: number
  postId: number
  visibility?: boolean
}

export const prismaCreateComment = async (comment: Comment) => {
  const newComment = await prisma.comment.create({
    data: {
      ...comment,
    },
  })

  return newComment
}

export const prismaFindCommentsByPostId = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  })

  return comments
}

export const prismaUpdateComment = async (id: number, comment: Comment) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: id,
    },
    data: comment,
  })

  return updatedComment
}

export const prismaDeleteComment = async (commentId: number) => {
  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  })

  return deletedComment
}
