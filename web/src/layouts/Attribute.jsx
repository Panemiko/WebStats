import { layoutContext } from 'contexts/LayoutContext'
import { metaContext } from 'contexts/MetaContext'
import { useContext } from 'react'

export function AttributeLayout() {
  const { skills } = useContext(metaContext)
  const { layout } = useContext(layoutContext)

  const attributeId = parseInt(layout.split('/')[1])

  return (
    <div>
      {skills
        .filter((skill) => skill.attributeId === attributeId)
        .map((skill) => (
          <div key={skill.id}>{skill.name}</div>
        ))}
    </div>
  )
}
