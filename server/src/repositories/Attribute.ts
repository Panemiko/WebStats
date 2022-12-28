import { database } from 'db/client'

export class AttributeRepository {
  static async getAllAttributes() {
    return database.attribute.findMany({ orderBy: { id: 'asc' } })
  }
}
