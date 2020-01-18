import React from 'react'
import Link from 'next/link'

const Page = ({ children }) => {
  return (
    <div className="container">
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/anziehen"><a>A</a></Link>
        <Link href="/under-construction"><a>A</a></Link>
        <Link href="/anziehen"><a>A</a></Link>
        <Link href="/anziehen"><a>A</a></Link>
        <Link href="/anziehen"><a>A</a></Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Page
