import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No Email Address Provided'),
  password: Yup.string().required('No Password Provided')
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No Email Address Provided'),
  password: Yup.string().min(5, 'Password too short').required('No Password Provided'),
  confirmPassword: Yup.mixed().test(
    'match',
    'Passwords do not match',
    function () {
      return this.parent.password === this.parent.confirmPassword;
    }
  )
})