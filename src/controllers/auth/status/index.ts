import asyncHandler from "express-async-handler";

const status: any = asyncHandler(
  async (req, res): Promise<any> => {
    return res.status(201).json({
      serverUp: true,
    });
  }
);

export { status };
