import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import run from './src/config/db/'
import path from 'path'
import { fileURLToPath } from 'url'
import ip from 'ip'
import chalk from 'chalk'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ipAddress = ip.address();
const log = console.log
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

run()

app.get('/', (req: Request, res: Response) => {
  res.send('');
});

app.use(express.static(path.join(__dirname, 'public/credentials')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/credentials/X509-cert-4908773705758944131.pem'))
})

app.listen(port, () => {
  log(chalk.bgYellow.black(`Server running at: http://${ipAddress}:${port}`));
});