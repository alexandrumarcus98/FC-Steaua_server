import Joi from 'joi';
let joi = Joi

const envVarSchema = joi.object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development').required(),
    PORT: joi.number().default(8000),
    CLUSTER_KEY: joi.string().required().description('Cluster Key'),
    CREDENTIAL_URI_PATH: joi.string().required().description('Uri path'),
    AUTH_MECHANISM: joi.string().required().description('Uri path'),
  })

const { value: envVars } = envVarSchema
  .prefs({
    errors: {
      label: 'key'
    }
  })
  .validate(process.env)


export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongodb: {
    clusterKey: `mongodb+srv://${envVars.CLUSTER_KEY}/?authMechanism=${envVars.AUTH_MECHANISM}&tls=true&tlsCertificateKeyFile=${envVars.CREDENTIAL_URI_PATH}`,
  },
}
