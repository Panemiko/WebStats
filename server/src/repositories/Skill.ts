import { database } from 'db/client'

export class SkillRepository {
  static async getAllSkills() {
    return database.skill.findMany({ orderBy: { id: 'asc' } })
  }
}
