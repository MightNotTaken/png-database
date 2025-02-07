import { Request, Response } from 'express';
import { ResponseMessage } from './response-message.controller';
import { Camera } from '../entity/Camera';
import { AppDataSource } from '../../db';
import { Machine } from '../entity/Machine';

const CameraRepo = AppDataSource.getRepository(Camera);
const MachineRepo = AppDataSource.getRepository(Machine);

class CameraController {
    public async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const machine = await MachineRepo.findOneBy({id: req.body.machine});
            req.body.machine = machine;
            const missingParameters = Camera.isMissing(req.body);
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
            let camera: any = await CameraRepo.findOne({
                where: {
                    name: req.body.name
                }
            });
            if (!camera) {
                camera = await CameraRepo.create(req.body);
                camera.machine = machine.id as any;
                await CameraRepo.save(camera);
            }
            console.log(camera);
            return res.status(200).json(camera);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const cameras = await CameraRepo.find({});
            return res.status(200).json(cameras);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            await CameraRepo.save(req.body);
            return res.status(200).json({
                message: ResponseMessage.SUCCESS
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    
};

const cameraCtrl = new CameraController();
export default cameraCtrl;