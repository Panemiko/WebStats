import type { Character } from '@prisma/client'

import { database } from '../db/client'

export class CharacterRepository {
  static async getCharacterById(characterId: number) {
    return await database.character.findUnique({
      where: { id: characterId },
      include: {
        abilities: true,
        attributes: true,
        items: true,
        skills: true,
      },
    })
  }

  static async updateCharacterById(
    characterId: number,
    data: Partial<Character>
  ) {
    return await database.character.update({
      where: { id: characterId },
      data,
      include: {
        abilities: true,
        attributes: true,
        items: true,
        skills: true,
      },
    })
  }
}
