import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { client } from "../../lib/client"
import css from '../../styles/Orders.module.css'
import {CiReceipt} from 'react-icons/ci'
import {BsBoxSeam} from 'react-icons/bs'
import cooking from '../../assets/cooking.png'
import onway from '../../assets/onway.png'
import bill from '../../assets/bill.png'
import delivery from '../../assets/delivery-man.png'
import spinner from '../../assets/spinner.svg'
import { Context as FoodStore } from "@/context/FoodContext"
import { useRouter } from "next/router"


export const getServerSideProps = async ({params}) => {
    const query = `*[_type=="order" && _id == '${params.id}']`
    const order = await client.fetch(query)
    
    return {
        props: {
            order: order[0]
        }
    }
}
export default function Orders({order}) {
    const [value, setValue] = useState(order.status)
    const [orderCompleted, setOrderCompleted] = useState(false)
    const {resetCart} = useContext(FoodStore)
    const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      if (order.status < 4) {
        setValue(prevValue => prevValue + 1);
      } else {
        clearInterval(interval);
  }
}, (3000)); // 30000 milliseconds = 30 seconds
    return () => {
      clearInterval(interval)
      if(value >= 4) {
        localStorage.clear()
        setOrderCompleted(true)
        resetCart()
      }
    };
  }, [value]);

//   if (value > 4) {
//   }

    return (
      <>
        <div className={css.container}>
          <span className={css.heading}>Order in Process</span>
          {orderCompleted && <button onClick={() => router.push('/')} className={css.orderCompleted}>Go Home</button>}
          {/* Section for the order Details */}
          <div className={css.details}>
            <div>
              <span>Order ID</span>
              <span># {order._id}</span>
            </div>
            <div>
              <span>Customer Name</span>
              <span>{order.name}</span>
            </div>
            <div>
              <span>Phone</span>
              <span>{order.phone}</span>
            </div>
            <div>
              <span>Payment Method</span>
              <span>
                {order.method === 0 ? 'Cash on Delivery': 'Online Payment(Paid)'}
              </span>
            </div>
            <div>
              <span>Total</span>
              <span>$ {order.total}</span>
            </div>
          </div>

        {/* section for the order Status */}
            <div className={css.statusContainer}>
                <div className={css.status}>
                <Image src={bill} alt="bill" width={50} height={50} />
                    <span>Payment</span>
                    {order.method === 0 ? 
                    <span className={css.pending}>On Delivery</span>:
                    <span className={css.pending}>Completed</span>                    
                    }
                </div>

                <div className={css.status}>
                    <Image src={cooking} alt="cooking" width={50} height={50} />
                    <span>Cooking</span>
                    {value === 1 && 
                        <div className={css.spinner}>
                            <Image width={100} height={100} src={spinner} alt="spinner" />
                        </div>
                    }
                    {value > 1 && 
                        <span className={css.completed}>Completed</span>
                    }
                </div>

                <div className={css.status}>
                    <Image src={onway} alt="delivery" width={50} height={50} />
                    <span>On the Way</span>
                    {value === 2 && 
                        <div className={css.spinner}>
                            <Image src={spinner} alt="spinner" />
                        </div>
                    }
                    {value > 2 && 
                        <span className={css.completed}>Completed</span>
                    }
                </div>

                <div className={css.status}>
                <Image src={delivery} alt="delivery" width={50} height={50} />
                    <span>Delivered</span>
                    {value === 3 && 
                        <div className={css.spinner}>
                            <Image src={spinner} alt="spinner" />
                        </div>
                    }
                    {value > 3 && 
                        <span className={css.completed}>Completed</span>
                    }
                </div>
            </div>
        </div>
      </>
    );
}
