import { database } from '../db/client'

export class CharacterAttributeRepository {
  static async createCharacterAttribute(
    characterId: number,
    attributeId: number,
    level: number
  ) {
    return await database.characterAttribute.create({
      data: {
        level,
        attributeId,
        characterId,
      },
    })
  }

  static async updateCharacterAttributeLevel(
    characterAttributeId: number,
    level: number
  ) {
    return await database.characterAttribute.update({
      data: { level },
      where: { id: characterAttributeId },
    })
  }
}
