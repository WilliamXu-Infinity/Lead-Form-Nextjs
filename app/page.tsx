"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { leadSchema } from './validation/leadSchema';
import PocketBase from 'pocketbase';
import styles from './page.module.css'
import HomePageTop from './Asset/HomePageTop.png'
import Image from 'next/image';
import LampIcon from './Asset/LampIcon.svg'
import PenIcon from './Asset/PenIcon.svg'
import BoardIcon from './Asset/BoardIcon.svg'

const pb = new PocketBase('http://127.0.0.1:8090');

interface LeadFormValues {
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    linkedin: string;
    visaInterest: string;
    // resume: FileList;
    message?: string;
}

const Home: React.FC = () => {
    const router = useRouter(); 

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormValues>({
        resolver: yupResolver(leadSchema)
    });

    const onSubmit = async (data: LeadFormValues) => {
        const formData = new FormData();
        formData.append('name', data.firstName + ' ' + data.lastName);
        formData.append('email', data.email);
        formData.append('linkedin', data.linkedin);
        formData.append('visaInterest', data.visaInterest);
        formData.append('citizenship', data.citizenship);
        // formData.append('resume', data.resume[0]);
        formData.append('message', data?.message || '');
        formData.append('status', 'Pending');

        try {
            const response = await pb.collection('leaderTable').create(formData);
            console.log('Record created:', response, formData);
            reset();
            router.push('/ThankYouPage');
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
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'AU', label: 'Australia' },
        { value: 'IN', label: 'India' },
    ];

    return (
        <div className={styles.container}>
            <Image
                src={HomePageTop}
                alt="Picture of the author"
                layout="intrinsic"
            ></Image>

            <div className={styles.list_container}>
            <h2>Want to understand your visa options?</h2>
            <p className={styles.sub_title}>Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.</p>
            <PenIcon className={styles.icon}/>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form_list}>
                <input {...register('firstName')} placeholder="First Name" className={styles.form_input}/>
                <p className={styles.error_message}>{errors.firstName?.message}</p>

                <input {...register('lastName')} placeholder="Last Name" className={styles.form_input} />
                <p className={styles.error_message}>{errors.lastName?.message}</p>

                <input {...register('email')} placeholder="Email" className={styles.form_input} />
                <p className={styles.error_message}>{errors.email?.message}</p>

                <select {...register('citizenship')} className={styles.form_input}>
                    <option value="" disabled>Select Citizenship</option>
                    {citizenshipOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p className={styles.error_message}>{errors.citizenship?.message}</p>

                <input {...register('linkedin')} placeholder="LinkedIn URL" className={styles.form_input} />
                <p className={styles.error_message}>{errors.linkedin?.message}</p>


                <BoardIcon className={styles.icon}/>
                <h2>Visa categories of interest?</h2>
                <div className={styles.visa_selection}>
                    {visaOptions.map((option) => {
                        return (
                            <label key={option.value}  className={styles.visa_selection_label}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    {...register('visaInterest')}
                                />
                                <p className={styles.visa_selection_label}>
                                    {option.label}
                                </p>
                            </label>
                        );
                    })}
                </div>
                <p className={styles.error_message}>{errors.visaInterest?.message}</p>

                {/* <input type="file" {...register('resume')} />
                <p>{errors.resume?.message}</p> */}

                <LampIcon className={styles.icon}/>
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
