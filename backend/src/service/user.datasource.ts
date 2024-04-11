import { Logger, ILogObj } from 'tslog'
import prisma from '../../prisma/prisma'
import { RoleType } from '../entity/role.entity'
import * as bcrypt from 'bcrypt'

export interface User {
  pseudo: string
  password: string
  role: RoleType
}

export const prismaCreateUser = async (user: User) => {
  const newUser = await prisma.user.create({
    data: { ...user },
  })

  return newUser
}

export const prismaFindUserByPseudo = async (
  pseudo: string,
  password: string
) => {
  const userToFind = await prisma.user.findUnique({
    where: {
      pseudo,
    },
  })

  // const hash: string | undefined = userToFind ? userToFind.password : ''

  if (!userToFind) {
    throw new Error(`No user found for pseudo ${pseudo}`)
  }

  // if (!(await bcrypt.compare(password, hash))) {
  //   throw new Error('Incorrect Password')
  // }

  return userToFind
}
