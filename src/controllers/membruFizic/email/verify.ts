import asyncHandler from "express-async-handler";
import TokenEmailOTP from "src/models/tokenEmail";

export const verificareEmail: any = asyncHandler(
  async (req, res): Promise<any> => {
    const { number, email } = req.body;

    if (!email) {
      return res.status(401).json({ message: "Email-ul este necesar." });
    }

    if (!number) {
      return res.status(401).json({ message: "OTP-ul este necesar." });
    }

    let findToken = await TokenEmailOTP.findOne({
      email: email,
      number: number,
    });

    if (findToken) {
      return res.status(201).json({ message: "Valid", isValid: true });
    } else {
      return res.status(403).json({ message: "Cod invalid", isValid: false });
    }
  }
);
