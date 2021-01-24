export interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

const authConfig: IAuthConfig = {
  jwt: {
    secret: process.env.NODE_ENV === 'test' ? 'test-env-secret' : process.env.APP_SECRET || '',
    expiresIn: '1 day',
  },
};

export default authConfig;
