import {useContext} from 'react'
import { LazyLoader, Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import pizza from '../../../assets/pizza-ico.svg'
import Image from "next/image";
import { client, urlFor } from '@/lib/client';
import Link from 'next/link';



export default function Pizza({pizzas}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image src={pizza} width={100} alt="pizzas" />
                <span>Pizza</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Pizza</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
            {pizzas.map((item, i) => {
                return ( <Link key={i} href={`./pizzas/${item.slug.current}`}><Result  name={item.name} price={item.price[1]} image={urlFor(item.image).url()} /></Link> )
            })}
        </div>
       </div>
   )
}

export const getStaticProps = async (context) => {
    const query = '*[_type == "pizza"]';
    const pizzas = await client.fetch(query)
    return {props: {pizzas}}
  }