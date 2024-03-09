import { Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import snack from '../../../assets/snacks-ico.svg'
import Image from "next/image";
import { client, urlFor } from "@/lib/client";
import Link from "next/link";

export default function Snacks({snacks}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image src={snack} width={80} height={70} alt="snacks" />
                <span>Snacks</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Snacks</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
            {snacks.map((item, i) => {
                    const src = urlFor(item.image).url()
                    return (<Link key={i} href={`./snacks/${item.slug.current}`}><Result name={item.name} price={item.price[1]} image={src} /></Link> )
                })}
        </div>
       </div>
   )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "snacks"]';
    const snacks = await client.fetch(query)
    return {props: {snacks}}
  }