import css from '../styles/Hero.module.css'
import hero from '../assets/Kuisine Hero Image.png'
import cherry from '../assets/cherry.png'
import Image from 'next/legacy/image'
import Link from 'next/link'


const Hero = () => {
  return (
    <div className={css.container}>
      {/* Text Section */}
      <div className={css.first}>
        <div className={css.clip}>
          <span>more than just food</span>
          <Image src={cherry} alt="cherry" width={20} height={20} />
        </div>

        <span>
          Its not Just <span style={{ color: "var(--clr-red)" }}>Food</span>,
          Its an Experience
        </span>

        <span className={css.paragraph}>
          Experience the delight of speedy delivery and mouthwatering menus,
          satisfying your cravings with every bite. 🍔😋🍕
        </span>
        <div className={css.groupButtons}>
          <button className={css.groupButton1}>
            <Link href="/menu/hotdogs">Get Started</Link>
          </button>
          <button className={css.groupButton2}>
            <Link href={"/menu/pizzas"}>Place An Order</Link>
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className={css.second}>
        <div className={css.imageContainer}>
          <Image priority src={hero} alt="girl eating burger" />
        </div>
      </div>
    </div>
  );
}

export default Hero