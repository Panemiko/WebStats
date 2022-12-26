import 'styles/global.css'

import { AttributePage } from 'pages/AttributePage'
import { CharacterPage } from 'pages/CharacterPage'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/character/:characterId',
    element: <CharacterPage />,
  },
  {
    path: '/character/:characterId/attribute/:attributeId',
    element: <AttributePage />,
  },
  {
    path: '/character/:characterId/inventory',
  },
  {
    path: '/character/:characterId/notes',
  },
  {
    path: '/character/:characterId/abilities',
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
