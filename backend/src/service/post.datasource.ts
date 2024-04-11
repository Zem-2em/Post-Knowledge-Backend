import prisma from '../../prisma/prisma'

export interface Photo {
  id: number
  url: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}

export interface Video {
  id: number
  url: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}

export interface Record {
  id: number
  url: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
}

export interface Paragraph {
  id: number
  text: string
  size: { width: number; height: number }
  position: { x: number; y: number }
  rotation: number
  font: string
}

export interface Post {
  title: string
  body: Paragraph[]
  date: string
  area: string
  videos: Video[]
  recordings: Record[]
  photos: Photo[]
  picto: string
  description?: string
  authorId: number
  visibility?: boolean
  themeColor: string
}

export const prismaCreatePost = async (post: Post) => {
  const { photos, body, videos, recordings, ...data } = post
  await prisma.post.create({
    data,
  })
}

export const prismaFindAllPosts = async () => {
  return await prisma.post.findMany()
}

export const prismaFindPostById = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      body: true,
      photos: true,
      videos: true,
      recordings: true,
    },
  })
}

export const prismaAddPhotoToPost = async (postId: number, photo: Photo) => {
  if (photo.id) {
    return await prisma.photo.update({
      where: { id: photo.id },
      data: {
        url: photo.url,
        position: photo.position,
        size: photo.size,
        rotation: photo.rotation,
        postId: postId,
      },
    })
  } else {
    return prisma.photo.create({
      data: {
        url: photo.url,
        position: photo.position,
        size: photo.size,
        rotation: photo.rotation,
        postId: postId,
      },
    })
  }
}

export const prismaAddVideoToPost = async (postId: number, video: Video) => {
  if (video.id) {
    return await prisma.video.update({
      where: { id: video.id },
      data: {
        url: video.url,
        position: video.position,
        size: video.size,
        rotation: video.rotation,
        postId: postId,
      },
    })
  } else {
    return prisma.video.create({
      data: {
        url: video.url,
        position: video.position,
        size: video.size,
        rotation: video.rotation,
        postId: postId,
      },
    })
  }
}

export const prismaAddRecordingToPost = async (
  postId: number,
  record: Record
) => {
  if (record.id) {
    return await prisma.record.update({
      where: { id: record.id },
      data: {
        url: record.url,
        position: record.position,
        size: record.size,
        rotation: record.rotation,
        postId: postId,
      },
    })
  } else {
    return prisma.record.create({
      data: {
        url: record.url,
        position: record.position,
        size: record.size,
        rotation: record.rotation,
        postId: postId,
      },
    })
  }
}

export const prismaAddBodyToPost = async (
  postId: number,
  body: Paragraph[]
) => {
  body.map(async (paragraph) => {
    if (paragraph.id) {
      return await prisma.paragraph.update({
        where: { id: paragraph.id },
        data: {
          text: paragraph.text,
          position: paragraph.position,
          size: paragraph.size,
          rotation: paragraph.rotation,
          font: paragraph.font,
          postId: postId,
        },
      })
    } else {
      return prisma.paragraph.create({
        data: {
          text: paragraph.text,
          position: paragraph.position,
          size: paragraph.size,
          rotation: paragraph.rotation,
          font: paragraph.font,
          postId: postId,
        },
      })
    }
  })
}

export const prismaDeletePostById = async (postId: number) => {
  return await prisma.post.delete({
    where: {
      id: postId,
    },
  })
}
