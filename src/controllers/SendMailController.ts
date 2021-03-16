import { Request, response, Response } from 'express';

import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { sendMailService } from '../services/SendMailService';

import { resolve } from 'path';
import { AppError } from '../errors/appErrors';

export class SendMailController {
  async execute(req: Request, res: Response) {

    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (!userAlreadyExists) {
      throw new AppError('Usuário não existe');
    }

    const surveysAlreadyExists = await surveyRepository.findOne({ id: survey_id });

    if (!surveysAlreadyExists) {
      throw new AppError('Enquete não existe');
    }

    const path = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: {
        user_id: userAlreadyExists.id,
        value: null
      },
      relations: ['user', 'survey']
    });

    const variables = {
      name: userAlreadyExists.name,
      title: surveysAlreadyExists.title,
      description: surveysAlreadyExists.description,
      link: process.env.BASE_URL_MAIL,
      id: ''
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await sendMailService.execute(email, surveysAlreadyExists.title, variables, path);
      return res.status(200).json(surveyUserAlreadyExists);
    }

    const newSurveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id: surveysAlreadyExists.id
    });
    await surveysUsersRepository.save(newSurveyUser);

    variables.id = newSurveyUser.id;
    await sendMailService.execute(email, surveysAlreadyExists.title, variables, path);

    return res.status(201).json(newSurveyUser);
  }
}