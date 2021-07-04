import {Request, Response} from "express";
import {AbstractService} from "./AbstractService";
import {ObjectType} from "typeorm/common/ObjectType";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

export abstract class AbstractController<Dto, Entity> {

    protected service: AbstractService<Dto, Entity>;
    private type: ObjectType<Entity>;
    private options?: FindOneOptions<Entity>;

    protected constructor(type: ObjectType<Entity>, service: AbstractService<Dto, Entity>, options?: FindOneOptions<Entity>) {
        this.type = type;
        this.service = service;
        this.options = options;
    }

    public save = async (req: Request, res: Response) => {
        this.service.save(req.body)
            .then((savedEntity) => {
                res.status(201).send(savedEntity);
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }

    public read = async (req: Request, res: Response) => {
        this.service.read(req.params.id, this.type, this.options)
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