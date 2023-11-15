import { Types } from "mongoose";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { config } from "../config";
import path from "path";
import { createCanvas, loadImage, registerFont } from "canvas";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendOTPTemplate = (number: string) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Verificare Cont</title>
	<!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
	<style type="text/css">

	body {
		margin: 0;
		padding: 0;
		}

	table {
		border-collapse:collapse;
		mso-table-lspace:0;
		mso-table-rspace:0;
		}

	h1 {
		margin:0.67em 0;
		font-size:2em;
		}
	h2 {
		margin:0.83em 0;
		font-size:1.5em;
		}

	html[dir] h3, h3 {
		margin:1em 0;
		font-size:1.17em;
		}

	span.MsoHyperlink {
		color: inherit !important;
		mso-style-priority: 99 !important;
		}

	span.MsoHyperlinkFollowed {
		color: inherit !important;
		mso-style-priority: 99 !important;
	}

	#root [x-apple-data-detectors=true],
	a[x-apple-data-detectors=true]{
		color: inherit !important;
		text-decoration: inherit !important;
	}

	[x-apple-data-detectors-type="calendar-event"] {
		color: inherit !important;
		-webkit-text-decoration-color: inherit !important;
	}

	u + .body a {
		color: inherit;
		text-decoration: none;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		}

	.body {
		word-wrap: normal;
		word-spacing:normal;
	}

	div[style*="margin: 16px 0"] {
		margin: 0!important;
		}

	#message *{
		all:revert
	}

	[data-markjs]{
		color:inherit;
		padding:0;
		background:none;
	}

	body,
	table,
	td,
	a {
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}

	body {
		width: 100% !important;
		height: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	a[x-apple-data-detectors] {
		font-family: inherit !important;
		font-size: inherit !important;
		font-weight: inherit !important;
		line-height: inherit !important;
		color: inherit !important;
		text-decoration: none !important;
	}

	div[style*="margin: 16px 0;"] {
		margin: 0 !important;
	}

	img {
		-ms-interpolation-mode: bicubic;
		height: auto;
		line-height: 100%;
		text-decoration: none;
		border: 0;
		outline: none;
	}
	</style>
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
	<style type="text/css">

	body {
		margin: 0;
		padding: 0;
		}

	table {
		border-collapse:collapse;
		mso-table-lspace:0;
		mso-table-rspace:0;
		}

	h1 {
		margin:0.67em 0;
		font-size:2em;
		}
	h2 {
		margin:0.83em 0;
		font-size:1.5em;
		}

	html[dir] h3, h3 {
		margin:1em 0;
		font-size:1.17em;
		}

	span.MsoHyperlink {
		color: inherit !important;
		mso-style-priority: 99 !important;
		}

	span.MsoHyperlinkFollowed {
		color: inherit !important;
		mso-style-priority: 99 !important;
	}

	#root [x-apple-data-detectors=true],
	a[x-apple-data-detectors=true]{
		color: inherit !important;
		text-decoration: inherit !important;
	}

	[x-apple-data-detectors-type="calendar-event"] {
		color: inherit !important;
		-webkit-text-decoration-color: inherit !important;
	}

	u + .body a {
		color: inherit;
		text-decoration: none;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		}

	.body {
		word-wrap: normal;
		word-spacing:normal;
	}

	div[style*="margin: 16px 0"] {
		margin: 0!important;
		}

	#message *{
		all:revert
	}

	[data-markjs]{
		color:inherit;
		padding:0;
		background:none;
	}

	body,
	table,
	td,
	a {
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}

	body {
		width: 100% !important;
		height: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	a[x-apple-data-detectors] {
		font-family: inherit !important;
		font-size: inherit !important;
		font-weight: inherit !important;
		line-height: inherit !important;
		color: inherit !important;
		text-decoration: none !important;
	}

	div[style*="margin: 16px 0;"] {
		margin: 0 !important;
	}

	img {
		-ms-interpolation-mode: bicubic;
		height: auto;
		line-height: 100%;
		text-decoration: none;
		border: 0;
		outline: none;
	}
	</style>
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
											<p style="padding-bottom: 16px;">Contul tău a fost creat cu success. Foloseste QR-ul de mai jos pentru a te bucura de beneficiile noastre, privind comanda cu nr-ul ${nrComanda}.</p>
											<div style="padding-bottom: 16px;">
												<img src="${code}" id="qrCode" />
											</div>
											<table cellpadding="2" cellspacing="2" width="212" height="125" style="padding-bottom: 16px; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif;">
												<tr>
													<td width="212" height="125" align="center">
														<img src="cid:cardsteaua" alt="Card Steaua" border="0" width="212" height="125" style="display: block; width: 212px; max-width: 212px; min-width: 125px;" title="Card Steaua">
													</td>
												</tr>
											</table>
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

export const forgotPasswordEmailTemplate = (
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
		<style type="text/css">

	body {
		margin: 0;
		padding: 0;
		}

	table {
		border-collapse:collapse;
		mso-table-lspace:0;
		mso-table-rspace:0;
		}

	h1 {
		margin:0.67em 0;
		font-size:2em;
		}
	h2 {
		margin:0.83em 0;
		font-size:1.5em;
		}

	html[dir] h3, h3 {
		margin:1em 0;
		font-size:1.17em;
		}

	span.MsoHyperlink {
		color: inherit !important;
		mso-style-priority: 99 !important;
		}

	span.MsoHyperlinkFollowed {
		color: inherit !important;
		mso-style-priority: 99 !important;
	}

	#root [x-apple-data-detectors=true],
	a[x-apple-data-detectors=true]{
		color: inherit !important;
		text-decoration: inherit !important;
	}

	[x-apple-data-detectors-type="calendar-event"] {
		color: inherit !important;
		-webkit-text-decoration-color: inherit !important;
	}

	u + .body a {
		color: inherit;
		text-decoration: none;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
		}

	.body {
		word-wrap: normal;
		word-spacing:normal;
	}

	div[style*="margin: 16px 0"] {
		margin: 0!important;
		}

	#message *{
		all:revert
	}

	[data-markjs]{
		color:inherit;
		padding:0;
		background:none;
	}

	body,
	table,
	td,
	a {
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
	}

	body {
		width: 100% !important;
		height: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	a[x-apple-data-detectors] {
		font-family: inherit !important;
		font-size: inherit !important;
		font-weight: inherit !important;
		line-height: inherit !important;
		color: inherit !important;
		text-decoration: none !important;
	}

	div[style*="margin: 16px 0;"] {
		margin: 0 !important;
	}

	img {
		-ms-interpolation-mode: bicubic;
		height: auto;
		line-height: 100%;
		text-decoration: none;
		border: 0;
		outline: none;
	}
	</style>
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
  const canvas = createCanvas(425, 250);
  const context = canvas.getContext("2d");
  registerFont(
    path.join(__dirname, "fonts/intelone-mono-font-family-regular.otf"),
    {
      family: "Intel",
    }
  );
  loadImage(path.join(__dirname, "images/card.png")).then(async (imageObj) => {
    context!.drawImage(
      imageObj,
      0,
      0,
      imageObj.width,
      imageObj.height,
      0,
      0,
      canvas?.width,
      canvas?.height
    );
    context!.font = "12pt Intel";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "start";
    context!.fillText(`${nume} ${prenume}`, 25, 200);
    context!.font = "6pt Intel";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "center";
    context!.fillText(
      `${serieUtilizator}`,
      canvas?.width! / 2,
      canvas.height - 10
    );

    context!.font = "9pt Intel";
    context!.fillStyle = "#ffffff";
    context!.textAlign = "center";
    context!.fillText(nrMembru, canvas?.width! - 50, 200);

    context!.font = "12pt Intel";
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
        attachments: [
          {
            filename: "cardSteaua.png",
            path: canvas.toDataURL(),
            cid: "cardsteaua",
          },
        ],
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
