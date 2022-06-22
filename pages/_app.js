import '../styles/globals.css'
import { RobinhoodProvider } from '../context/RobinhoodContext'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {


  return (
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      > 
        <RobinhoodProvider>
          <Component {...pageProps} />
        </RobinhoodProvider>
      </MoralisProvider>
    )
}

export default MyApp
