import * as yup from 'yup'
const bookingFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required')
    .trim(),
  phone: yup
    .string()
    .required('Phone is required')
    .trim()
    .min(8, 'Phone must be at least 9 digits')
    .max(15, 'Phone can be max 15 digits')
    .matches(/^\+?\d+$/, 'Phone must contain only digits'),
  telegram: yup.string().trim(),
  service: yup.string().required('Service is required').trim(),
  date: yup.date().required('Date is required'),
})
export default bookingFormSchema
