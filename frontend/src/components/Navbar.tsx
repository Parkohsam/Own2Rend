import { Link, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'

export function Navbar() {
  const { isConnected } = useAccount()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Browse' },
    { to: '/list', label: 'List Asset' },
    { to: '/my-rentals', label: 'My Rentals' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O2</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Own2Rent
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  location.pathname === to
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Wallet + network */}
          <div className="flex items-center gap-3">
            {isConnected && (
              <appkit-network-button />
            )}
            <appkit-button size="sm" />
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden gap-1 pb-3">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
                location.pathname === to
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
