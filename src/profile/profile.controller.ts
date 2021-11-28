import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { validateBody } from 'src/utils/validateBody.decorator';
import { currentUser } from 'src/utils/currentUser.decorator';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findOne(@Req() req: Express.Request<{ name: string; id: number }>) {
    return this.profileService.findOne(req.user);
  }

  @Post('update')
  async update(
    @currentUser() user: { id: number; name: string },
    @validateBody({ dto: CreateProfileDto }) body: object,
  ) {
    return this.profileService.update(user.id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
