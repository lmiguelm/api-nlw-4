import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

import * as yup from 'yup';
import { AppError } from '../errors/appErrors';

export class UserController {

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email().required('E-mail inválido')
    });

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      throw new AppError(error);
    }

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('Usuário já cadastrado');
    }

    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);

    return res.status(201).json(newUser);
  }
}