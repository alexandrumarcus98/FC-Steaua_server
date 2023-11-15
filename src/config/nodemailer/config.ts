import { Types } from "mongoose";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { config } from "../config";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const sendOTPTemplate = (number: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Verificare Cont</title>
	<!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
	<table role="presentation"
		style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
		<tbody>
			<tr>
				<td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
					<table role="presentation"
						style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
						<tbody>
							<tr>
								<td style="padding: 40px 0px 0px;">
									<div style="padding: 20px; background-color: rgb(255, 255, 255);">
										<div style="color: rgb(0, 0, 0); text-align: left;">
											<h1 style="margin: 1rem 0">Cod verificare</h1>
											<p style="padding-bottom: 16px">Te rog foloseste acest cod pentru verificare:</p>
											<p style="padding-bottom: 16px"><strong style="font-size: 140%">${number}</strong></p>
											<p style="padding-bottom: 16px">Mulțumim, <br>Ultima Redută 1947</p>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>`;
};

export const sendQRCodeAndConfirmTemplate = (
  code: string,
  prenume: string,
  nrComanda: string,
  canvasUrl: string
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>QR CODE - Create cont</title>
	<!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
	<table role="presentation"
		style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
		<tbody>
			<tr>
				<td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
					<table role="presentation"
						style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
						<tbody>
							<tr>
								<td style="padding: 40px 0px 0px;">
									<div style="padding: 20px; background-color: rgb(255, 255, 255);">
										<div style="color: rgb(0, 0, 0); text-align: left;">
											<h1 style="margin: 1rem 0">Salut, ${prenume},</h1>
											<p style="padding-bottom: 16px">Contul tău a fost creat cu success. Foloseste QR-ul de mai jos pentru a te bucura de beneficiile noastre, privind comanda cu nr-ul ${nrComanda}.</p>
											<img style="padding-bottom: 16px" src="${code}" />
											<img style="padding-bottom: 16px" src="${canvasUrl}" />
											<p style="padding-bottom: 16px">Mulțumim, <br>Ultima Redută 1947</p>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>`;
};

const forgotPasswordEmailTemplate = (
  tokenForgotPw: string,
  userId: Types.ObjectId,
  prenume: string
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>QR CODE - Create cont</title>
	<!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
	<table role="presentation"
		style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
		<tbody>
			<tr>
				<td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
					<table role="presentation"
						style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
						<tbody>
							<tr>
								<td style="padding: 40px 0px 0px;">
									<div style="padding: 20px; background-color: rgb(255, 255, 255);">
										<div style="color: rgb(0, 0, 0); text-align: left;">
											<h1 style="margin: 1rem 0">Salut, ${prenume},</h1>
											<p style="padding-bottom: 16px">Pentru a putea să iți schimbi parola, accesează următorul link:</p>
											<a href="${config?.fe_url}/utilizatori/recuperareParola/verificare/search?userId=${userId}&tokenId=${tokenForgotPw}" target="_blank"
														style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: black;">Recuperare Parolă</a>
											<p style="padding-bottom: 16px">Mulțumim, <br>Ultima Redută 1947</p>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>`;
};

const createTransporter = async () => {
  try {
    const transport = nodemailer?.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: "alexandru.marcus98@gmail.com",
        pass: "rnir tyly rwqq gpwo ",
      },
      secure: true,
    });
    return transport;
  } catch (err) {
    return err;
  }
};

export const sendVerificationCode = async (email: string, token: string) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail({
      from: "Ultima Redută 1947",
      to: email,
      subject: "Ultima Redută - Verificare Cod Înregistrare",
      html: sendOTPTemplate(token),
    });
  } catch (err) {
    return err;
  }
};

export const sendPasswordForgotEmail = async (
  email: string,
  token: string,
  userId: Types.ObjectId,
  prenume: string
) => {
  try {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail({
      from: "Ultima Redută 1947",
      to: email,
      subject: "Ultima Redută - Recuperare Parolă",
      html: forgotPasswordEmailTemplate(token, userId, prenume),
    });
  } catch (err) {
    return err;
  }
};

export const sendQRCodeAccountConfirmation = async (
  tipAbonament: string,
  nrMembru: string,
  nume: string,
  email: string,
  prenume: string,
  serieUtilizator: string,
  nrComanda: string
) => {
  const canvas = createCanvas(200, 200);
  const context = canvas.getContext("2d");
  loadImage("examples/images/lime-cat.jpg").then(async (imageObj) => {
    context!.drawImage(
      imageObj,
      0,
      0,
      imageObj.width,
      imageObj.height,
      0,
      0,
      425,
      250
    );
    context!.font = "12pt Calibri";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "start";
    context!.fillText(`${nume} ${prenume}`, 25, 200);
    context!.font = "6pt Calibri";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "center";
    context!.fillText(`${serieUtilizator}`, canvas?.width! / 2, 240);

    context!.font = "9pt Calibri";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "center";
    context!.fillText(nrMembru, canvas?.width! - 50, 200);

    context!.font = "12pt Calibri";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "center";
    context!.fillText(
      tipAbonament === "tipAbonamnet_7" ? "Card 7 mai" : "Card 1947",
      canvas?.width! / 2,
      70
    );
    try {
      let img = await QRCode.toDataURL(
        `https://ultima-reduta.vercel.app/verificareMembru/${serieUtilizator}`
      );
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail({
        from: "Ultima Redută 1947",
        attachDataUrls: true,
        to: email,
        subject: `Ultima Redută - comanda ${nrComanda} și confirmare creare cont.`,
        html: sendQRCodeAndConfirmTemplate(
          img,
          prenume,
          nrComanda,
          canvas.toDataURL()
        ),
      });
    } catch (err) {
      return err;
    }
  });
};
