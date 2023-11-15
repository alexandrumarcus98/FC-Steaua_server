import { NextFunction, Request, Response } from "express";
import MembruFizic from "src/models/membruFizic";
import { inregistrareMembruFizicByEmail } from "./utils/byEmail";

export const controller = {
  destroy: async (req: Request, res: Response) => {
    const membru = await MembruFizic.findOne({ _id: req?.params?.id });
    if (membru)
      await membru
        ?.deleteOne()
        ?.then(() => {
          return res.send({ success: true });
        })
        .catch((e) => {
          return res.status(401);
        });
    else {
      return res.status(404).json({ message: "Nu a fost gasit." });
    }
  },
  create: (req: Request, res: Response, next: NextFunction) => {
    return inregistrareMembruFizicByEmail(req, res, next);
  },
};
