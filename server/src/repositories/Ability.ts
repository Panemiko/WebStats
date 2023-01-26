import type { Ability } from '@prisma/client'

import { database } from '../db/client'

export class AbilityRepository {
  static async createAbility(characterId: number, name: string, level: number) {
    return await database.ability.create({
      data: { name, characterId, level },
    })
  }

  static async updateAbility(abilityId: number, data: Partial<Ability>) {
    return await database.ability.update({
      where: {
        id: abilityId,
      },
      data,
    })
  }

  static async deleteAbility(abilityId: number) {
    return await database.ability.delete({
      where: {
        id: abilityId,
      },
    })
  }
}
