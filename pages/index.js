import { Hero, Services, Menu, AboutUs, Offers } from '@/components'
// import { client } from '@/lib/client'
// import { useStore } from '@/store/store'
// import {useEffect} from 'react'

export default function Home({food}) { 
    // const store = useStore((state) => state.setMenu)
    // useEffect(() => {
    //   store(food)
    // }, [])
    return (
    <main>
     <Hero />
     <Services />
     <Menu />
     <Offers />
     <AboutUs />
    </main>
  )
}




// export const getStaticProps = async (context) => {
//   const query = '*[]';
//   const food = await client.fetch(query)
//   return {props: {food}}
// }