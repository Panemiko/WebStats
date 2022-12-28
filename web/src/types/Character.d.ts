import type {
  Ability,
  Character as OriginalCharacter,
  CharacterAttribute,
  CharacterSkill,
  Item,
} from '@prisma/client'

export interface Character extends OriginalCharacter {
  items: Item[]
  abilities: Ability[]
  skills: CharacterSkill[]
  attributes: CharacterAttribute[]
}
