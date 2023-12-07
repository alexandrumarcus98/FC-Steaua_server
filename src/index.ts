import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import { connect } from "./config/db/index";
import path from "path";
import { fileURLToPath } from "url";
import ip from "ip";
import chalk from "chalk";
import router from "src/routes";
import { errorConverter, errorHandler } from "src/modules/errors/handleError";
import geoip from "geoip-lite";
import { config } from "./config/config";
import morgan from "morgan";
import { createTransporter } from "./config/nodemailer/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ipAddress = ip.address();
const log = console.log;
if (config.env)
  dotenv.config({
    path: `.env.${config.env}`,
  });

const app: Application = express();
const port = config.port || 8000;
connect();
const corsOptions = {
  origin: `${process.env.FE_URL}`,
  credentials: true,
  optionSuccessStatus: 200,
};
if (process.env?.ENV !== "production") {
  app.use(morgan("dev"));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
  app.use(function (req, res: any, next) {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'", "data:"],
            baseUri: ["'self'"],
            blockAllMixedContent: [],
            connectSrc: ["'self'", "data:", "https:", "ws://localhost:8001"],
            fontSrc: ["'self'", "https:"],
            frameAncestors: ["self"],
            frameSrc: ["blob:"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            objectSrc: ["'self'", "blob:"],
            scriptSrc: ["'self'", "data:", "'unsafe-inline'"], // test firefox
            scriptSrcAttr: ["none", "'unsafe-inline'"],
            scriptSrcElem: [
              "'self'",
              "data:",
              "'unsafe-inline'",
              "'unsafe-eval'",
              "https:",
            ],
            styleSrc: ["'self'", "data:", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrcElem: [
              "'self'",
              "data:",
              "'unsafe-inline'",
              "'unsafe-eval'",
              "https:",
            ],
            upgradeInsecureRequests: [],
          },
          reportOnly: false,
        },
      })
    );
    if (req.secure) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains; preload"
      );
    }
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Request-Headers", "*");
    next();
  });
}
app.use((req, res, next) => {
  res.locals.ua = req.get("User-Agent");
  if (req.headers["x-forwarded-for"] === undefined)
    res.locals.ipInfo = geoip.lookup(
      req?.ip || req?.socket?.remoteAddress || ""
    );
  else res.locals.ipInfo = geoip.lookup(req?.headers["x-forwarded-for"][0]);
  next();
});
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(ExpressMongoSanitize());
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "public/credentials")));
app.get("public/credentials", (_, res) => {
  res.sendFile(
    path.join(__dirname, "public/credentials/X509-cert-4908773705758944131.pem")
  );
});
app.use(errorConverter);
app.use(errorHandler);

let server = app.listen(port, "0.0.0.0", () => {
  log(chalk.bgYellow.black(`Server running at: http://${ipAddress}:${port}`));
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

process.on("SIGTERM", () => {
  if (server) server.close();
});
