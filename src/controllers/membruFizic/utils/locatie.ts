import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";

export const locatieUseri: any = asyncHandler(
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
