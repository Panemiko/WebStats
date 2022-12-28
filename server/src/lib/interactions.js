import {
  getAllAttributes,
  getAllSkills,
  getCharacterById,
} from './repositories.js'

export class ClientInteractions {
  constructor(socket, characterId) {
    this.socket = socket
    this.characterId = characterId
  }

  static byCharacterRoom(io, characterId) {
    return new ClientInteractions(
      io.to(ClientInteractions.createCharacterRoomName(characterId)),
      characterId
    )
  }

  static createCharacterRoomName(characterId) {
    return `character/${characterId}`
  }

  async setCharacter() {
    this.socket.emit('set-character', {
      character: await getCharacterById(this.characterId),
    })
  }

  async setAttributes() {
    this.socket.emit('set-attributes', { attributes: await getAllAttributes() })
  }

  async setSkills() {
    this.socket.emit('set-skills', { skills: await getAllSkills() })
  }

  async joinCharacterRoom() {
    this.socket.join(
      ClientInteractions.createCharacterRoomName(this.characterId)
    )
  }
}
