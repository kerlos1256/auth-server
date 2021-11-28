import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';

interface registerInput {
  email: string;
  name: string;
  password?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  async register(input: registerInput) {
    const user = await this.profileRepo.findOne({ email: input.email });
    if (user) return 'email already taken';
    const pass = input.password ? input.password : 'provider';
    const saved: Profile = await this.profileRepo.save({
      email: input.email,
      bio: `hi, im ${input.name}`,
      name: input.name,
      password: pass,
      phone: 0,
      photo: '',
    });
    const payload = { name: saved.name, id: saved.id };
    return this.login(payload, input.email);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    if (pass === 'provider') return null;
    const user = await this.profileRepo.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async isUser(email: string) {
    const user = await this.profileRepo.findOne({ email });
    if (!user) return false;
    return user;
  }

  async login(payload: { name: string; id: number }, email) {
    const isUser = await this.isUser(email);
    if (!isUser) return 'user with this email not found';
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
