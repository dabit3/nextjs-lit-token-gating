import Cookies from 'cookies'
import LitJsSdk from 'lit-js-sdk'

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
  const { id } = query
  const cookies = new Cookies(req, res)
  const jwt = cookies.get('lit-auth')
  if (!jwt) {
    return {
      props: {
        authorized: false
      },
    }
  }

  const { verified, payload } = LitJsSdk.verifyJwt({ jwt })

  if (
    payload.baseUrl !== "http://localhost:3000"
    || payload.path !== '/protected'
    || payload.extraData !== id
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