import { Modal, useMantineTheme } from '@mantine/core';
import css from '../styles/OrderModal.module.css'
import { useState, useContext } from 'react';
import { createOrder } from '../lib/orderHandler';
import { toast} from 'react-hot-toast';
import { Context } from '@/context/FoodContext';
import { useRouter } from 'next/router';

export default function OrderModal({opened, setOpened, paymentMethod}) {
    const theme = useMantineTheme();
    const [formData, setFormData] = useState({})
    const router = useRouter()
    const {order} = useContext(Context)

    //* retrieving the total amount from the local storage we saved previously
    const total = typeof window !== 'undefined' && localStorage.getItem('total')

    //* function to save each form data from the various inputs to our state object
    const handleInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    //* function called to reset cart to 0 when an order was successfully made.
    const { resetCart } = useContext(Context)


    //* function to submit the form data together 
    const handleSubmit = async (e)=> {
      console.log(formData);
        e.preventDefault()
        const id = await createOrder({...formData, total, paymentMethod})
        toast.success('Order has been Placed Successfully!')
        resetCart()
        typeof window !== 'undefined' && localStorage.setItem('order', id)
        router.push(`/order/${id}`)
    }

    return (
      <Modal
        opened={opened}
        onClose={() => setOpened(null)}
        title="Kuisine Eats Order"
        overlayprops={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        <form action="" className={css.formContainer}>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor="name">
              Name
            </label>
            <input
              onChange={handleInput}
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name"
              className={css.formInput}
            />
          </div>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor="phone">
              Phone Number
            </label>
            <input
              onChange={handleInput}
              type="text"
              name="phone"
              id="phone"
              required
              placeholder="Phone Number"
              className={css.formInput}
            />
          </div>
          <div className={css.formGroup}>
            <label className={css.formLabel} htmlFor="address">
              Address
            </label>
            <textarea
              onChange={handleInput}
              name="address"
              id="address"
              placeholder="Address"
              rows="3"
              className={css.formTextarea}
            ></textarea>
          </div>
          <div className={css.totalAmount}>
            You will now pay: <span>${total}</span> on Delivery
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={css.formButton}
          >
            Place Order
          </button>
        </form>
      </Modal>
    );
}