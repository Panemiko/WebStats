import { AttributeButton } from 'components/CharacterInfo/AttributeButton'
import { CharacterAvatar } from 'components/CharacterInfo/CharacterAvatar'
import { CharacterInfo } from 'components/CharacterInfo/CharacterInfo'
import { IconButton } from 'components/CharacterInfo/IconButton'
import { LevelIndicator } from 'components/CharacterInfo/LevelIndicator'
import { LifeIndicator } from 'components/CharacterInfo/LifeIndicator'
import { SanityIndicator } from 'components/CharacterInfo/SanityIndicator'
import { metaContext } from 'contexts/MetaContext'
import { useContext } from 'react'
import {
  MdBackpack as BackpackIcon,
  MdNotes as NoteIcon,
  MdStars as StarIcon,
} from 'react-icons/md'

export function CharacterInfoLayout() {
  const { character, attributes } = useContext(metaContext)

  return (
    <div className='h-screen w-screen bg-slate2'>
      <main className='py-12 px-4 bg-mauve1 grid grid-cols-5 '>
        <div className='col-start-1 col-end-4'>
          <div className='flex flex-col mb-6'>
            <LevelIndicator level={character.level} />
            <CharacterInfo name={character.name} age={character.age} />
          </div>
          <div className='flex flex-col gap-2'>
            <LifeIndicator life={character.life} maxLife={character.maxLife} />
            <SanityIndicator
              sanity={character.sanity}
              maxSanity={character.maxSanity}
            />
          </div>
        </div>
        <div className='col-start-4 col-end-6'>
          <CharacterAvatar src={character.picture} />
        </div>
      </main>
      <div className='flex bg-mauve1 justify-between px-4 pb-12'>
        <IconButton Icon={BackpackIcon} />
        <IconButton Icon={StarIcon} />
        <IconButton Icon={NoteIcon} />
      </div>
      <div className='py-8 px-4'>
        <h1 className='font-bold text-2xl text-cyan12 mb-8 text-center'>
          ATRIBUTOS
        </h1>
        <div className='grid grid-cols-3'>
          {attributes.map((attribute) => (
            <div key={attribute.id} className='flex justify-center mb-10'>
              <AttributeButton
                attributeId={attribute.id}
                tag={attribute.tag}
                level={
                  character.attributes.find(
                    (charAttribute) =>
                      charAttribute.attributeId === attribute.id
                  )?.level || 0
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
