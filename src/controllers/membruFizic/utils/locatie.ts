import asyncHandler from "express-async-handler";
import MembruFizic from "src/models/membruFizic";
import mgrs from "mgrs";
import _ from "lodash";

export const locatieUseri: any = asyncHandler(
  async (req, res): Promise<any> => {
    let users = await MembruFizic.find({});
    if (users.length) {
      let newUsers: any = [...users]?.map((user) => {
        user.mgrs = mgrs.forward(
          [user?.data?.location?.longitude, user?.data?.location?.latitude],
          2
        );
        let location = mgrs.forward(
          [user?.data?.location?.longitude, user?.data?.location?.latitude],
          2
        );
        user.data.location.mgrs = location;
        return {
          location: user?.data?.location,
          mgrs: user.mgrs,
        };
      });
      return res.status(201).json({
        location: newUsers?.map((i) => i.location),
        total: _.groupBy(newUsers, "mgrs"),
      });
    }

    return res.status(201);
  }
);
