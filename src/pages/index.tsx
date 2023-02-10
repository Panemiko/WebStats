import { useEffect } from 'react'

import { getSocket } from '@/lib/socket'

export default function Home() {
  useEffect(() => {
    const socket = getSocket()

    socket.emit('aaaa')
  }, [])
}
