import css from '../styles/Footer.module.css'
import {GiFastNoodles, GiDeliveryDrone, GiRotaryPhone} from 'react-icons/gi'
import {RiCustomerService2Line} from 'react-icons/ri'


const Footer = () => {
  return (
    <div className={`padding ${css.container} `} id='footer' >
        <div className={css.services}>
          <h3>Our Services</h3>
          <p>Food Delivery <GiDeliveryDrone fontSize={20} style={{marginLeft: '7px'}}  /></p>
          <p>Cook Varieties of Food Items <GiFastNoodles fontSize={20} style={{marginLeft: '7px'}} /></p>
          <p>24/7 customer care Services <RiCustomerService2Line fontSize={20}  style={{marginLeft: '7px'}}  /> </p>
        </div>
        <div className={css.about}>
          <h3>Our branches</h3>
          <p>24B, Crusader Block Hoffenham Close, Berlin </p>
          <p>1779 glock street post Block C, Shieffield, UK</p>
          <p>17 Empire State, Liberty Block NY</p>
        </div>
        <div className={css.contact}>
          <h3>Contact us Via <GiRotaryPhone style={{marginLeft: '7px'}}  /></h3>
          <p>kuisineeatery@admin.com</p>
          <p>+1-8000-000</p>
          <p>kuisineeatery.com</p>
        </div>
    </div>
  )
}

export default Footer