import css from '../../styles/Foodmenu.module.css'
import { LazyLoader } from '..';




export default function Results() {

  return (
    <div className={css.resultsOverlay}>
      <LazyLoader />
  </div>
  )
}
