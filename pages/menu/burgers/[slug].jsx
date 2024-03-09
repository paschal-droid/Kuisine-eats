import Image from 'next/image'
import { useState, useContext } from 'react'
import { client, urlFor } from '@/lib/client'
import css from '../../../styles/Slug.module.css'
import { HiArrowLeft, HiArrowRight, HiHeart, HiMinusSm, HiPlusSm, HiShoppingBag } from 'react-icons/hi'
import {CiBurger} from 'react-icons/ci'
import { BiTimer } from 'react-icons/bi'
import { AiOutlineFire, AiOutlineStar } from 'react-icons/ai'
import Link from 'next/link'
import { Context } from '@/context/FoodContext'
import toast, {Toaster} from 'react-hot-toast'

export default function FoodItem({burger}) {
    const src = urlFor(burger.image).url()
    const { addFood} = useContext(Context)
    const [Size, setSize] = useState(1)
    const [Quantity, setQuantity] = useState(1)
    const cartItemKey = `${burger._id}-${burger.size}-${Math.random().toString(36).substring(7)}`;
    const handleQuantity = (type) => {
      type === "add"
        ? setQuantity((prev) => prev + 1)
        : Quantity === 1
        ? null
        : setQuantity((prev) => prev - 1);
    };

    const addToCart = () => {
        addFood({...burger, price: burger.price[Size], quantity: Quantity, size: Size, cartItemKey})
        toast.success('Added to Cart')
    }



    return (
      <div className={css.overlay}>
          <Link className={css.left} href='/menu/burgers'><span><HiArrowLeft fontSize={15} /> Back to Burger Menu</span></Link>
          <Link className={css.right} href='/cart'><span><HiArrowRight fontSize={15} /> Go to Cart</span></Link>
        <div className={css.container}>
          {/* THis is the product display page */}
          <div className={css.first}>
            <div className={css.heart}>
              <HiHeart />
            </div>
            <div className={css.imageContainer}>
              {/* <Image src={suya} alt="suya" /> */}
              <Image
                unoptimized
                loader={() => src}
                src={src}
                alt="image"
                height={500}
                width={500}
              />
            </div>
            <div className={css.actions}>
              <span>
                <BiTimer color='var(--clr-red)' fontSize={30} /> 30 mins
              </span>
              <span>
                <AiOutlineFire color='var(--clr-red)' fontSize={30} /> Calories
              </span>
              <span>
                <AiOutlineStar color='var(--clr-red)' fontSize={30} /> 4.9
              </span>
            </div>
          </div>
          {/* This is the product details page with price, quantity and size */}
          <div className={css.second}>
            <div className={css.foodName}>
              <span>{burger.name}</span>
              <span>Burgers Menu</span>
            </div>
            <div className={css.price}>
              <span><span style={{color: "var(--clr-red)"}}>$ </span>{burger.price[Size]}</span>
            </div>
            <hr />
            <div className={css.details}>
              <span>Details</span>
              <span>{burger.details}</span>
            </div>
            <div className={css.size} >
              <div onClick={() => setSize(0)} className={Size === 0 ? css.selected : ''}>
                <CiBurger fontSize={25}  />
                <span>L</span>
              </div>
              <div onClick={() => setSize(1)} className={Size === 1 ? css.selected : ''}>
                <CiBurger fontSize={25} />
                <span>XL</span>
              </div>
              <div onClick={() => setSize(2)} className={Size === 2 ? css.selected : ''}>
                <CiBurger fontSize={25} />
                <span>XXL</span>
              </div>
             
            </div>
            <div className={css.quantity}>
              <span onClick={() =>handleQuantity('minus')}>
                <HiMinusSm />
              </span>
              <span>{Quantity}</span>
              <span onClick={() =>handleQuantity('add')}>
                <HiPlusSm />
              </span>
            </div>
            <div tabIndex={-1} onClick={addToCart} className={css.cta}>
              <span>Add To Cart</span>
              <span>
                <HiShoppingBag />
              </span>
              <span>{(burger.price[Size] * Quantity).toPrecision(3)}</span>
            </div>
          </div>
          <Toaster containerStyle={{fontSize: '1rem', fontFamily: 'var(--font-montserrat)'}} />
        </div>
      </div>
    );
}





// This is a function that tells nextJS to fetch all the slugs/paths from the Pizza data but only the path/slug which was clicked on from the main screen not all of them and then display that as the name of the path which then renders the page 
export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="burger" && defined(slug.current)][].slug.current`
    )
    return {
        paths: paths.map((slug)=> ({params: {slug}})),
        fallback: 'blocking'
    }
}

// This is a function that tells nextJS to fetch the data from the pizza but only fetch the specific pizza data that is connected with the slug clicked on 
export async function getStaticProps(context) {
    const {slug = ""} = context.params;
    const burger = await client.fetch(
        `*[_type=="burger" && slug.current == '${slug}'][0]`
    );
    return {
        props: {burger}
    }
}