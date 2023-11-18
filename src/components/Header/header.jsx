import { Link } from "react-router-dom";
import styles from './header.module.css';

export default function Header() {
    const currencyOptions = [
        { value: 'BGN', label: 'BGN', },
        { value: 'EUR', label: 'EUR', },
    ];

    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}><Link to='/'><img src="/images/logo.svg" alt="" /></Link></div>
                <div className={styles.searchBar}>
                    <form action="#">
                        <input type="text" placeholder="Search..." />
                        <button className={styles.searchButton} type="submit">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l6 5.99L20.49 19l-5.99-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                                />
                            </svg>
                        </button>
                    </form>
                </div>

                <div className={styles.rightSection}>
                    <Link to="/profile" className={`${styles.icon} ${styles.profileIcon}`}>
                        <img src="/images/user.svg" alt="" width="30" height="30" />
                    </Link>

                    <Link to="/wishlist" className={`${styles.icon} ${styles.wishlistIcon}`}>
                        <img src="/images/wishlist.svg" alt="" width="30" height="30" />
                    </Link>

                    <Link to="/cart" className={`${styles.icon} ${styles.cartIcon}`}>
                        <img src="/images/cart.svg" alt="" width="30" height="30" />
                    </Link>
                    <hr className={styles.line} />
                    <select className={styles.currencySelector}>
                        {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <nav className={styles.navigation}>
                <div className={styles.links}>
                    <Link className={styles.link} to="/home">Home</Link>
                    <Link className={styles.link} to="/cars">Cars</Link>
                    <Link className={styles.link} to="/reviews">Reviews</Link>
                    <Link className={styles.link} to="/create">Create</Link>
                </div>
            </nav>
        </>
    );
}
