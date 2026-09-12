import Image from "next/image"
import Icon from "@/components/icons/Icon"
import me from "./me.jpeg"
import styles from "./About.module.css"

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div>
        <div>
          <Image src={me} alt="Me, myself and I" priority />
          <div>
            <a
              href="https://www.linkedin.com/in/florian-zapf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" />
            </a>
            <a
              href="https://github.com/thascius-rumpelschnick"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" />
            </a>
            <a
              href="https://twitter.com/HotteInParadise"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Icon name="twitter" />
            </a>
          </div>
        </div>
        <div>
          <h1>Florian Zapf</h1>
          <h5>FULLSTACK SOFTWARE ENGINEER</h5>
          <div>
            <a href="#" rel="noopener noreferrer" target="_blank">
              DOWNLOAD CV
            </a>
            <a href="#contact">CONTACT</a>
          </div>
          <ul>
            <li>
              <div>Hometown</div>
              <div>Berlin, Germany</div>
            </li>
            <li>
              <div>Email</div>
              <div>Lorem@imspum.com</div>
            </li>
            <li>
              <div>Phone</div>
              <div>+49 30 111 11 11</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
