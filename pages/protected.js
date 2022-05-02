import Cookies from 'cookies'
import LitJsSdk from 'lit-js-sdk'
import { useRouter } from 'next/router'

export default function Protected(props) {
  if (!props.authorized) {
    return (
      <h2>Unauthorized</h2>
    )
  }
  return (
    <div>
      <h2>Hello world</h2>
    </div>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const { path } = query
  console.log('path: ', path)
  const cookies = new Cookies(req, res)
  const jwt = cookies.get('jwt')
  if (!jwt) {
    return {
      props: {
        authorized: false
      },
    }
  }

  const { verified, header, payload } = LitJsSdk.verifyJwt({jwt})
  console.log({ verified })
  console.log({ header })
  console.log({ payload })
  if (
    payload.baseUrl !== "http://localhost:3000"
    || payload.path !== path
  ) {
    return {
      props: {
        authorized: false
      },
    }
  }
  return {
    props: {
      authorized: verified ? true : false
    },
  }
}