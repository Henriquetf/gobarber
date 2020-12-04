import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infrastructure/typeorm/entities/User';

import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      data,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(({ id }) => id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
