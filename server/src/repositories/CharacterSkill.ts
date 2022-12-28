import { database } from 'db/client'

export class CharacterSkillRepository {
  static async createCharacterSkill(
    characterId: number,
    skillId: number,
    level: number
  ) {
    return await database.characterSkill.create({
      data: {
        level,
        skillId,
        characterId,
      },
    })
  }

  static async updateCharacterSkillLevel(
    characterSkillId: number,
    level: number
  ) {
    return await database.characterSkill.update({
      data: { level },
      where: { id: characterSkillId },
    })
  }
}
