import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression'
import cors from 'cors'
import { connect } from './config/db'
import path from 'path'
import { fileURLToPath } from 'url'
import ip from 'ip'
import chalk from 'chalk'
import httpStatus from 'http-status';
import { config } from 'src/config';
import router from 'src/routes';
import { errorConverter, errorHandler } from 'src/modules/errors/handleError';
import ApiError from 'src/modules/errors/apiError';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ipAddress = ip.address();
const log = console.log
if (config.env)
	dotenv.config({
		path: `.env.${config.env}`
	});

const app: Application = express();
const port = config.port || 3000;
connect()
const corsOptions = {
	origin: `${process.env.FE_URL}`,
	credentials: true,
	optionSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(ExpressMongoSanitize());
app.use('/', (req, res) => {
	res.send('Hello World!')
})
app.use('/api', router)
app.use(express.static(path.join(__dirname, 'public/credentials')))
app.get('public/credentials', (_, res) => {
	res.sendFile(path.join(__dirname, 'public/credentials/X509-cert-4908773705758944131.pem'))
})
app.use(errorConverter)
app.use(errorHandler)
app.use((_req, _res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.listen(port, "0.0.0.0", () => {
	log(chalk.bgYellow.black(`Server running at: http://${ipAddress}:${port}`));
});

// let exitHandler = () => {
// 	if (server) {
// 		server.close(() => process.exit(1))
// 	} else {
// 		process.exit(1)
// 	}
// }

// process.on('unhandledRejection', () => exitHandler())
// process.on('uncaughtException', () => exitHandler())

// process.on('SIGTERM', () => {
// 	if (server) server.close()
// })
