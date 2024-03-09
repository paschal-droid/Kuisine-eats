import { useEffect, useState, useContext} from "react";
import css from "../styles/Cart.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineShopping } from "react-icons/ai";
import { HiMinusSm, HiPlusSm, HiTrash } from "react-icons/hi";
import {Context} from '../context/FoodContext'
import { urlFor } from "@/lib/client";
import { toast, Toaster } from "react-hot-toast";
import { OrderModal } from "@/components";

export default function Cart() {
  const { state: { menu }, updateQuantity, removeFood } = useContext(Context);
  const [order, setOrder] = useState(typeof window !== 'undefined' && localStorage.getItem('order'))
  const router = useRouter()

const total = () => menu.reduce((a, b) => a + b.quantity * b.price, 0).toFixed(2);

const [quantityState, setQuantityState] = useState({});

//* function to handle the pay on delivery call
const [paymentMethod, setPaymentMethod] = useState(null)
const handleOnDelivery = () => {
    setPaymentMethod(0)
    // ? This simply means that we should create our local storage when server/window has been rendered on NeXtJs
    typeof window !== 'undefined' && localStorage.setItem('total', total())
}

//* function to handle the payment with stripe
    const handleCheckout = async () => {
      typeof window !== 'undefined' && localStorage.setItem('total', total())
      setPaymentMethod(1)
      const response = await fetch('/api/stripe', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(menu),
      })

      if(response.status === 500){return}

      const data = await response.json()
      toast.loading('You will now be redirected....')
      router.push(data.url)
  }

useEffect(() => {
  // Initialize the quantityState with the quantities from menu
  const initialQuantities = menu.reduce((acc, item) => {
    acc[item.cartItemKey] = item.quantity;
    return acc;
  }, {});
  setQuantityState(initialQuantities);
  total();

}, [menu]);

const handleQuantityUpdate = (type, cartItemKey) => {
  const cartItem = menu.find(item => item.cartItemKey === cartItemKey);
  if (cartItem) {
    const newQuantity = type === 'add' ? cartItem.quantity + 1 : Math.max(cartItem.quantity - 1, 1);
    updateQuantity(cartItemKey, newQuantity);
    setQuantityState(prevState => ({
      ...prevState,
      [cartItemKey]: newQuantity,
    }));
  }
};

const handleRemove = (i) => {
  removeFood(i)
  toast.error('Item Removed')
}


  return (
    <div className={css.container}>
      <div className={css.title}>
        <AiOutlineShopping fontSize={50} />
        <h3>My Cart</h3>
      </div>
      {/* this is the details info for each item added to cart */}
      <div className={css.order}>
        <div className={css.orderDetails}>
          <table className={css.table}>
            <thead className={css.thead}>
              <th></th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </thead>
            <tbody className={css.tbody}>
              {menu.length > 0  && 
                menu.map((item, i) => {
                  const src = urlFor(item.image).url()
                  return (
                    <tr key={i} className={css.tr}>
                      <td>
                        <div className="checkbox-wrapper-23">
                          <input type="checkbox" id={i} />
                          <label
                            htmlFor={i}
                            style={{ width: "20px", height: "20px" }}
                          >
                            <svg viewBox="0,0,50,50">
                              <path d="M5 30 L 20 45 L 45 5"></path>
                            </svg>
                          </label>
                        </div>
                      </td>
                      <td>
                        <div className={css.product}>
                          <div className={css.productImage}>
                            <Image
                              src={src}
                              loader={() => src}
                              alt="food"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className={css.productDetails}>
                            <span>{item.name}</span>
                            <span>
                              {item.size === 0
                                ? "L"
                                : item.size === 1
                                ? "XL"
                                : "XXL"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={css.quantity}>
                          <span
                            onClick={() => handleQuantityUpdate('minus', item.cartItemKey)}
                          >
                            <HiMinusSm />
                          </span>
                          <span>{quantityState[item.cartItemKey]}</span>
                          <span
                            onClick={() => handleQuantityUpdate('add', item.cartItemKey)}
                          >
                            <HiPlusSm />
                          </span>
                        </div>
                        <span onClick={() => handleRemove(i)} className={css.remove}>
                          <HiTrash /> Remove
                        </span>
                      </td>
                      <td>
                        <span className={css.price}>
                          <span style={{ color: "var(--clr-red)" }}>$</span>
                          {(item.price * quantityState[item.cartItemKey]).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              
            </tbody>
          </table>
        </div>

        {/* order summary */}
        <div className={css.cart}>
          <span>Order Summary</span>
          <div className={css.cartDetails}>
            <div>
              <span>Items</span>
              <span>{menu.length}</span>
            </div>
            <div>
              <span>Discount</span>
              <span>
                <span style={{ color: "var(--clr-red)", fontWeight: "700" }}>
                  $
                </span>{" "}
                0
              </span>
            </div>
            <div>
              <span>Grand Total</span>
              <span>
                <span style={{ color: "var(--clr-red)", fontWeight: "700" }}>
                  ${" "}
                </span>
                {total()}
              </span>
            </div>

            <div className={css.buttons}>
              <button onClick={handleOnDelivery} className="btn">Pay on Delivery</button>
              <button onClick={handleCheckout} className="btn">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
      <Toaster containerStyle={{fontFamily: 'var(--font-nunito)'}} />
      <OrderModal opened={paymentMethod === 0} setOpened={setPaymentMethod} paymentMethod={paymentMethod} />
    </div>
  );
}
