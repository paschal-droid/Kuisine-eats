import Image from 'next/image';
import { HiOutlineArrowRight } from 'react-icons/hi';
import css from '../../styles/Foodmenu.module.css'

export default function Result({ name, price, image}) {
    return (
        <div className={`overlay ${css.results}`}>
        <Image unoptimized loader={()=> image} src={image}  fill alt='suya' />       
      <div className={css.foodDetails}>
        <span>{name}</span>

        <div className={css.pricecta}>
          <span><span style={{color: 'var(--clr-red)', fontSize: '12px'}}>$</span> {price}</span>
          <span>Order Now <HiOutlineArrowRight /></span>
        </div>
      </div>
   </div>
    )
}