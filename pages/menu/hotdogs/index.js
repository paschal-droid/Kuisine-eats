import { Result } from "@/components";
import css from '../../../styles/Menu.module.css'
import hotdog from '../../../assets/hotdog-ico.svg'
import Image from "next/image";
import { client, urlFor } from "@/lib/client";
import Link from "next/link";

export default function Hotdogs({hotdogs}) {
    return (
       <div className={`${css.container}`}>
        <div className={css.introText}>
            <span> Our<span style={{color: 'var(--clr-red)'}}>Menu</span></span>
            <div>
                <Image src={hotdog} width={80} alt="hotdogs" />
                <span>Hotdogs</span>
            </div>
        </div>
        <span>Choose <span style={{color: 'var(--clr-red)'}}>Hotdogs</span></span>
        <div className={`resultsOverlay ${css.foodContainer}`}>
            {hotdogs.map((item, i) => {
                    const src = urlFor(item.image).url()
                    return (<Link key={i} href={`./hotdogs/${item.slug.current}`}><Result name={item.name} price={item.price[1]} image={src} /></Link>  )
                })}
        </div>
       </div>
   )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "hotdog"]';
    const hotdogs = await client.fetch(query)
    return {props: {hotdogs}}
  }