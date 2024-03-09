import { Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import drink from '../../../assets/drink-ico.svg'
import Image from "next/image";
import { client, urlFor } from "@/lib/client";
import Link from "next/link";

export default function Drinks({drinks}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image priority src={drink} width={50} height={45} alt="drink" />
                <span>Drinks</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Drinks</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
            {drinks.map((item, i) => {
                    const src = urlFor(item.image).url()
                    return ( <Link key={i} href={`./drinks/${item.slug.current}`}><Result  name={item.name} price={item.price[1]} image={src} /></Link>)
            })}
        </div>
       </div>
   )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "drink"]';
    const drinks = await client.fetch(query)
    return {props: {drinks}}
  }