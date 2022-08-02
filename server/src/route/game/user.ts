import { EvaluationStatus, userService } from "../../service/user";
import { celebrate, Joi } from "celebrate";
import { Router, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { InternalServerError } from "../../service/errors";
import passport from "passport";
import { UserDocument } from "src/model/game/user";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
  "/userbox",
  async (req: Request, res: Response) => {
    const id = (req.user as UserDocument)._id;
    const userbox = await userService.findUserBox({ id });
    res.status(StatusCodes.OK).send(userbox);
  }
);

router.post(
  "/userbox",
  celebrate({
    body: {
      answers: Joi.array().items(Joi.array().items(Joi.boolean())).required(),
    },
  }),
  async (req: Request, res: Response) => {
    const id = (req.user as UserDocument)._id;
    switch (+(await userService.evaluate({ id, ...req.body }))) {
      case EvaluationStatus.Approved:
        res.status(StatusCodes.OK).send({ status: "approved" });
        break;
      case EvaluationStatus.Reproved:
        res.status(StatusCodes.OK).send({ status: "reproved" });
        break;
      case EvaluationStatus.NoContent:
        res.status(StatusCodes.NO_CONTENT).send(ReasonPhrases.NO_CONTENT);
        break;
      default:
        throw new InternalServerError();
    }
  }
);

router.get(
  "/history",
  async (req: Request, res: Response) => {
    const id = (req.user as UserDocument)._id;
    const history = await userService.findHistory({ id });
    res.status(StatusCodes.OK).send(history);
  }
);

router.get(
  "/",
  async (req: Request, res: Response) => {
    const id = (req.user as UserDocument)._id;
    res
      .status(StatusCodes.OK)
      .send(await userService.findUserData({ id }));
  }
);

export default router;
