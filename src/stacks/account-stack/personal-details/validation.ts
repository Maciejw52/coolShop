import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone Number must be a number')
    .required('Phone Number is required'),
  address: Yup.string().required('Address is required'),
});
