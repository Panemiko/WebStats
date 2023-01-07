import { Attribute } from 'components/CharacterDisplay/Attribute'
import { Avatar } from 'components/CharacterDisplay/Avatar'
import { IconButton } from 'components/CharacterDisplay/IconButton'
import { Information } from 'components/CharacterDisplay/Information'
import { Level } from 'components/CharacterDisplay/Level'
import { Life } from 'components/CharacterDisplay/Life'
import { Sanity } from 'components/CharacterDisplay/Sanity'
import { Dialog } from 'components/Dialog'
import { useSetup } from 'hooks/useSetup'
import { useStoreUpdate } from 'hooks/useStoreUpdate'
import {
  MdBackpack as BackpackIcon,
  MdNotes as NoteIcon,
  MdStars as StarIcon,
} from 'react-icons/md'

export function CharacterPage() {
  useSetup()

  const {
    character,
    meta: { attributes },
  } = useStoreUpdate()

  return (
    <div className='h-screen w-screen bg-slate2'>
      <Dialog />
      <main className='py-12 px-4 bg-mauve1 grid grid-cols-5 '>
        <div className='col-start-1 col-end-4'>
          <div className='flex flex-col mb-6'>
            <Level />
            <Information name={character.name} age={character.age} />
          </div>
          <div className='flex flex-col gap-2'>
            <Life />
            <Sanity
              sanity={character.sanity || 0}
              maxSanity={character.maxSanity}
            />
          </div>
        </div>
        <div className='col-start-4 col-end-6'>
          <Avatar src={character.picture} />
        </div>
      </main>
      <div className='flex bg-mauve1 justify-between px-4 pb-12'>
        <IconButton href='inventory' Icon={BackpackIcon} />
        <IconButton href='abilities' Icon={StarIcon} />
        <IconButton href='notes' Icon={NoteIcon} />
      </div>
      <div className='py-8 px-4'>
        <h1 className='font-bold text-2xl text-cyan12 mb-8 text-center'>
          ATRIBUTOS
        </h1>
        <div className='grid grid-cols-3'>
          {attributes?.map((attribute) => (
            <div key={attribute.id} className='flex justify-center mb-10'>
              <Attribute
                attributeId={attribute.id}
                tag={attribute.tag}
                level={
                  character?.attributes?.find(
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
