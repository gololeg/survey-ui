import styles from "./error404.module.css"
import {Link} from "react-router-dom";
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import {Icon} from "@mui/material";




export const Error404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ошибка 404</h1>
      <p className={styles.message}>Извините, запрашиваемая страница не найдена  <MoodBadOutlinedIcon/></p>
      <Link to="/" className={styles.link}>Вернуться на главную</Link>
    </div>
  )
}