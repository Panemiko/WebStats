import type { Character } from '@prisma/client'
import { AttributeRepository } from 'repositories/Attribute'
import { CharacterRepository } from 'repositories/Character'
import { SkillRepository } from 'repositories/Skill'
import type { Server, Socket } from 'socket.io'

export class Interaction {
  constructor(private socket: Socket, private characterId: number) {}

  private getCharacterRoomName() {
    return `character/${this.characterId}`
  }

  async getCharacter() {
    return await CharacterRepository.getCharacterById(this.characterId)
  }

  async updateCharacter(data: Partial<Character>) {
    return await CharacterRepository.updateCharacterById(this.characterId, data)
  }

  async setCharacter() {
    this.socket.emit('set-character', {
      character: await this.getCharacter(),
    })
  }

  async setMeta() {
    this.socket.emit('set-meta', {
      meta: {
        attributes: await AttributeRepository.getAllAttributes(),
        skills: await SkillRepository.getAllSkills(),
      },
    })
  }

  async joinCharacterRoom() {
    this.socket.join(this.getCharacterRoomName())
  }

  async setClientRoomCharacter(io: Server) {
    io.to(this.getCharacterRoomName()).emit(
      'set-character',
      this.getCharacter()
    )
  }
}
