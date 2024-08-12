import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d+$/, 'Card number must be a number')
    .length(16, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d+$/, 'Card number must be a number')
    .length(3, 'CVV must be 3 digits')
    .required('CVV is required'),
});
