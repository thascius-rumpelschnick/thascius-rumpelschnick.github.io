import styles from "./BackgroundImage.module.scss"

// Full-width photo behind the top of the CV page (legacy `<div id="bg-img">`).
export default function BackgroundImage() {
  return <div className={styles.backgroundImage} aria-hidden="true" />
}
