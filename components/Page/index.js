import React from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const Page = ({ children }) => {
  return (
    <div className={styles.container}>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/anziehen"><a>A</a></Link>
        <Link href="/under-construction"><a>B</a></Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Page
