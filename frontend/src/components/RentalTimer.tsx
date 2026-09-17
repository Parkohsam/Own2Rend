import { useState, useEffect } from 'react'

interface RentalTimerProps {
  endTime: bigint
  className?: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function RentalTimer({ endTime, className = '' }: RentalTimerProps) {
  const [label, setLabel] = useState('')
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const tick = () => {
      const nowSec = BigInt(Math.floor(Date.now() / 1000))
      if (nowSec >= endTime) {
        setExpired(true)
        setLabel('Expired')
        return
      }
      const diff = Number(endTime - nowSec)
      const days = Math.floor(diff / 86400)
      const hours = Math.floor((diff % 86400) / 3600)
      const mins = Math.floor((diff % 3600) / 60)
      const secs = diff % 60

      if (days > 0) {
        setLabel(`${days}d ${pad(hours)}h ${pad(mins)}m`)
      } else {
        setLabel(`${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`)
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endTime])

  return (
    <span
      className={`font-mono text-sm font-semibold ${
        expired ? 'text-red-400' : 'text-green-400'
      } ${className}`}
    >
      {label}
    </span>
  )
}
