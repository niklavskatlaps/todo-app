import express from "express";

const healthcheckRouter = express.Router();

healthcheckRouter.use("/", (_req, res) => {
  res.json({ status: "OK" });
});

export { healthcheckRouter };
