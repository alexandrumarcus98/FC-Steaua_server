import chalk from 'chalk'
import mongoose from "mongoose";
import { config } from '../config'
const log = console.log

export const connect = async () => {
	await mongoose.connect(config.mongodb.clusterKey)
		.then(async (resp) => {
			log(chalk.bgGreen.black('Database connected succesfully to server.'))
			log(chalk.bgGreen.black(`Host: ${resp?.connection?.host}`))
		})
		.catch(err => {
			log(err)
			process.exit()
			return
		})
}
