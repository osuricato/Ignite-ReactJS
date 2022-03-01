import Image from 'next/image'
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          width="110px" 
          height="31px"
          src="/images/logo.svg"
          alt="Logo"
        />

        <nav>
          <a className={styles.active} href="">Home</a>
          <a href="">Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
