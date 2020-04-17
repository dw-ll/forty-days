const dev = {
  STRIPE_KEY: "sk_test_H7CgG6cq5s8LFrYkrKlTM7tx",
  s3: {
    REGION: "us-east-2",
    BUCKET: "dan-notes-uploads",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://5ykq2wl4b0.execute-api.us-east-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_7CBVM7LAT",
    APP_CLIENT_ID: "1q3i7auvu1uqdne3n7ki8p8hgn",
    IDENTITY_POOL_ID: "us-east-2:91ef7437-e100-4074-bbbc-cb1bf8465b32",
  },
};

const prod = {
  STRIPE_KEY: "sk_test_H7CgG6cq5s8LFrYkrKlTM7tx",
  s3: {
    REGION: "us-east-2",
    BUCKET: "dan-notes-uploads",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://12a524p58b.execute-api.us-east-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_DGgylUsZ4",
    APP_CLIENT_ID: "5fch667clpmhb3iill25g0d320",
    IDENTITY_POOL_ID: "us-east-2:ffe5ab4b-ead4-4e29-89a9-f341d9d946a1",
  },
};
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
