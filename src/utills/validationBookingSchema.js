import * as Yup from 'yup'

export const validationBookingSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  date: Yup.string().required('Date is required'),
  coments: Yup.string(),
})
