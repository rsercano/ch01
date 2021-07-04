import {Request, Response} from "express";
import {AbstractService} from "./AbstractService";
import {ObjectType} from "typeorm/common/ObjectType";

export abstract class AbstractController<Dto, Entity> {

    private service: AbstractService<Dto, Entity>;
    private type: ObjectType<Entity>;

    protected constructor(type: ObjectType<Entity>, service: AbstractService<Dto, Entity>) {
        this.type = type;
        this.service = service;
    }

    public save = async (req: Request, res: Response) => {
        this.service.save(req.body)
            .then((savedEntity) => {
                res.status(201).send(savedEntity);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err.message);
            });
    }

    public read = async (req: Request, res: Response) => {
        this.service.read(req.params.id, this.type)
            .then((entity) => {
                res.status(200).send(entity);
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }

    public delete = async (req: Request, res: Response) => {
        this.service.delete(req.params.id, this.type)
            .then((result) => {
                if (result) res.status(200).send({message: 'Delete was SUCCESSFUL'});
                else res.status(400).send({message: 'Delete was UNSUCCESSFUL'});
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }
}