import { httpClient } from '@/app/core/api';

export const AuthenticationService = {
  signin: async (
    email: string,
    password: string,
    userType: 'student' | 'admin'
  ) => {
    const response = await httpClient.post('/auth/signin', {
      email,
      password,
      userType,
    });
    return response.data;
  },
};
