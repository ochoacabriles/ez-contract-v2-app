import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
import Box from 'blockdemy-ui/box';
import Button from 'blockdemy-ui/button';
import Card from 'blockdemy-ui/card';
import Input from 'blockdemy-ui/input';
import Loader from 'blockdemy-ui/loader';
import Typography from 'blockdemy-ui/typography';
import { MdPerson, MdVpnKey } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff} from 'react-icons/io';
import { useUser } from '../../../providers/user';
import { Container, LogoContainer, CardContainer } from './elements';
import { LOG_IN } from './requests';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const { query } = useApolloClient();

  const { setToken } = useUser();

  const onSubmit = async userToLogin => {
    setSubmitting(true);

    try {
      const { data } = await query({
        query: LOG_IN,
        variables: {
          userToLogin,
        },
        fetchPolicy: 'network-only',
      });
      const { login: { token } } = data;
      console.log({ token })
      setToken(token);
    } catch (err) {
      setErrorMessage(err.message || 'Unknown error');
    }

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
            Log in to ez-contract
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography color="lightGrey" fontSize="0.9rem">Not a member?</Typography>
            <Link to="/sign-up">
              <Typography color="primary" ml={5} fontSize="0.9rem">Sign up now</Typography>
            </Link>
          </Box>
          <Typography mt={20} color="lightGrey" fontSize="0.75rem">
            Email
          </Typography>
          <Input
            name="email"
            ref={register({ required: 'Input your email' })}
            placeholder="Email"
            leftIcon={<Box as={MdPerson} />}
            type="text"
            error={!!errors.email?.message}
            message={errors.email?.message}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography mt={20} color="lightGrey" fontSize="0.75rem">
              Password
            </Typography>
            <Typography mt={20} color="primary" fontSize="0.75rem">
              Forgot your password?
            </Typography>
          </Box>
          <Box position="relative">
            <Input
              name="password"
              ref={register({ required: 'Input your password' })}
              placeholder="your-secure-passowrd"
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
              error={!!errors.password?.message || !!errorMessage}
              message={errors.password?.message ?? errorMessage}
            />
          </Box>
          <Button
            uppercase={false}
            mt={30}
            disabled={submitting}
            color="primary"
            variant="soft"
            fullWidth
          >
            {submitting ? <Loader data-testid="login-loader" size="12" /> : 'Login'}
          </Button>
        </Box>
      </Card>
    </CardContainer>
  </Container>);
};

export default Login;