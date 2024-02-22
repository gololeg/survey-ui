import styles from "./error404.module.css"
import {Link} from "react-router-dom";

export const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error 404</h1>
      <p className={styles.message}>Sorry, the requested page was not found</p>
      <Link to="/" className={styles.link}>Go back to the main page</Link>
    </div>
  )
}