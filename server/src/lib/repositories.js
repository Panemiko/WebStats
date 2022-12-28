import { PrismaClient } from '@prisma/client'

// Initialize database
export const database = new PrismaClient()

export async function getCharacterById(characterId, includeSub = true) {
  return await database.character.findUnique({
    where: { id: characterId },
    include: includeSub && {
      abilities: true,
      attributes: true,
      items: true,
      skills: true,
    },
  })
}

export async function getAllAttributes() {
  return await database.attribute.findMany({ orderBy: { id: 'asc' } })
}

export async function getAllSkills() {
  return await database.skill.findMany({ orderBy: { id: 'asc' } })
}

export async function updateCharacter(characterId, data) {
  return await database.character.update({
    where: { id: characterId },
    data: {
      ...data,
    },
  })
}
