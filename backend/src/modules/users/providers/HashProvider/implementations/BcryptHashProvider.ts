import { compare, hash } from 'bcrypt';
import { injectable } from 'tsyringe';

import IHashProvider from '../models/IHashProvider';

@injectable()
class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BcryptHashProvider;
