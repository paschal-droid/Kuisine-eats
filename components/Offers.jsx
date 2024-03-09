import React from 'react'
import css from '../styles/Offers.module.css'
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'
import Image from 'next/image'


const Offers = () => {
  return (
    <div className={css.container}>
        <div className={css.first}>
            <div className={css.imageContainer}>
                <Image src={img2} alt='offer 1'/>
            </div>
        </div>
        <div className={css.second}>
            <div className={css.imageContainer}>
                <Image src={img1} alt='offer 2'/>
            </div>
            <div className={css.imageContainer} >
                <Image src={img3} alt='offer 3'/>
            </div>
        </div>
    </div>
  )
}

export default Offers