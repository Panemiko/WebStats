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
    return (await CharacterRepository.getCharacterById(
      this.characterId
    )) as Character & {
      abilities: Ability[]
      attributes: CharacterAttribute[]
      items: Item[]
      skills: CharacterSkill[]
    }
  }

  async updateCharacter(data: Partial<Character>) {
    return await CharacterRepository.updateCharacterById(this.characterId, data)
  }

  async updateCharacterNotes(notes: string) {
    return await this.updateCharacter({
      notes,
    })
  }

  async updateCharacterLevel(level: number) {
    return await this.updateCharacter({
      level,
    })
  }

  async updateCharacterLife(life: number) {
    return await this.updateCharacter({
      life,
    })
  }

  async updateCharacterMaxLife(maxLife: number) {
    return await this.updateCharacter({
      maxLife,
    })
  }

  async updateCharacterSanity(sanity: number) {
    return await this.updateCharacter({
      sanity,
    })
  }

  async updateCharacterMaxSanity(maxSanity: number) {
    return await this.updateCharacter({
      maxSanity,
    })
  }

  async updateCharacterAttributeLevel(attributeId: number, level: number) {
    const character = await this.getCharacter()

    const characterAttribute = character.attributes.find(
      (characterAttribute: CharacterAttribute) =>
        characterAttribute.attributeId === attributeId
    )

    if (characterAttribute?.id) {
      const updatedAttribute =
        await CharacterAttributeRepository.updateCharacterAttributeLevel(
          characterAttribute.id,
          level
        )

      character.attributes[character.attributes.indexOf(characterAttribute)] =
        updatedAttribute

      return character
    }

    const createdAttribute =
      await CharacterAttributeRepository.createCharacterAttribute(
        this.characterId,
        attributeId,
        level
      )

    character.attributes.push(createdAttribute)

    return character
  }

  async updateCharacterSkillLevel(skillId: number, level: number) {
    const character = await this.getCharacter()

    const characterSkill = character.skills.find(
      (characterSkill: CharacterSkill) => characterSkill.skillId === skillId
    )

    if (characterSkill?.id) {
      const updatedSkill =
        await CharacterSkillRepository.updateCharacterSkillLevel(
          characterSkill.id,
          level
        )

      character.skills[character.skills.indexOf(characterSkill)] = updatedSkill

      return character
    }

    const createdSkill = await CharacterSkillRepository.createCharacterSkill(
      this.characterId,
      skillId,
      level
    )

    character.skills.push(createdSkill)

    return character
  }

  async addCharacterItem(name: string, weight: number, quantity: number) {
    await ItemRepository.createItem(this.characterId, name, weight, quantity)
  }

  async updateCharacterItem(data: Partial<Item>) {
    await ItemRepository.updateItem(this.characterId, data)
  }

  async addCharacterAbility(name: string, level: number) {
    await AbilityRepository.createAbility(this.characterId, name, level)
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

  async setClientRoomCharacter(
    io: Server,
    character?: Character & {
      abilities: Ability[]
      attributes: CharacterAttribute[]
      items: Item[]
      skills: CharacterSkill[]
    }
  ) {
    io.to(this.getCharacterRoomName()).emit('setCharacter', {
      character: character || (await this.getCharacter()),
    })
  }
}
