import {useState, useContext, useEffect} from 'react'
import logo from '../assets/Kuisine Eats Logo 2.png'
import css from '../styles/Navbar.module.css'
import Image from 'next/image'
import { AiOutlineShoppingCart, AiOutlineClose} from 'react-icons/ai'
import { BiReceipt } from 'react-icons/bi'
import {HiOutlineMenuAlt3} from'react-icons/hi'
import { MobileMenu } from '.'
import Link from 'next/link'
import { Context as Store } from '@/context/FoodContext'


const Navbar = () => {
  const [toggle, setToggle] = useState(true)
  //* No. of food items in the cart
  const {state: {menu}} = useContext(Store)
  const items = menu.length
  //* state for managing all the order status of our order
  const [order, setOrder] = useState(null)

  useEffect(() => {
    setOrder(localStorage.getItem('order'))

  }, [])
  return (
    <div className={`${css.container}`}>
      {/* App Logo */}
      <Link href='/'>
      <div className={css.logo}> 
        <div><Image src={logo}  alt='logo' /></div>
        <span className=''>Ku<span style={{color: 'var(--clr-red)'}}>isi</span>ne</span>
      </div>
      </Link>
      {/* Menu Lists */}
      <ul className={css.menu}>
      <li>Why Kuisine Eats?</li>
        <li>Services</li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>
    {/* Call to Action Buttons */}
    <div className={css.actionButtons}>
      <div className={css.cart}>
        <AiOutlineShoppingCart size={35} />
        <div className={css.badge}>{items}</div>
      </div>
      {order && (
          <div className={css.cart}>
            <BiReceipt size={35} color="#2e2e2e" />
            {order != '' && <div className={css.badge}>1</div>}
          </div>
        )}
      <span className={css.orderBtn}>
        <span>
          <Link href={'/menu/snacks'}>Place An Order</Link>
        </span>
      </span>
      <span onClick={() => setToggle(!toggle)} className={css.menuBtn}>{toggle ? <HiOutlineMenuAlt3 size={45} /> : <AiOutlineClose size={40} />}</span>
      <MobileMenu toggle={toggle} />
    </div>
    </div>
  )
}

export default Navbar