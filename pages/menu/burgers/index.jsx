import { Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import burger from '../../../assets/burger-ico.svg'
import Image from "next/image";
import { client, urlFor } from "@/lib/client";
import Link from "next/link";

export default function Burger({burgers}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image src={burger} width={70} alt="pizzas" />
                <span>Burger</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Burger</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
           {burgers.map((item, i) => {
                const src = urlFor(item.image).url()
                return ( <Link  key={i} href={`./burgers/${item.slug.current}`}><Result name={item.name} price={item.price[1]} image={src} /></Link>)
            })}
        </div>
       </div>
   )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "burger"]';
    const burgers = await client.fetch(query)
    return {props: {burgers}}
  }