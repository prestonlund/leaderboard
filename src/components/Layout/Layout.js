import { Brightness6Rounded, SportsEsports } from '@material-ui/icons';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

const Layout = ({ children, title = "Leaderboard" }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            localStorage.getItem('theme')
        );

        setTheme(localStorage.getItem('theme'));
    }, []);

    const switchTheme = () => {
        if (theme === 'light') {
            saveTheme('dark');
        } else {
            saveTheme('light');
        }
    };

    const saveTheme = (theme) => {
        setTheme(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <SportsEsports />
                <div>Leaderboard</div>
                <button className={styles.themeSwitcher} onClick={switchTheme}>
                    <Brightness6Rounded />
                </button>
            </header>

            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                Preston Lund dev
            </footer>
        </div>
    );
};

export default Layout;