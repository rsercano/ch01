import {Request, Response} from "express";

export abstract class AbstractController {

    abstract create(req: Request, res: Response);

    abstract read(req: Request, res: Response);

    abstract update(req: Request, res: Response);

    abstract delete(req: Request, res: Response);

}