import Logo from "/images/miratecnica.webp";

export default function SplashScreen() {
  return (
    <main className={styles.main}>
      <img src={Logo} alt="logo-splash" className={styles.logo} />
    </main>
  );
}
