export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-cyan-500" />
            <span className="font-semibold text-gray-400">Own2Rent</span>
            <span>— Digital Asset Rental on Blockchain</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              Bohr Explorer ↗
            </a>
            <span className="text-gray-700">|</span>
            <span>Chain ID: 968</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
