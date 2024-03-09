import css from '../styles/AboutUs.module.css'
import customer from '../assets/About us -kuisine Eats.png'
import profile from '../assets/profile.png'
import rate from '../assets/five-star-rating.svg'
import Image from 'next/image'



export default function AboutUs() {
    return (
        <div className={css.container}>
            {/* Customer Image */}
            <div className={css.first}>
                <div className={css.imageContainer}>
                    <Image src={customer} alt='girl eating'/>
                </div>
            </div>

            {/* Cutomer review Text */}
            <div className={css.second}>
                <span>what they say</span>
                <span>What our customers say about us</span>
                <p>"I just had the most amazing experience with Kuisine Eats! Their website is incredibly user-friendly, making it a breeze to place my order. Kuisine Eats has definitely become my go-to platform for ordering food. Highly recommended!"</p>
                <div className={css.profile}>
                    <div className={css.customer}>
                        <div>
                            <Image src={profile} width={45} alt='profile' />
                        </div>
                        <div className={css.customerName}>
                            <span>Theresa Ryleigh</span>
                            <span>Food Enthusiast</span>
                        </div>
                    </div>
                    <Image src={rate} width={50} alt='rating' />
                </div>
            </div>
        </div>
    )
}