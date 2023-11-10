import Joi from 'joi';
let joi = Joi

const envVarSchema = joi.object()
	.keys({
		NODE_ENV: joi.string().valid('production', 'development').required(),
		PORT: joi.number().default(8000),
		CLUSTER_USERNAME: joi.string().required().description('Cluster Key'),
		CLUSTER_PASSWORD: joi.string().required().description('Cluster Password'),
		CREDENTIAL_URI_PATH: joi.string().required().description('Uri path'),
		AUTH_MECHANISM: joi.string().required().description('Auth mechanism'),
		SECRET_JSONWEBTOKEN: joi.string().required().description('Secret jsonwebtoken'),
		APP_CLIENT_ID: joi.string().required().description('Google client id'),
		APP_CLIENT_SECRET: joi.string().required().description('Google app client secret'),
		APP_REFRESH_TOKEN: joi.string().required().description('Google app client refresh token'),
		APP_USER_EMAIL: joi.string().required().description('Google app client refresh token')
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
	APP_CLIENT_ID: envVars.APP_CLIENT_ID,
	APP_CLIENT_SECRET: envVars.APP_CLIENT_SECRET,
	APP_REFRESH_TOKEN: envVars.APP_REFRESH_TOKEN,
	APP_USER_EMAIL: envVars.APP_USER_EMAIL,
	jsonwebtoken: envVars.SECRET_JSONWEBTOKEN,
	mongodb: {
		clusterKey: `mongodb+srv://${envVars.CLUSTER_USERNAME}:${envVars.CLUSTER_PASSWORD}@cluster0.0frufii.mongodb.net/steaua?retryWrites=true&w=majority`,
	},
}
