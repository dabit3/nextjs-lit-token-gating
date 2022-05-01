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

export async function getServerSideProps({ req, res}) {
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
  return {
    props: {
      authorized: verified ? true : false
    },
  }
}