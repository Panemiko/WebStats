import type {
  Ability,
  Character,
  CharacterAttribute,
  CharacterSkill,
  Item,
} from '@prisma/client'
import type { Server, Socket } from 'socket.io'

import { AbilityRepository } from './repositories/Ability'
import { AttributeRepository } from './repositories/Attribute'
import { CharacterRepository } from './repositories/Character'
import { CharacterAttributeRepository } from './repositories/CharacterAttribute'
import { CharacterSkillRepository } from './repositories/CharacterSkill'
import { ItemRepository } from './repositories/Item'
import { SkillRepository } from './repositories/Skill'

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

  async updateCharacterNotes(notes: string) {
    return this.updateCharacter({
      notes,
    })
  }

  async updateCharacterLevel(level: number) {
    return this.updateCharacter({
      level,
    })
  }

  async updateCharacterLife(life: number) {
    return this.updateCharacter({
      life,
    })
  }

  async updateCharacterMaxLife(maxLife: number) {
    return this.updateCharacter({
      maxLife,
    })
  }

  async updateCharacterSanity(sanity: number) {
    return this.updateCharacter({
      sanity,
    })
  }

  async updateCharacterMaxSanity(maxSanity: number) {
    return this.updateCharacter({
      maxSanity,
    })
  }

  async updateCharacterAttributeLevel(attributeId: number, level: number) {
    const character = await this.getCharacter()

    const characterAttribute = character?.attributes.find(
      (characterAttribute: CharacterAttribute) =>
        characterAttribute.attributeId === attributeId
    )

    if (characterAttribute?.id) {
      CharacterAttributeRepository.updateCharacterAttributeLevel(
        characterAttribute.id,
        level
      )

      return
    }

    CharacterAttributeRepository.createCharacterAttribute(
      this.characterId,
      attributeId,
      level
    )
  }

  async updateCharacterSkillLevel(skillId: number, level: number) {
    const character = await this.getCharacter()

    const characterSkill = character?.skills.find(
      (characterSkill: CharacterSkill) => characterSkill.skillId === skillId
    )

    if (characterSkill?.id) {
      await CharacterSkillRepository.updateCharacterSkillLevel(
        characterSkill.id,
        level
      )

      return
    }

    await CharacterSkillRepository.createCharacterSkill(
      this.characterId,
      skillId,
      level
    )
  }

  async addCharacterItem(name: string, weight: number, quantity: number) {
    await ItemRepository.createItem(this.characterId, name, weight, quantity)
  }

  async updateCharacterItem(data: Partial<Item>) {
    await ItemRepository.updateItem(this.characterId, data)
  }

  async addCharacterAbility(name: string) {
    await AbilityRepository.createAbility(this.characterId, name)
  }

  async updateCharacterAbility(data: Partial<Ability>) {
    await AbilityRepository.updateAbility(this.characterId, data)
  }

  async setCharacter() {
    this.socket.emit('setCharacter', {
      character: await this.getCharacter(),
    })
  }

  async setMeta() {
    this.socket.emit('setMeta', {
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
      'setCharacter',
      await this.getCharacter()
    )
  }
}
