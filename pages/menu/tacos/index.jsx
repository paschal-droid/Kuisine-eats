import { Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import taco from '../../../assets/taco-ico.svg'
import Image from "next/image";
import { client, urlFor } from "@/lib/client";
import Link from "next/link";

export default function Tacos({tacos}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image src={taco} width={80} alt="tacos" />
                <span>Tacos</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Tacos</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
            {tacos.map((item, i) => {
                    const src = urlFor(item.image).url()
                    return ( <Link key={i} href={`./tacos/${item.slug.current}`}><Result  name={item.name} price={item.price[1]} image={src} /></Link>)
                })}
        </div>
       </div>
   )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "taco"]';
    const tacos = await client.fetch(query)
    return {props: {tacos}}
  }