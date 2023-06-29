export enum Endpoints {
  'DEVELOPMENT',
  'STAGING',
  'PRODUCTION'
};

const endpoints = {
  DEVELOPMENT: 'http://localhost:5002/dev-oken-waas/us-central1/api',
  STAGING: 'https://us-central1-dev-oken-waas.cloudfunctions.net/api',
  PRODUCTION: 'https://us-central1-prod-oken-waas.cloudfunctions.net/api'
}

export default endpoints