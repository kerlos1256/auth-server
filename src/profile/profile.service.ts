import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { validateBody } from './validateBody';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  findOne(user: Express.User<{ name: string; id: number }>) {
    return this.profileRepo.findOne({
      where: { id: user.id },
      select: ['bio', 'email', 'name', 'phone', 'photo'],
    });
  }

  async update(id: number, data: UpdateProfileDto) {
    console.log(data);
    if (Object.keys(data).length < 1) return 'nothing to update';
    return this.profileRepo.update(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
