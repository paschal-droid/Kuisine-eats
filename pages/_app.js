import '../styles/globals.css'
import {Layout} from '../components'
import {Provider as FoodProvider} from '../context/FoodContext'

function MyApp({ Component, pageProps }) {
  return (
    <FoodProvider>
      <Layout className={`gradient-bg`}>
        <Component {...pageProps} />
      </Layout>
    </FoodProvider>
  );
}

export default MyApp
