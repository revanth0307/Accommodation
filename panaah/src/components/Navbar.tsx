'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  return (
    <nav>
      {session ? (
        <div className="flex items-center gap-4">
          <span>👋 Hello, {session.user?.name || session.user?.email}</span>
          <button onClick={() => signOut()} className="text-red-500">
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="text-blue-500">Login</a>
      )}
    </nav>
  )
}
