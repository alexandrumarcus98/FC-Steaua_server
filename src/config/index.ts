import Joi from 'joi';
let joi = Joi

const envVarSchema = joi.object()
	.keys({
		NODE_ENV: joi.string().valid('production', 'development').required(),
		PORT: joi.number().default(8000),
		CLUSTER_USERNAME: joi.string().required().description('Cluster Key'),
		CLUSTER_PASSWORD: joi.string().required().description('Cluster Key'),
		CREDENTIAL_URI_PATH: joi.string().required().description('Uri path'),
		AUTH_MECHANISM: joi.string().required().description('Auth mechanism'),
		SECRET_JSONWEBTOKEN: joi.string().required().description('Secret jsonwebtoken')
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
	jsonwebtoken: envVars.SECRET_JSONWEBTOKEN,
	mongodb: {
		clusterKey: `mongodb+srv://${envVars.CLUSTER_USERNAME}:${envVars.CLUSTER_PASSWORD}@cluster0.0frufii.mongodb.net/steaua?retryWrites=true&w=majority`,
	},
}
