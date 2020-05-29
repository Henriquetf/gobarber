const jwtSecret = 'j3jwQtnuWGvpCWd7QWFbVnTnEkpRjPCpSYbtPbrCMaI=';
const jwtExpiresIn = '1 day';

const authConfig = {
  jwt: {
    secret: jwtSecret,
    expiresIn: jwtExpiresIn,
  },
};

export default authConfig;
