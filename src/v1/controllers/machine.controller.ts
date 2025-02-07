import { Request, Response } from 'express';
import { Machine } from "../entity/Machine";
import { ResponseMessage } from './response-message.controller';
import { AppDataSource } from '../../db';

const MachineRepo = AppDataSource.getRepository(Machine);

class MachineController {
    public async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const missingParameters = Machine.isMissing(req.body);
            console.log({missingParameters})
            if (missingParameters) {
                return res.status(400).json({
                    message: ResponseMessage.MISSING_PARAMETERS,
                    expected: {
                        body: missingParameters,
                        qyery: {}
                    }
                });
            }
            let machine: any = await MachineRepo.findOne({
                where: {
                    name: req.body.name
                }
            });
            if (!machine) {
                machine = await MachineRepo.create(req.body);
                await MachineRepo.save(machine);
            }
            return res.status(200).json(machine);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const cameras = await MachineRepo.find({});
            return res.status(200).json(cameras);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

};

const machineCtrl = new MachineController();
export default machineCtrl;