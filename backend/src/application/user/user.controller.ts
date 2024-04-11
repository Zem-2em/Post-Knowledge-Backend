import { Logger, ILogObj } from 'tslog'
import {
  User,
  prismaCreateUser,
  prismaFindUserByPseudo,
} from '../../service/user.datasource'
import { Request, Response } from 'express'

const logger: Logger<ILogObj> = new Logger()

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.body as User

    const createUser = await prismaCreateUser(user)

    res.status(201).json(createUser)
  } catch (error) {
    logger.error("Erreur lors de la création de l'utilisateur:", error)
    res
      .status(400)
      .json({ error: "Erreur lors de la création de l'utilisateur" })
  }
}
export const findUserByPseudo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pseudo, password } = req.body

    const userToFind = await prismaFindUserByPseudo(pseudo, password)

    res.status(201).json(userToFind)
  } catch (error) {
    logger.error("Impossible de trouver l'utilisateur:", error)
    res.status(400).json({ error: "Impossible de trouver l'utilisateur" })
  }
}
