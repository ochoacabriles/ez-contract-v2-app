import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Card from 'blockdemy-ui/card';
import Checkbox from 'blockdemy-ui/checkbox';
import Input from 'blockdemy-ui/input';
import Loader from 'blockdemy-ui/loader';
import Typography from 'blockdemy-ui/typography';
import { MdEmail, MdVpnKey } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff} from 'react-icons/io';
import { passwordRegex } from '../../../config/constants';
import { toast } from '../../../providers/theme';
import { useUser } from '../../../providers/user';
import TermsModal from './terms-modal';
import { 
  Container, 
  LogoContainer, 
  CardContainer, 
  RowItems, 
  RowContainer 
} from './elements';
import { SIGN_UP, TERMS } from './requests';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [terms, setTerms] = useState('');
  const { handleSubmit, register, errors, watch } = useForm();
  const { query, mutate } = useApolloClient();

  const { setToken } = useUser();

  useEffect(() => {
    const getTerms = async () => {
      const { data: { terms } } = await query({
        query: TERMS
      });
      setTerms(terms);
    };
    getTerms();
  }, [query]);

  const onSubmit = async form => {
    if (!acceptTerms) {
      toast.danger('Error', 'Please read and accept the Terms of Service');
      return;
    }

    setSubmitting(true);

    const { email, firstName, lastName, password } = form;
    const userToSignUp = {
      email,
      firstName,
      lastName,
      password
    };

    const { data: { signUp: { token } } } = await mutate({
      mutation: SIGN_UP,
      variables: {
        userToSignUp,
      }
    });

    setToken(token);
    setSubmitting(false);
  };

  return (
    <Container>
      <LogoContainer>
        <Typography variant="d1" color="primary">ez-contract.</Typography>
      </LogoContainer>
      <CardContainer>
        <Card minHeight={200} p={20}>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
          <Typography fontWeight={600} fontSize="1.15rem">
            Sign up to ez-contract
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography color="lightGrey" fontSize="0.9rem">Already have an account?</Typography>
            <Link to="/login">
              <Typography color="primary" ml={5} fontSize="0.9rem">Login now</Typography>
            </Link>
          </Box>
          <Input
            name="email"
            label="Email"
            ref={register({ required: 'Input your email' })}
            placeholder="Correo electrónico"
            leftIcon={<Box as={MdEmail} />}
            type="text"
            error={!!errors.email?.message}
            message={errors.email?.message}
          />
          <RowContainer>
            <RowItems>
              <Input
                name="firstName"
                label="First name"
                ref={register({ required: 'Input your first name' })}
                placeholder="First Name"
                type="text"
                error={!!errors.firstName?.message}
                message={errors.firstName?.message}
              />
            </RowItems>
            <RowItems>
              <Input
                name="lastName"
                label="Lastname"
                ref={register({ required: 'Input your lastname' })}
                placeholder="Lastname"
                type="text"
                error={!!errors.lastName?.message}
                message={errors.lastName?.message}
              />
            </RowItems>
          </RowContainer>
          <Input
            name="password"
            label="Password"
            ref={register({
              required: 'Input your password',
              pattern: {
                value: passwordRegex,
                message: 'The password should contain uppercase, lowercase letters and numbers',
              },
            })}
            placeholder="your-secure-password"
            type={showPassword ? 'text' : 'password'}
            leftIcon={<Box as={MdVpnKey} />}
            rightIcon={
              <Box
                clickable
                data-testid="show-password"
                onClick={() => setShowPassword(!showPassword)}
                color="lightDark"
                as={showPassword ? IoMdEyeOff : IoMdEye}
              />
            }
            error={!!errors.password?.message}
            message={errors.password?.message}
          />
          <Input
            name="confirmPassword"
            label="Confirm your password"
            ref={register({
              validate: (value) => value === watch('password') || `Passwords don't match`,
            })}
            placeholder="your-secure-password"
            type={showPasswordConfirm ? 'text' : 'password'}
            leftIcon={<Box as={MdVpnKey} />}
            rightIcon={
              <Box
                clickable
                data-testid="show-password"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                color="lightDark"
                as={showPasswordConfirm ? IoMdEyeOff : IoMdEye}
              />
            }
            error={!!errors.confirmPassword?.message}
            message={errors.confirmPassword?.message}
          />
          <Box display="flex" alignItems="center" mt={20}>
            <Checkbox 
              checked={acceptTerms}
              onChange={({ target: { value } }) => setAcceptTerms(value)}
            />
            <Typography fontSize="0.8rem" ml={10} mt={-8}>
              I accept ez-contract's
            </Typography>
            <Box clickable onClick={() => setShowModal(true)}>
              <Typography fontSize="0.8rem" color="primary" ml={5} mt={-8}>Terms of Service</Typography>
            </Box>
          </Box>
          <Button
            uppercase={false}
            disabled={submitting}
            color="primary"
            variant="soft"
            fullWidth
          >
            {submitting ? <Loader data-testid="login-loader" size="12" /> : 'Sign up'}
          </Button>
        </Box>
      </Card>
    </CardContainer>
    <TermsModal active={showModal} setShowModal={setShowModal} terms={terms} />
  </Container>);
};

export default SignUp;