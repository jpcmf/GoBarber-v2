import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HasProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'João Paulo',
      email: 'email@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('João Paulo');
  });

  it('should not be able to create a user with the same email', async () => {
    const userEmail = 'email@email.com';

    await createUser.execute({
      name: 'João Paulo',
      email: userEmail,
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'João Paulo',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
