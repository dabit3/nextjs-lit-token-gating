import '../styles/globals.css'
import Link from 'next/link'
import { UUIDContext } from '../context'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid';

const id = uuid()

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  function navigate() {
    router.push(`/protected?id=${id}`)
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
      <UUIDContext.Provider value={{
        id
      }}>
        <Component {...pageProps} />
      </UUIDContext.Provider>
    </div>
  )
}

export default MyApp
