import * as Yup from 'yup';

export const leadSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  citizenship: Yup.string().required('Country of Citizenship is required'),
  linkedin: Yup.string().url('Invalid LinkedIn URL').required('LinkedIn is required'),
  visaInterest: Yup.string().required('Visa interest is required'),
//   resume: Yup.mixed().required('Resume is required'),
  message: Yup.string(),
});
