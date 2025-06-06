import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { Request, Response } from "express";

const router = Router();

interface UserRequest extends Request {
  user?: { id: string };
}

router.get("/me", ensureAuth, (req: UserRequest, res: Response) => {
  res.json({ message: "Protected route!", userId: req.user?.id });
});

export default router;
