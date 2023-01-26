import type { Item } from '@prisma/client'

import { database } from '../db/client'

export class ItemRepository {
  static async createItem(
    characterId: number,
    name: string,
    weight: number,
    quantity: number
  ) {
    return await database.item.create({
      data: { name, quantity, weight, characterId },
    })
  }

  static async updateItem(itemId: number, data: Partial<Item>) {
    return await database.item.update({
      where: {
        id: itemId,
      },
      data,
    })
  }

  static async deleteItem(itemId: number) {
    return await database.item.delete({
      where: {
        id: itemId,
      },
    })
  }
}
