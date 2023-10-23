import chalk from 'chalk'
import mongoose from "mongoose";
const log = console.log
let clusterURL = process?.env.REACT_APP_CLUSTER_KEY
const authMechanism = "MONGODB-X509";
let clientPEMFile = process.env.REACT_APP_CREDENTIAL_URI_PATH

let run = async () => {
  await mongoose.connect(`mongodb+srv://${clusterURL}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`)
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

export default run