import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);

    return res.status(201).json(newUser);
  }
}

const userController = new UserController();

export {
  userController
}