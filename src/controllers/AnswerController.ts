import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/appErrors';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

export class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const suvyesUsersRepository = getCustomRepository(SurveysUsersRepository);

    const survyeUser = await suvyesUsersRepository.findOne({
      id: String(u)
    });

    if (!survyeUser) {
      throw new AppError('Enquete não existe');
    }

    survyeUser.value = Number(value);
    await suvyesUsersRepository.save(survyeUser);

    return res.json(survyeUser);
  }
}