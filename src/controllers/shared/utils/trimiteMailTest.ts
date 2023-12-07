import asyncHandler from "express-async-handler";
import { config } from "src/config/config";
import { createTransporter } from "src/config/nodemailer/config";

export const trimiteMailTest: any = asyncHandler(
  async (req, res): Promise<any> => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail({
        from: `"Ultima Redută 1947" <${config.APP_USER_EMAIL}>`,
        to: "alexmarcus20141@gmail.com",
        subject: "Ultima Redută - Verificare Cod Înregistrare",
        html: "s",
      });
      return res.status(201).json({ msg: "YES!!!" });
    } catch (err) {
      return res.status(201).json(err);
    }
  }
);
