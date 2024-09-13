"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { leadSchema } from './validation/leadSchema';
import PocketBase from 'pocketbase';
import styles from './page.module.css'
import Image from 'next/image';
import HomePageTop from './Asset/HomePageTop.png';
import LampIcon from './Asset/LampIcon.svg';
import PenIcon from './Asset/PenIcon.svg';
import BoardIcon from './Asset/BoardIcon.svg';

const pb = new PocketBase('http://127.0.0.1:8090');

interface LeadFormValues {
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    linkedin: string;
    visaInterest: string;
    resume: FileList;
    message?: string;
}

const Home: React.FC = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormValues>({
        resolver: yupResolver(leadSchema),
    });

    const onSubmit = async (data: LeadFormValues) => {
        const formData = new FormData();

        if (data.resume && data.resume[0]) {
            formData.append('resume', data.resume[0]);
        }
        formData.append('name', data.firstName + ' ' + data.lastName);
        formData.append('email', data.email);
        formData.append('linkedin', data.linkedin);
        formData.append('visaInterest', data.visaInterest);
        formData.append('citizenship', data.citizenship);
        formData.append('message', data?.message || '');
        formData.append('status', 'Pending');

        try {
            const response = await pb.collection('leaderTable').create(formData);
            console.log('Record created:', response);
            reset();
            router.push('/ThankYou');
        } catch (error) {
            console.error(error);
            alert('Error submitting the form');
        }
    };

    const visaOptions = [
        { value: 'O-1', label: 'O-1' },
        { value: 'EB-1A', label: 'EB-1A' },
        { value: 'EB02 NIW', label: 'EBEB02 NIW' },
        { value: "I don't know", label: "I don't know" },
    ];

    const citizenshipOptions = [
        { value: '', label: 'Select Citizenship', disabled: true },
        { value: 'US', label: 'United States', disabled: false },
        { value: 'CA', label: 'Canada', disabled: false },
        { value: 'UK', label: 'United Kingdom', disabled: false },
        { value: 'AU', label: 'Australia', disabled: false },
        { value: 'CN', label: 'China', disabled: false },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.home_image}>
                <Image
                    src={HomePageTop}
                    alt="Home Page Top"
                    layout="intrinsic"
                />
            </div>
            

            <div className={styles.list_container}>
                <h2>Want to understand your visa options?</h2>
                <p className={styles.sub_title}>Submit the form below...</p>
                <PenIcon className={styles.icon} />
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form_list}>
                    <input {...register('firstName')} placeholder="First Name" className={styles.form_input} />
                    <p className={styles.error_message}>{errors.firstName?.message}</p>

                    <input {...register('lastName')} placeholder="Last Name" className={styles.form_input} />
                    <p className={styles.error_message}>{errors.lastName?.message}</p>

                    <input {...register('email')} placeholder="Email" className={styles.form_input} />
                    <p className={styles.error_message}>{errors.email?.message}</p>

                    <select {...register('citizenship')} className={styles.form_input}>
                        {citizenshipOptions.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <p className={styles.error_message}>{errors.citizenship?.message}</p>

                    <input {...register('linkedin')} placeholder="LinkedIn URL" className={styles.form_input} />
                    <p className={styles.error_message}>{errors.linkedin?.message}</p>
                    <input type="file" {...register('resume')} className={styles.form_input} accept="application/pdf" />

                    <BoardIcon className={styles.icon} />
                    <h2>Visa categories of interest?</h2>
                    <div className={styles.visa_selection}>
                        {visaOptions.map(option => (
                            <label key={option.value} className={styles.visa_selection_label}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    {...register('visaInterest')}
                                />
                                <p className={styles.visa_selection_label}>
                                    {option.label}
                                </p>
                            </label>
                        ))}
                    </div>
                    <p className={styles.error_message}>{errors.visaInterest?.message}</p>

                    <LampIcon className={styles.icon} />
                    <p className={styles.error_message}>{errors.resume?.message}</p>

                    <h2>How can we help you?</h2>
                    <textarea {...register('message')} 
                        placeholder="What is your current status and when does it expire?
    What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?" 
                        className={styles.form_textarea} 
                    />

                    <button type="submit" className={styles.submit_button}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
