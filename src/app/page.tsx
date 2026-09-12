import type { Metadata } from "next"
import About from "@/components/about/About"
import BackgroundImage from "@/components/background-image/BackgroundImage"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: "Florian Zapf - Fullstack Software Engineer",
  description: "Florian Zapf - Fullstack Software Engineer - Curriculum Vitae",
  authors: [{ name: "Florian Zapf" }],
}

export default function Page() {
  return (
    <>
      <BackgroundImage />
      <div className={styles.container}>
        <main className={styles.main}>
          <About />
        </main>
      </div>
    </>
  )
}
