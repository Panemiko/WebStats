import 'styles/global.css'

import { AbilitiesPage } from 'pages/AbilitiesPage'
import { AttributePage } from 'pages/AttributePage'
import { CharacterPage } from 'pages/CharacterPage'
import { InventoryPage } from 'pages/InventoryPage'
import { NotesPage } from 'pages/NotesPage'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: 'character/:characterId',
    children: [
      {
        path: '',
        element: <CharacterPage />,
      },
      {
        path: 'attribute/:attributeId',
        element: <AttributePage />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
      },
      {
        path: 'abilities',
        element: <AbilitiesPage />,
      },
      {
        path: 'notes',
        element: <NotesPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
