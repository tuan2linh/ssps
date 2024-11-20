import { packageJson } from '../../jsonimport.js';
import config from '../config/config.js';

const { version } = packageJson;

console.log(version);

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: "API Documentation for 'HCMUT-SSPS'",
    version,
    description: 'This is the API documentation for the HCMUT-SSPS project'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

export default swaggerDef;
