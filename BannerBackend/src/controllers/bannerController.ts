import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

const prisma = new PrismaClient();
export const getInfo = (req:Request,res:Response)=>{
    return res.status(200).json({message:"API is live"});
}
export const getBannerDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Banner id can't be null",
      });
    }

    const banner = await prisma.banner.findUnique({ where: { id: id } });
    if (!banner) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Banner not found",
      });
    }
    return res.status(StatusCodes.OK).json({ banner });
  } catch (error: unknown) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const createBanner = async (req: Request, res: Response) => {
    try {
      const { title, description, url, timer } = req.body;
      console.log(title, description, url, timer);

      if (!title || !description || !url || !timer) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "All fields must be filled",
        });
      }

      if(description.length>500){
        return res.status(StatusCodes.BAD_REQUEST).json({
            custommessage: "description length can't be more than 500 chars",
          });
      }

      const banner = await prisma.banner.create({
        data: {
          title,
          description,
          url,
          timer: new Date(timer),
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "New Banner successfully created",
        banner,
      });
    } catch (error: unknown) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {  title, description, url, timer } = req.body;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Id must be valid",
      });
    }
    if(description && description.length>500){
        return res.status(StatusCodes.BAD_REQUEST).json({
            custommessage: "description length can't be more than 500 chars",
          });
      }
    const banner = await prisma.banner.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        url,
        timer: new Date(timer),
      },
    });
    return res.status(StatusCodes.OK).json({
      message: "Banner details updated successfully",
      banner,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
