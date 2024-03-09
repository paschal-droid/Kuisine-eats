import Image from 'next/image'
import order from  '../assets/order.svg'
import delivery from  '../assets/delivery.svg'
import reviews from  '../assets/reviews.svg'
import css from '../styles/Services.module.css'


export default function Services() {
    return (
      <div className={`padding ${css.container}`}>
        <div className={css.title}>
          <p>what we serve</p>
          <h3>Your favourite food delivery patner</h3>
        </div>
        <div className={css.features}>
          <div>
            <Image src={order} alt="f-img" />
            <p>
              Easy <span style={{ color: "var(--clr-red)" }}>to</span> Order
            </p>
            <span>You only need a few steps in food ordering</span>
          </div>
          <div>
            <Image src={delivery} alt="f-img" />
            <p>
              Fastest <span style={{ color: "var(--clr-red)" }}>Delivery</span>
            </p>
            <span>Delivery that is always on time even faster</span>
          </div>
          <div>
            <Image src={reviews} alt="f-img" />
            <p>
              Best <span style={{ color: "var(--clr-red)" }}>Quality</span>
            </p>
            <span>Not only fast for us, quality is also number one</span>
          </div>
        </div>
      </div>
    );
}
