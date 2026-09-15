import { Request, Response, NextFunction } from "express";

export function validateRequiredFields(
  fields: string[]
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const missingFields = fields.filter(
      (field) =>
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field wajib diisi: ${missingFields.join(", ")}`,
      });
    }

    next();
  };
}