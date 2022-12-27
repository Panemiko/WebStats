export async function characterIdInvalid(characterId) {
  return typeof characterId !== 'number'
}
