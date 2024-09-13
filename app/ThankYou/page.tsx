"use client";
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import LampIcon from '../Asset/LampIcon.svg'


const ThankYouPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <LampIcon className={styles.icon}/>
            <h1>Thank You!</h1>
            <p className={styles.sub_title}>Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.</p>
            <button
                className={styles.submit_button}
                onClick={() => router.push('/')}
            >
                Go Back to HomePage
            </button>
        </div>
    );
};

export default ThankYouPage;
