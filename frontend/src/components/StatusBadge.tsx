interface StatusBadgeProps {
  status: 'available' | 'rented' | 'expired' | 'cancelled'
}

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    className: 'bg-green-500/10 text-green-400 border border-green-500/20',
    dot: 'bg-green-400',
  },
  rented: {
    label: 'Rented',
    className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    dot: 'bg-yellow-400',
  },
  expired: {
    label: 'Expired',
    className: 'bg-red-500/10 text-red-400 border border-red-500/20',
    dot: 'bg-red-400',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
    dot: 'bg-gray-400',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`badge ${cfg.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}
