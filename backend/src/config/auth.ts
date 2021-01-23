const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1 day',
  },
};

export default authConfig;
