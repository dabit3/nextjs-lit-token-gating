import '../styles/globals.css'
import Link from 'next/link'
import { PathContext } from '../context'
import { useRouter } from 'next/router';

const randomPath = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
console.log({ randomPath })

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  function navigate() {
    router.push(`/protected?path=${randomPath}`)
  }
  return (
    <div>
      <nav>
        <Link href="/">
          <a>
            Home
          </a>
        </Link>
        <a onClick={navigate} style={{ cursor: 'pointer' }}>
          Protected
        </a>
      </nav>
      <PathContext.Provider value={{
        path: randomPath
      }}>
        <Component {...pageProps} />
      </PathContext.Provider>
    </div>
  )
}

export default MyApp
