import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {

  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'Usuário já cadastrado.' });
    }

    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);

    return res.json(newUser);
  }

  async find(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return res.json(users);
  }
}

const userController = new UserController();
export {
  userController
}