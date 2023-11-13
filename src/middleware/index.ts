import { Request } from "express";
import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";

const protect: any = asyncHandler(
  async (req: Request | any, res: any, next) => {
    let userId = "";
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith("Bearer")
    ) {
      try {
        userId = req.headers.authorization.split(" ")[1];
        if (userId) {
          req.user = await MembruFizic.findOne({
            _id: userId,
          });

          next();
        } else throw new Error("");
      } catch (err) {
        return res
          .status(401)
          .json({ message: "Not authorized, token failed." });
      }
    }
  }
);

const adminHandler: any = asyncHandler(
  async (req: Request | any, res: any, next) => {
    if (req.user && req.user.isAdmin) next();
    else
      return res.status(401).json({ message: "Not authorized as an admin." });
  }
);

export { protect, adminHandler as admin };
