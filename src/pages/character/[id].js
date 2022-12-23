import { AttributeButton } from 'components/AttributeButton'
import { CharacterAvatar } from 'components/CharacterAvatar'
import { CharacterInfo } from 'components/CharacterInfo'
import { IconButton } from 'components/IconButton'
import { LevelIndicator } from 'components/LevelIndicator'
import { LifeIndicator } from 'components/LifeIndicator'
import { SanityIndicator } from 'components/SanityIndicator'
import { characterContext } from 'contexts/CharacterContext'
import { useRouter } from 'next/router'
import {
  MdBackpack as BackpackIcon,
  MdNotes as NoteIcon,
  MdStars as StarIcon,
} from 'react-icons/md'

export default function CharacterPage() {
  const router = useRouter()
  const { id } = router.query

  if (!id) return

  return (
    <characterContext.Provider value={id}>
      <div className='h-screen w-screen bg-slate2'>
        <main className='py-12 px-4 bg-mauve1 grid grid-cols-5 '>
          <div className='col-start-1 col-end-4'>
            <div className='flex flex-col mb-6'>
              <LevelIndicator level={0} />
              <CharacterInfo name='Harper Brown' age={25} />
            </div>
            <div className='flex flex-col gap-2'>
              <LifeIndicator life={26} maxLife={30} />
              <SanityIndicator sanity={56} maxSanity={100} />
            </div>
          </div>
          <div className='col-start-4 col-end-6'>
            <CharacterAvatar src='https://media.discordapp.net/attachments/516771951763783680/1047267719600418967/image.png' />
          </div>
        </main>
        <div className='flex bg-mauve1 justify-between px-4 pb-12'>
          <IconButton Icon={BackpackIcon} />
          <IconButton Icon={StarIcon} />
          <IconButton Icon={NoteIcon} />
        </div>
        <div className='py-8 px-4'>
          <h1 className='text-cyan12 mb-8 font-bold text-2xl text-center'>
            ATRIBUTOS
          </h1>
          <div className='flex justify-between mb-10'>
            <AttributeButton level={1} tag='crp' />
            <AttributeButton level={1} tag='rfx' />
            <AttributeButton level={1} tag='tec' />
          </div>
          <div className='flex justify-between'>
            <AttributeButton level={1} tag='int' />
            <AttributeButton level={0} tag='gue' />
            <AttributeButton level={0} tag='mor' />
          </div>
        </div>
      </div>
    </characterContext.Provider>
  )
}
