import setRateLimit from "express-rate-limit";

const rateLimitMiddlewareMail = setRateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: "Ne pare rău, ai încercat de prea multe ori. Te rog, așteaptă.",
  headers: true,
});

export default rateLimitMiddlewareMail;
