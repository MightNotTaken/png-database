import {Request, Response} from 'express';
import { ResponseMessage } from "./response-message.controller";
import { AppDataSource } from '../../db';
import { Frame } from '../entity/Frame';
import { Camera } from '../entity/Camera';

const FrameRepo = AppDataSource.getRepository(Frame);
const CameraRepo = AppDataSource.getRepository(Camera);

class FrameController {
    public async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const missingParameters = Frame.isMissing(req.body);
            if (missingParameters) {
                return res.status(400).json({
                    message: ResponseMessage.MISSING_PARAMETERS,
                    expected: {
                        body: missingParameters,
                        qyery: {}
                    }
                });
            }
            const camera = await CameraRepo.findOne({
                where: {
                    id: +req.body.camera.id
                },
                relations: ['frames']
            });
            
            let targetFrame;
            for (let i=0; i<camera.frames.length; i++) {
                if (camera.frames[i].sachet == +req.body.sachet) {
                    targetFrame = camera.frames[i];
                    break;
                }
            }

            if (targetFrame) {
                Object.assign(targetFrame, req.body);
            } else {
                targetFrame = await FrameRepo.create(req.body);
            }
            await FrameRepo.save(targetFrame);
            return res.status(200).json(targetFrame);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    

    public async update(req: Request, res: Response) {
        try {
            console.log(req.body)
            await FrameRepo.update({
                id: +req.body.id
            }, req.body);
            return res.status(200).json({
                message: ResponseMessage.SUCCESS
            });
        } catch  (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const {cameraID} = req.params;
            const camera = await CameraRepo.findOne({
                where: {
                    id: +cameraID
                },
                relations: ['frames']
            });
            res.status(200).json(camera.frames);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: ResponseMessage.INTERNAL_SERVER_ERROR
            });
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            const {frameID} = req.params;
            const frame = await FrameRepo.findOne({
                where: {
                    id: +frameID 
                }
            });
            console.log(frame)
            if(frame) {
                await FrameRepo.remove(frame);
            }
            res.status(200).json({
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
const frameCtrl = new FrameController();
export default frameCtrl;