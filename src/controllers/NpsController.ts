import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';

import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

/**
 * Calculo de NPS
 * 
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores => 6 - 8
 * Passivos => 7 - 8
 * Promotores => 9 - 10
 * 
 * (Número de promotores - número de detratores) / (número de respondentes) x 100
 */

export class NpsController {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const survyesUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await survyesUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractor = surveysUsers.filter(s => s.value >= 0 && s.value <= 6).length;
    const promotors = surveysUsers.filter(s => s.value >= 9 && s.value <= 10).length;
    const passives = surveysUsers.filter(s => s.value >= 7 && s.value <= 8).length;
    const totalAnswers = surveysUsers.length;

    const calculate = Number(((promotors - detractor) / totalAnswers) * 100).toFixed(2);

    return res.json({
      detractor,
      promotors,
      passives,
      totalAnswers,
      nps: Number(calculate)
    })
  }
}