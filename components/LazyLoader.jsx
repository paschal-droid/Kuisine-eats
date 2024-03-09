import css from '../styles/Lazyloading.module.css'

export default function LazyLoader() {
  return (
    <div className={css.container}>
      <span>Loading...</span>
      <div className={css.music}>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
        <div className={css.bar}></div>
      </div>
    </div>
  )
}
