import css from '../../styles/Foodmenu.module.css'
import {RxDoubleArrowRight} from 'react-icons/rx'
import Image from 'next/image'
import Link from 'next/link'



export default function Category({img, text}) {
  return (
   <Link href={`./menu/${text}`}>
     <div className={css.categoryContainer}>
      <div className={css.foodIcon}>
        <Image src={img} alt='images' width={30} height={30} />
      </div>
      <span>{text}</span>
      <button><RxDoubleArrowRight size={12} /></button>
    </div>
   </Link>
  )
}
