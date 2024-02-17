import styles from "./error404.module.css"
import {Link} from "react-router-dom";

export const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ошибка 404</h1>
      <p className={styles.message}>Извините, запрашиваемая страница не найдена </p>
      <Link to="/" className={styles.link}>Вернуться на главную</Link>
    </div>
  )
}