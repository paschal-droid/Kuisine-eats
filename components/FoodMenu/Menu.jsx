import { Category, Results } from '..'
import css from '../../styles/Foodmenu.module.css'
import hotdogIcon from '../../assets/hotdog-ico.svg'
import pizzaIcon from '../../assets/pizza-ico.svg'
import drinkIcon from '../../assets/drink-ico.svg'
import tacoIcon from '../../assets/taco-ico.svg'
import snacksIcon from '../../assets/snacks-ico.svg'
import burgerIcon from '../../assets/burger-ico.svg'
import {IoMdArrowDropdownCircle} from 'react-icons/io'
import { MdSwipeRight} from 'react-icons/md'


export default function Menu() {
  return (
    <div className={css.menuContainer}>
      <div className={css.header}>
        <span>Menu Category</span>
        <div>
          <span>View all</span>
          <span><IoMdArrowDropdownCircle size={25} /></span>
        </div>
      </div>
      <span className={`heartbeat ${css.direct}`}><MdSwipeRight /></span>
      <div className={css.menuCategory}>
        <Category img={pizzaIcon} text='pizzas'  />
        <Category img={burgerIcon} text='burgers' />
        <Category img={hotdogIcon} text='hotdogs' />
        <Category img={tacoIcon} text='tacos' />
        <Category img={snacksIcon} text='snacks' />
        <Category img={drinkIcon} text='drinks' />
      </div>
      <Results />
    </div>
  )
}
