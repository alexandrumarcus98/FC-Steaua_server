import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import MembruFizic from "src/models/membruFizic";

const detaliiMembruFizic: any = asyncHandler(
  async (req, res): Promise<any> => {
    console.log(req.cookies);
    const cookiesNoSplit = req.header("Cookie");
    const cookies = cookiesNoSplit?.split(";");
    let foundToken = "";
    cookies?.forEach((k) => {
      if (k.startsWith(" jwt") || k.startsWith("jwt")) {
        foundToken = k.split("=")[1];
      }
    });
    let decodedToken = jwt.decode(foundToken);

    if (!decodedToken) return res.status(401).json({ message: "Eroare." });

    const user = await MembruFizic.findById(decodedToken?.userId);

    if (user) {
      return res.status(201).json(user);
    } else {
      return res
        .status(401)
        .json({ message: "Utilizatorul nu a fost gasit..." });
    }
  }
);

const locatieUseri: any = asyncHandler(
  async (req, res): Promise<any> => {
    let users = await MembruFizic.find({});
    if (users.length) {
      return res.status(201).json({
        locatii: users.map((i) => ({
          ll: i.data?.socketInfo?.ll,
          location: i?.data?.location,
          country: i?.data?.socketInfo?.country,
          city: i?.data?.socketInfo?.city,
          id: i?._id,
        })),
      });
    }

    return res.status(201);
  }
);

const verificareUser: any = asyncHandler(
  async (req, res): Promise<any> => {
    let utilizator = await MembruFizic.findOne({
      email: req.body.email,
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    utilizator = await MembruFizic.findOne({
      nrTel: req?.body?.nrTel?.split(" ")?.join(""),
    });

    if (utilizator?._id)
      return res.status(403).json({ message: "Utilizatorul exista deja." });

    return res.status(201).json({ validUser: true });
  }
);

export { detaliiMembruFizic, locatieUseri, verificareUser };
