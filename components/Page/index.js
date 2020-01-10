import React from 'react'
import Link from 'next/link'

const Page = ({ children }) => {
  return (
    <div className="container">
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/start"><a>Start</a></Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Page
