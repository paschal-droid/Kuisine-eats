import css from '../styles/Navbar.module.css'

const MobileMenu = ({toggle}) => {
  return (
    <div className={` ${!toggle ? css.mobileMenu : css.noMenu}`}>
        <li>Why Kuisine Eats?</li>
        <li>Services</li>
        <li>Our Menu</li>
        <li>Contact Us</li>
        <button>Order Now</button>
    </div>
  )
}

export default MobileMenu